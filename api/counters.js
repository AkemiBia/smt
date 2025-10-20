// Vercel Serverless Function - Versão sem KV (temporária)
// Para usar com KV, veja instruções no README_VERCEL.md

// Dados dos contadores (salvos em memória temporariamente)
let counters = [
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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'GET') {
    try {
      return res.status(200).json(counters);
    } catch (error) {
      console.error('Erro ao obter contadores:', error);
      return res.status(500).json({ error: 'Erro ao obter contadores', details: error.message });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
