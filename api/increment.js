// Vercel Serverless Function - Incrementar contador usando KV
import { kv } from '@vercel/kv';

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
      
      // Obter contadores do KV
      let counters = await kv.get('counters');
      
      if (!counters || !Array.isArray(counters)) {
        return res.status(404).json({ error: 'Contadores não encontrados' });
      }
      
      if (index >= 0 && index < counters.length) {
        counters[index].value += 1;
        
        // Salvar no KV
        await kv.set('counters', counters);
        
        return res.status(200).json(counters[index]);
      } else {
        return res.status(404).json({ error: 'Contador não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao incrementar contador:', error);
      return res.status(500).json({ error: 'Erro ao incrementar contador' });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
