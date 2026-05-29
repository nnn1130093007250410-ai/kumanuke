#!/usr/bin/env python3
"""
新規データソース探索スクリプト
ArcGIS Hub / Open Data ポータルを検索して、
まだ収集していない熊出没データソースを発見する。

実行結果は candidates.json に出力される（自動追加はしない）。
"""

import json
import re
import sys
import time
import urllib.request
import urllib.parse
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
CONFIG_FILE = SCRIPT_DIR / "sources_config.json"
OUTPUT_FILE = SCRIPT_DIR / "candidates.json"

HEADERS = {'User-Agent': 'Mozilla/5.0 (compatible; KumanukeBearBot/1.0)'}

BEAR_KEYWORDS = [
    'クマ 出没', '熊 出没', 'クマ 目撃', '熊 目撃', 'ヒグマ 出没',
    'ツキノワグマ 出没', 'bear sighting japan', 'kuma shutsubotsu'
]

ARCGIS_HUBS = [
    'https://hub.arcgis.com',
    'https://opendata.arcgis.com',
]

PREFECTURE_PORTALS = [
    # ArcGIS Hub ポータルを持つ都道府県
    ('北海道', 'https://services8.arcgis.com/TZuJIMPpKf9L0ri3/arcgis/rest/services'),
    ('宮城県', 'https://services7.arcgis.com/sNECdWtl22Z2VPMm/arcgis/rest/services'),
    ('秋田県', 'https://services7.arcgis.com/'),
    ('新潟県', 'https://niigata.maps.arcgis.com'),
    ('長野県', 'https://services1.arcgis.com/4GMefrLcjv8z16wh/arcgis/rest/services'),
]

# 既存ソースのIDプレフィックス（重複除外）
def load_existing_prefixes() -> set[str]:
    with open(CONFIG_FILE, encoding='utf-8') as f:
        cfg = json.load(f)
    prefixes = set()
    for s in cfg.get('arcgis', []) + cfg.get('kml', []):
        prefixes.add(s['id_prefix'])
    return prefixes


def search_arcgis_hub(keyword: str) -> list[dict]:
    """ArcGIS Hub API でキーワード検索"""
    results = []
    encoded = urllib.parse.quote(keyword)
    url = (
        f"https://hub.arcgis.com/api/v3/search?"
        f"q={encoded}&filter[type]=Feature+Service&sort=updatedAt&limit=20"
    )
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode('utf-8'))
        for item in data.get('data', []):
            attrs = item.get('attributes', {})
            title = attrs.get('title', '')
            item_url = attrs.get('url', '') or attrs.get('access_information', '')
            owner = attrs.get('owner', '')
            updated = attrs.get('updatedAt', '')
            if not item_url:
                continue
            results.append({
                'title': title,
                'url': item_url,
                'owner': owner,
                'updated': updated,
                'source': 'arcgis_hub',
                'keyword': keyword,
            })
    except Exception as e:
        print(f"  ArcGIS Hub検索エラー ({keyword}): {e}")
    return results


def search_ckan_portal(base_url: str, keyword: str) -> list[dict]:
    """CKAN APIでキーワード検索（例: data.bodik.jp）"""
    results = []
    encoded = urllib.parse.quote(keyword)
    url = f"{base_url}/api/3/action/package_search?q={encoded}&rows=10"
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode('utf-8'))
        for pkg in data.get('result', {}).get('results', []):
            for res in pkg.get('resources', []):
                fmt = res.get('format', '').lower()
                if fmt in ('csv', 'geojson', 'json', 'shapefile', 'kml'):
                    results.append({
                        'title': pkg.get('title', ''),
                        'url': res.get('url', ''),
                        'format': fmt,
                        'source': f'ckan:{base_url}',
                        'keyword': keyword,
                    })
    except Exception as e:
        print(f"  CKAN検索エラー ({base_url}): {e}")
    return results


