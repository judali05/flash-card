export interface Word {
    id: number;
    english: string;
    spanish: string;
  }
  
  const API_URL = 'http://localhost:3001/api/words';
  
  export async function fetchWords(): Promise<Word[]> {
    const res = await fetch(API_URL);
    return res.json();
  }
  
  export async function addWord(english: string, spanish: string): Promise<Word> {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ english, spanish }),
    });
    return res.json();
  }
  