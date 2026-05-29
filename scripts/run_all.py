#!/usr/bin/env python3
"""
メインオーケストレーター
全データ収集スクリプトを順次実行し、統計を更新する。

使い方:
  python scripts/run_all.py              # 本番実行
  python scripts/run_all.py --dry-run   # テスト（ファイル書き込みなし）
  python scripts/run_all.py --discover  # 新規ソース探索も実行
  python scripts/run_all.py --stats-only  # 統計更新のみ
"""

import sys
import time
import subprocess
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent

def run_script(name: str, extra_args: list[str] = []) -> int:
    """サブスクリプトを実行し終了コードを返す"""
    script = SCRIPT_DIR / name
    cmd = [sys.executable, str(script)] + extra_args
    print(f"\n{'='*60}")
    print(f"▶ {name}")
    print('='*60)
    result = subprocess.run(cmd)
    return result.returncode


def main() -> None:
    args = sys.argv[1:]
    dry_run = '--dry-run' in args
    discover = '--discover' in args
    stats_only = '--stats-only' in args

    if dry_run:
        print("⚠ DRY RUN モード（ファイルは変更されません）")

    total_start = time.time()
    errors = []

    if not stats_only:
        # 1. ArcGIS 増分収集
        extra = ['--dry-run'] if dry_run else []
        rc = run_script('collect_arcgis.py', extra)
        if rc != 0:
            errors.append('collect_arcgis.py')

        # 2. KML 増分収集
        rc = run_script('collect_kml.py', extra)
        if rc != 0:
            errors.append('collect_kml.py')

        # 3. 新規ソース探索（オプション）
        if discover:
            rc = run_script('discover_sources.py')
            if rc != 0:
                errors.append('discover_sources.py')

    # 4. 統計更新
    rc = run_script('update_stats.py')
    if rc != 0:
        errors.append('update_stats.py')

    elapsed = time.time() - total_start
    print(f"\n{'='*60}")
    print(f"完了: {elapsed:.1f}秒")
    if errors:
        print(f"⚠ エラーあり: {', '.join(errors)}")
        sys.exit(1)
    else:
        print("✓ 全スクリプト正常終了")
        sys.exit(0)


if __name__ == '__main__':
    main()