def check_prefecture_arcgis(pref: str, base_url: str) -> list[dict]:
    """都道府県のArcGIS REST APIサービス一覧から熊関連を探す"""
    results = []
    url = f"{base_url}?f=json"
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode('utf-8'))
        services = data.get('services', [])
        for svc in services:
            name = svc.get('name', '')
            if any(k in name for k in ['クマ', '熊', 'kuma', 'bear', 'ヒグマ', 'ツキノワ']):
                results.append({
                    'title': f"{pref}: {name}",
                    'url': f"{base_url}/{name}/FeatureServer",
                    'source': f'prefecture_arcgis:{pref}',
                    'name': name,
                })
    except Exception as e:
        print(f"  {pref} ArcGIS REST探索エラー: {e}")
    return results


def filter_bear_related(candidates: list[dict]) -> list[dict]:
    """クマ関連キーワードが含まれるものに絞る"""
    bear_kw = ['クマ', '熊', 'bear', 'kuma', 'ヒグマ', 'ツキノワ', '出没', '目撃']
    filtered = []
    for c in candidates:
        title = c.get('title', '').lower()
        url = c.get('url', '').lower()
        if any(k.lower() in title or k.lower() in url for k in bear_kw):
            filtered.append(c)
    return filtered


def deduplicate(candidates: list[dict]) -> list[dict]:
    seen_urls = set()
    result = []
    for c in candidates:
        u = c.get('url', '').rstrip('/')
        if u and u not in seen_urls:
            seen_urls.add(u)
            result.append(c)
    return result


def discover_sources() -> None:
    print("=== 新規ソース探索 ===")
    all_candidates = []

    # ArcGIS Hub 検索
    print("\n[ArcGIS Hub 検索]")
    for kw in BEAR_KEYWORDS[:4]:  # 4キーワードに制限
        print(f"  キーワード: {kw}")
        results = search_arcgis_hub(kw)
        all_candidates.extend(results)
        print(f"  → {len(results)}件")
        time.sleep(1)

    # 都道府県ArcGIS REST API探索
    print("\n[都道府県ArcGIS REST API探索]")
    for pref, base_url in PREFECTURE_PORTALS:
        print(f"  {pref}: {base_url}")
        results = check_prefecture_arcgis(pref, base_url)
        all_candidates.extend(results)
        print(f"  → {len(results)}件")
        time.sleep(0.5)

    # CKAN ポータル探索
    print("\n[CKAN ポータル探索]")
    ckan_portals = [
        'https://data.bodik.jp',
        'https://ckan.pref.akita.lg.jp',
        'https://opendata.pref.niigata.lg.jp',
    ]
    for portal in ckan_portals:
        print(f"  {portal}")
        for kw in ['クマ 出没', '熊 目撃']:
            results = search_ckan_portal(portal, kw)
            all_candidates.extend(results)
        time.sleep(0.5)

    # フィルタリング・重複除去
    bear_candidates = filter_bear_related(all_candidates)
    unique_candidates = deduplicate(bear_candidates)

    # 既存ソースのURLと照合して新規のみ残す
    with open(CONFIG_FILE, encoding='utf-8') as f:
        cfg = json.load(f)
    existing_urls = set()
    for s in cfg.get('arcgis', []) + cfg.get('kml', []):
        for key in ('service_url', 'source_url'):
            if key in s:
                existing_urls.add(s[key].rstrip('/'))

    novel_candidates = [
        c for c in unique_candidates
        if c.get('url', '').rstrip('/') not in existing_urls
    ]

    print(f"\n発見数: 全{len(all_candidates)}件 → クマ関連{len(bear_candidates)}件 → 新規{len(novel_candidates)}件")

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(novel_candidates, f, ensure_ascii=False, indent=2)

    print(f"✓ 候補を {OUTPUT_FILE} に保存")
    print("  → 内容を確認後、sources_config.json に手動追加してください")

    # サマリー表示
    for c in novel_candidates[:10]:
        print(f"  - {c.get('title','')[:50]:50s}  {c.get('url','')[:60]}")


if __name__ == '__main__':
    discover_sources()
