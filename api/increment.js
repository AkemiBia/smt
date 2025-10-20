// Vercel Serverless Function - Incrementar contador
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
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'POST') {
    let redis = null;
    
    try {
      const { index } = req.body;
      
      if (typeof index !== 'number') {
        return res.status(400).json({ error: 'Index inválido' });
      }
      
      // Verificar se tem REDIS_URL
      if (!process.env.REDIS_URL) {
        return res.status(503).json({ 
          error: 'Redis não configurado',
          message: 'Configure a variável REDIS_URL'
        });
      }
      
      console.log('Conectando ao Redis...');
      redis = createClient({ url: process.env.REDIS_URL });
      await redis.connect();
      
      // Obter contadores atuais
      let data = await redis.get('counters');
      let counters = data ? JSON.parse(data) : defaultCounters;
      
      // Incrementar
      if (index >= 0 && index < counters.length) {
        counters[index].value += 1;
        await redis.set('counters', JSON.stringify(counters));
        console.log('Contador incrementado:', counters[index]);
        
        await redis.disconnect();
        return res.status(200).json(counters[index]);
      } else {
        await redis.disconnect();
        return res.status(404).json({ error: 'Contador não encontrado' });
      }
      
    } catch (error) {
      console.error('Erro ao incrementar:', error);
      
      if (redis) {
        try {
          await redis.disconnect();
        } catch (e) {
          // Ignorar erro ao desconectar
        }
      }
      
      return res.status(500).json({ 
        error: 'Erro ao incrementar contador',
        message: error.message
      });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
