// Vercel Serverless Function - Incrementar contador
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
  console.log('KV não disponível');
}

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
      
      // Se KV estiver disponível e configurado
      if (kv && process.env.KV_REST_API_URL) {
        try {
          let counters = await kv.get('counters');
          
          if (!counters) {
            counters = defaultCounters;
          }
          
          if (index >= 0 && index < counters.length) {
            counters[index].value += 1;
            await kv.set('counters', counters);
            return res.status(200).json(counters[index]);
          } else {
            return res.status(404).json({ error: 'Contador não encontrado' });
          }
        } catch (kvError) {
          console.error('Erro ao usar KV:', kvError);
          return res.status(500).json({ 
            error: 'Erro ao incrementar', 
            message: 'Configure o Vercel KV para persistência',
            details: kvError.message 
          });
        }
      } else {
        // Sem KV, não pode persistir
        return res.status(503).json({ 
          error: 'KV não configurado',
          message: 'Configure o Vercel KV Database para que os contadores funcionem. Veja COMO_CONFIGURAR_KV.md'
        });
      }
    } catch (error) {
      console.error('Erro ao incrementar contador:', error);
      return res.status(500).json({ error: 'Erro ao incrementar contador', details: error.message });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
