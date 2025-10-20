// Vercel Serverless Function - Listar contadores

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
      const defaultCounters = [
        { name: 'Isabela', value: 0, image: '/avatars/isabela.jpg' },
        { name: 'Dedeai', value: 0, image: '/avatars/dedeai.png' },
        { name: 'Bibs', value: 0, image: '/avatars/bibs.jpg' },
        { name: 'Lali', value: 0, image: '/avatars/lali.jpeg' },
        { name: 'Samuel', value: 0, image: '/avatars/samuel.svg' },
        { name: 'Lari', value: 0, image: '/avatars/lari.svg' }
      ];
      
      // Tentar importar e usar KV
      let kv = null;
      let useKV = false;
      
      try {
        // Import dinâmico do KV
        const { kv: kvClient } = await import('@vercel/kv');
        kv = kvClient;
        
        // Verificar se as variáveis de ambiente existem
        if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
          useKV = true;
          console.log('KV disponível e configurado');
        } else {
          console.log('KV não configurado (env vars ausentes)');
        }
      } catch (importError) {
        console.log('Erro ao importar KV:', importError.message);
      }
      
      if (useKV && kv) {
        try {
          // Tentar obter do KV
          let counters = await kv.get('counters');
          
          if (!counters || !Array.isArray(counters)) {
            console.log('Inicializando contadores no KV');
            counters = defaultCounters;
            await kv.set('counters', counters);
          }
          
          console.log('Contadores obtidos do KV:', counters);
          return res.status(200).json(counters);
        } catch (kvError) {
          console.error('Erro ao usar KV, usando valores padrão:', kvError);
          return res.status(200).json(defaultCounters);
        }
      }
      
      // Se KV não estiver disponível, retornar valores padrão
      console.log('Retornando valores padrão (KV não disponível)');
      return res.status(200).json(defaultCounters);
      
    } catch (error) {
      console.error('Erro ao obter contadores:', error);
      return res.status(500).json({ 
        error: 'Erro ao obter contadores',
        message: error.message 
      });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
