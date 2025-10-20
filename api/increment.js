// Vercel Serverless Function - Incrementar contador
// Versão sem KV (dados em memória temporária)

// IMPORTANTE: Em produção, use Vercel KV para persistência
// Esta versão só mantém os dados enquanto a função estiver "quente"

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
      
      if (index >= 0 && index < counters.length) {
        counters[index].value += 1;
        return res.status(200).json(counters[index]);
      } else {
        return res.status(404).json({ error: 'Contador não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao incrementar contador:', error);
      return res.status(500).json({ error: 'Erro ao incrementar contador', details: error.message });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
