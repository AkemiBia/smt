// Vercel Serverless Function usando KV Storage
import { kv } from '@vercel/kv';

// Dados iniciais (caso não existam no KV)
const defaultCounters = [
  { name: 'Isabela', value: 0, image: '/avatars/isabela.jpg' },
  { name: 'Dedeai', value: 0, image: '/avatars/dedeai.png' },
  { name: 'Bibs', value: 0, image: '/avatars/bibs.svg' },
  { name: 'Lali', value: 0, image: '/avatars/lali.jpeg' },
  { name: 'Samuel', value: 0, image: '/avatars/samuel.svg' },
  { name: 'Lari', value: 0, image: '/avatars/lari.svg' }
];

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'GET') {
    try {
      // Tentar obter contadores do KV
      let counters = await kv.get('counters');
      
      // Se não existir, usar valores padrão
      if (!counters) {
        counters = defaultCounters;
        await kv.set('counters', counters);
      }
      
      return res.status(200).json(counters);
    } catch (error) {
      console.error('Erro ao obter contadores:', error);
      return res.status(500).json({ error: 'Erro ao obter contadores' });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
