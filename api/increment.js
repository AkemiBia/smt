// Vercel Serverless Function - Incrementar contador

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
      
      const defaultCounters = [
        { name: 'Isabela', value: 0, image: '/avatars/isabela.jpg' },
        { name: 'Dedeai', value: 0, image: '/avatars/dedeai.png' },
        { name: 'Bibs', value: 0, image: '/avatars/bibs.jpg' },
        { name: 'Lali', value: 0, image: '/avatars/lali.jpeg' },
        { name: 'Samuel', value: 0, image: '/avatars/samuel.svg' },
        { name: 'Lari', value: 0, image: '/avatars/lari.svg' }
      ];
      
      if (useKV && kv) {
        try {
          // Obter contadores do KV
          let counters = await kv.get('counters');
          
          if (!counters || !Array.isArray(counters)) {
            console.log('Inicializando contadores no KV');
            counters = defaultCounters;
            await kv.set('counters', counters);
          }
          
          if (index >= 0 && index < counters.length) {
            counters[index].value += 1;
            await kv.set('counters', counters);
            console.log('Contador incrementado com sucesso:', counters[index]);
            return res.status(200).json(counters[index]);
          } else {
            return res.status(404).json({ error: 'Contador não encontrado' });
          }
        } catch (kvError) {
          console.error('Erro ao usar KV:', kvError);
          return res.status(500).json({ 
            error: 'Erro ao usar KV',
            message: kvError.message,
            stack: kvError.stack
          });
        }
      } else {
        // KV não disponível
        return res.status(503).json({ 
          error: 'KV não configurado',
          message: 'Configure o Vercel KV Database para que os contadores funcionem',
          hasUrl: !!process.env.KV_REST_API_URL,
          hasToken: !!process.env.KV_REST_API_TOKEN
        });
      }
    } catch (error) {
      console.error('Erro geral ao incrementar:', error);
      return res.status(500).json({ 
        error: 'Erro ao incrementar contador',
        message: error.message,
        stack: error.stack
      });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
