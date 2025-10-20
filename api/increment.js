export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'POST') {
    const { index, value } = req.body;
    
    if (typeof index !== 'number' || typeof value !== 'number') {
      return res.status(400).json({ error: 'Dados inválidos' });
    }
    
    // Retorna sucesso - o frontend gerencia tudo
    return res.status(200).json({ success: true, index, value });
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
