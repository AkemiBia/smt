import { Redis } from '@upstash/redis';

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
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'POST') {
    try {
      const { index } = req.body;
      
      if (typeof index !== 'number') {
        return res.status(400).json({ error: 'Index inválido' });
      }
      
      const redis = Redis.fromEnv();
      let counters = await redis.get('counters');
      
      if (!counters) {
        counters = defaultCounters;
      }
      
      if (index >= 0 && index < counters.length) {
        counters[index].value += 1;
        await redis.set('counters', counters);
        return res.status(200).json(counters[index]);
      } else {
        return res.status(404).json({ error: 'Contador não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao incrementar:', error);
      return res.status(500).json({ 
        error: 'Erro ao incrementar',
        message: error.message
      });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
