import axius from 'axios';
import { Article } from '../../models/article';
import { config } from '../../config';


export async function search(query: string): Promise<Article[]> {
    try {
        const response = await axius.get(`${config.searchEndpoints.zenn}?query=${query}`);
        return response.data.map((item: any) => ({
            title: item.title,
            url: item.url,
            platofrom: 'Qiita'
    }));
    } catch (error) {
        console.error('Error fetching from Qiita:', error);
        return [];
    }
}    