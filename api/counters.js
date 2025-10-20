// Vercel Serverless Function - Listar contadores
// Funciona com ou sem Vercel KV

const defaultCounters = [
  { name: 'Isabela', value: 0, image: '/avatars/isabela.jpg' },
  { name: 'Dedeai', value: 0, image: '/avatars/dedeai.png' },
  { name: 'Bibs', value: 0, image: '/avatars/bibs.jpg' },
  { name: 'Lali', value: 0, image: '/avatars/lali.jpeg' },
  { name: 'Samuel', value: 0, image: '/avatars/samuel.svg' },
  { name: 'Lari', value: 0, image: '/avatars/lari.svg' }
];

// Tentar importar KV
let kv = null;
try {
  const kvModule = await import('@vercel/kv');
  kv = kvModule.kv;
} catch (e) {
  console.log('KV não disponível, usando modo fallback');
}

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'GET') {
    try {
      let counters = defaultCounters;
      
      // Se KV estiver disponível e configurado
      if (kv && process.env.KV_REST_API_URL) {
        try {
          const kvCounters = await kv.get('counters');
          if (kvCounters) {
            counters = kvCounters;
          } else {
            // Inicializar no KV
            await kv.set('counters', defaultCounters);
          }
        } catch (kvError) {
          console.error('Erro ao usar KV, usando valores padrão:', kvError);
        }
      }
      
      return res.status(200).json(counters);
    } catch (error) {
      console.error('Erro ao obter contadores:', error);
      return res.status(500).json({ error: 'Erro ao obter contadores', details: error.message });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
