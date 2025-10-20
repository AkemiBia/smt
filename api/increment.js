// Vercel Serverless Function - Incrementar contador

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
    try {
      const { index } = req.body;
      
      if (typeof index !== 'number') {
        return res.status(400).json({ error: 'Index inválido' });
      }
      
      // Verificar se tem REDIS_URL
      if (!process.env.REDIS_URL) {
        console.log('REDIS_URL não encontrada');
        return res.status(503).json({ 
          error: 'Redis não configurado',
          message: 'Configure a variável REDIS_URL nas Environment Variables'
        });
      }
      
      // Tentar usar Redis
      let redis = null;
      try {
        const { createClient } = await import('redis');
        console.log('Conectando ao Redis para incrementar...');
        
        redis = createClient({ url: process.env.REDIS_URL });
        
        redis.on('error', (err) => {
          console.error('Redis Client Error:', err);
        });
        
        await redis.connect();
        console.log('Conectado!');
        
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
        
      } catch (redisError) {
        console.error('Erro ao usar Redis:', redisError.message);
        console.error('Stack:', redisError.stack);
        
        if (redis) {
          try {
            await redis.disconnect();
          } catch (e) {
            console.error('Erro ao desconectar:', e.message);
          }
        }
        
        return res.status(500).json({ 
          error: 'Erro ao incrementar contador',
          message: redisError.message
        });
      }
      
    } catch (error) {
      console.error('Erro geral ao incrementar:', error.message);
      return res.status(500).json({ 
        error: 'Erro ao incrementar contador',
        message: error.message
      });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
