'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface GuideArticle {
  title: string;
  slug: string;
  description: string;
  category: string;
}

interface SearchResult {
  label: string;
  href: string;
  category: string;
  description?: string;
}

const GUIDE_ARTICLES: GuideArticle[] = [
  {
    title: 'クマヌケとは',
    slug: 'about',
    description: 'クマヌケの概要とご利用ガイド',
    category: 'ガイド',
  },
  {
    title: '初めての方へ',
    slug: 'getting-started',
    description: '初めてご利用になる方への入門ガイド',
    category: 'ガイド',
  },
  {
    title: 'よくある質問',
    slug: 'faq',
    description: 'よくお寄せいただく質問と回答',
    category: 'サポート',
  },
  {
    title: 'お問い合わせ',
    slug: 'contact',
    description: 'お問い合わせ・ご相談はこちらから',
    category: 'サポート',
  },
  {
    title: '工芸品の選び方',
    slug: 'how-to-choose',
    description: '産地別・用途別の工芸品の選び方ガイド',
    category: 'ガイド',
  },
  {
    title: '職人とつながる',
    slug: 'connect-artisans',
    description: '全国の職人と直接つながる方法',
    category: 'コミュニティ',
  },
  {
    title: '伝統工芸の魅力',
    slug: 'traditional-crafts',
    description: '日本の伝統工芸品の種類と魅力について',
    category: 'ガイド',
  },
  {
    title: '産地直送について',
    slug: 'direct-shipping',
    description: '産地から直接届く安心の仕組み',
    category: 'ガイド',
  },
  {
    title: 'ギフト・贈り物',
    slug: 'gifts',
    description: '特別な贈り物にぴったりな工芸品特集',
    category: '特集',
  },
  {
    title: 'インテリアに工芸品',
    slug: 'interior',
    description: '暮らしに彩りを添える工芸品のインテリア活用術',
    category: '特集',
  },
];

const PREFECTURE_MAP: Record<string, string> = {
  秋田: 'akita',
  新潟: 'niigata',
  京都: 'kyoto',
  宮城: 'miyagi',
  福井: 'fukui',
  青森: 'aomori',
  岐阜: 'gifu',
  富山: 'toyama',
  山形: 'yamagata',
  福島: 'fukushima',
  岩手: 'iwate',
  北海道: 'hokkaido',
  石川: 'ishikawa',
  群馬: 'gunma',
  山口: 'yamaguchi',
  山梨: 'yamanashi',
  長野: 'nagano',
  東京: 'tokyo',
};

const MAX_RESULTS = 6;

export default function SiteSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const search = useCallback((q: string) => {
    if (q.length < 1) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const lower = q.toLowerCase();
    const found: SearchResult[] = [];

    // Prefecture matches
    for (const [name, slug] of Object.entries(PREFECTURE_MAP)) {
      if (found.length >= MAX_RESULTS) break;
      if (name.includes(q) || slug.includes(lower)) {
        found.push({
          label: `${name}の工芸品`,
          href: `/map/${slug}`,
          category: '産地',
          description: `${name}の伝統工芸品・産地情報`,
        });
      }
    }

    // Guide article matches
    for (const article of GUIDE_ARTICLES) {
      if (found.length >= MAX_RESULTS) break;
      const titleMatch = article.title.toLowerCase().includes(lower) || article.title.includes(q);
      const descMatch = article.description.toLowerCase().includes(lower) || article.description.includes(q);
      const catMatch = article.category.toLowerCase().includes(lower) || article.category.includes(q);
      if (titleMatch || descMatch || catMatch) {
        found.push({
          label: article.title,
          href: `/guide/${article.slug}`,
          category: article.category,
          description: article.description,
        });
      }
    }

    setResults(found);
    setIsOpen(found.length > 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    search(val);
  };

  const handleSelect = (href: string) => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    router.push(href);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', maxWidth: '360px' }}>
      {/* Input */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#1a1a2e',
          border: '1px solid #2d2d4e',
          borderRadius: '8px',
          padding: '8px 12px',
          gap: '8px',
        }}
      >
        <span style={{ fontSize: '16px', flexShrink: 0 }}>🔍</span>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="産地・ガイドを検索..."
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#e8e8f0',
            fontSize: '14px',
            width: '100%',
            fontFamily: 'inherit',
          }}
          aria-label="サイト内検索"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          role="combobox"
          aria-autocomplete="list"
          autoComplete="off"
        />
      </div>

      {/* Dropdown */}
      {isOpen && results.length > 0 && (
        <ul
          role="listbox"
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            backgroundColor: '#16162a',
            border: '1px solid #2d2d4e',
            borderRadius: '8px',
            listStyle: 'none',
            margin: 0,
            padding: '4px 0',
            zIndex: 9999,
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
            overflow: 'hidden',
          }}
        >
          {results.map((result, i) => (
            <li key={`${result.href}-${i}`} role="option">
              <button
                onClick={() => handleSelect(result.href)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  padding: '10px 14px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: '#e8e8f0',
                  transition: 'background 0.15s',
                  gap: '2px',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#2a2a45';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 600,
                      padding: '2px 6px',
                      borderRadius: '4px',
                      backgroundColor: '#2d2d4e',
                      color: '#9090c0',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    {result.category}
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 500 }}>{result.label}</span>
                </div>
                {result.description && (
                  <span
                    style={{
                      fontSize: '12px',
                      color: '#7070a0',
                      paddingLeft: '2px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {result.description}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
