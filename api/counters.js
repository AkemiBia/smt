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
      // Verificar se tem variáveis Upstash
      if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
        const { Redis } = await import('@upstash/redis');
        const redis = new Redis({
          url: process.env.UPSTASH_REDIS_REST_URL,
          token: process.env.UPSTASH_REDIS_REST_TOKEN,
        });
        
        let counters = await redis.get('counters');
        
        if (!counters) {
          await redis.set('counters', defaultCounters);
          counters = defaultCounters;
        }
        
        return res.status(200).json(counters);
      } else {
        console.log('Upstash não configurado, usando valores padrão');
        return res.status(200).json(defaultCounters);
      }
    } catch (error) {
      console.error('Erro:', error);
      return res.status(200).json(defaultCounters);
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
