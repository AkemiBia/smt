import { kv } from '@vercel/kv';

const defaultCounters = [
  { name: 'Isabela', value: 0, image: '/avatars/isabela.jpg' },
  { name: 'Dedeai', value: 0, image: '/avatars/dedeai.png' },
  { name: 'Bibs', value: 0, image: '/avatars/bibs.jpg' },
  { name: 'Lali', value: 0, image: '/avatars/lali.jpeg' },
  { name: 'Samuel', value: 0, image: '/avatars/samuel.svg' },
  { name: 'Lari', value: 0, image: '/avatars/lari.svg' }
];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'GET') {
    try {
      let counters = await kv.get('counters');
      
      if (!counters) {
        await kv.set('counters', defaultCounters);
        counters = defaultCounters;
      }
      
      return res.status(200).json(counters);
    } catch (error) {
      console.error('Erro KV:', error);
      return res.status(200).json(defaultCounters);
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
