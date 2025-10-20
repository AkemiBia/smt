const JSONBIN_BIN_ID = '67b556a1e41b4d34e472afeb';
const JSONBIN_KEY = '$2a$10$4EUQPyWmBIa.wfKD8QqP2eGLzHYrx4DZXNnhQWMPkBsWtVzxPkT0S';

export default async function handler(req, res) {
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
      
      // Buscar dados atuais
      const getResponse = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
        headers: {
          'X-Master-Key': JSONBIN_KEY
        }
      });
      
      if (!getResponse.ok) {
        throw new Error('Erro ao buscar dados');
      }
      
      const data = await getResponse.json();
      const counters = data.record;
      
      // Incrementar
      if (index >= 0 && index < counters.length) {
        counters[index].value += 1;
        
        // Salvar
        const updateResponse = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': JSONBIN_KEY
          },
          body: JSON.stringify(counters)
        });
        
        if (updateResponse.ok) {
          return res.status(200).json(counters[index]);
        } else {
          throw new Error('Erro ao salvar');
        }
      } else {
        return res.status(404).json({ error: 'Contador não encontrado' });
      }
    } catch (error) {
      console.error('Erro:', error);
      return res.status(500).json({ 
        error: 'Erro ao incrementar',
        message: error.message
      });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
