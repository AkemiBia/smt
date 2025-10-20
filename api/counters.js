// Vercel Serverless Function - Listar contadores
import { createClient } from 'redis';

const defaultCounters = [
  { name: 'Isabela', value: 0, image: '/avatars/isabela.jpg' },
  { name: 'Dedeai', value: 0, image: '/avatars/dedeai.png' },
  { name: 'Bibs', value: 0, image: '/avatars/bibs.jpg' },
  { name: 'Lali', value: 0, image: '/avatars/lali.jpeg' },
  { name: 'Samuel', value: 0, image: '/avatars/samuel.svg' },
  { name: 'Lari', value: 0, image: '/avatars/lari.svg' }
];

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'GET') {
    let redis = null;
    
    try {
      // Verificar se tem REDIS_URL
      if (process.env.REDIS_URL) {
        console.log('Conectando ao Redis...');
        redis = createClient({ url: process.env.REDIS_URL });
        await redis.connect();
        
        // Tentar obter do Redis
        const data = await redis.get('counters');
        
        if (data) {
          const counters = JSON.parse(data);
          console.log('Contadores obtidos do Redis');
          await redis.disconnect();
          return res.status(200).json(counters);
        } else {
          // Inicializar no Redis
          console.log('Inicializando contadores no Redis');
          await redis.set('counters', JSON.stringify(defaultCounters));
          await redis.disconnect();
          return res.status(200).json(defaultCounters);
        }
      } else {
        // Sem Redis, usar valores padrão
        console.log('Redis não configurado, usando valores padrão');
        return res.status(200).json(defaultCounters);
      }
    } catch (error) {
      console.error('Erro ao usar Redis:', error);
      if (redis) {
        try {
          await redis.disconnect();
        } catch (e) {
          // Ignorar erro ao desconectar
        }
      }
      // Em caso de erro, retornar valores padrão
      return res.status(200).json(defaultCounters);
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
