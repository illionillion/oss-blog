import axios from 'axios';
import { config } from '../../config';

export async function fetchFromPerplexity(query: string): Promise<any> {
  const url = `https://api.perplexity.ai/search`;
  try {
    const response = await axios.post(
      url,
      { query },
      {
        headers: {
          'Authorization': `Bearer ${config.perplexityApiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching from Perplexity:', error);
    throw error;
  }