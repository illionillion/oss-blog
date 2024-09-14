// 記事の型定義
export interface Article {
    title: string;
    url: string;    
    suummary: string;
    platform: 'Qiita' | 'Zenn' | 'Hatena';
}