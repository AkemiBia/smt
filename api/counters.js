// Vercel Serverless Function - Listar contadores
// Versão simplificada que sempre funciona

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
    try {
      console.log('API /counters chamada');
      
      // Por enquanto, sempre retornar valores padrão
      // Isso garante que o site funcione
      console.log('Retornando contadores padrão');
      return res.status(200).json(defaultCounters);
      
    } catch (error) {
      console.error('Erro:', error);
      return res.status(200).json(defaultCounters);
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
