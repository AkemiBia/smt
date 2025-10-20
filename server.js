import express from 'express';
import cors from 'cors';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const app = express();
const PORT = 3001;
const COUNTERS_FILE = join(process.cwd(), 'contadores.txt');

app.use(cors());
app.use(express.json());

// Função para ler contadores do arquivo
function readCounters() {
  try {
    const content = readFileSync(COUNTERS_FILE, 'utf-8');
    // Normalizar quebras de linha (Windows usa \r\n)
    const lines = content.replace(/\r\n/g, '\n').trim().split('\n');
    return lines.map(line => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return null; // Ignora linhas vazias
      
      // Formato: Nome - numero - imagem (imagem é opcional)
      const match = trimmedLine.match(/^(.+?)\s*-\s*(\d+)(?:\s*-\s*(.+))?$/);
      if (match) {
        return {
          name: match[1].trim(),
          value: parseInt(match[2], 10),
          image: match[3] ? match[3].trim() : null
        };
      }
      return null;
    }).filter(Boolean);
  } catch (error) {
    console.error('Erro ao ler arquivo:', error);
    return [];
  }
}

// Função para salvar contadores no arquivo
function saveCounters(counters) {
  try {
    const content = counters.map(c => {
      if (c.image) {
        return `${c.name} - ${c.value} - ${c.image}`;
      }
      return `${c.name} - ${c.value}`;
    }).join('\n');
    writeFileSync(COUNTERS_FILE, content + '\n', 'utf-8');
    return true;
  } catch (error) {
    console.error('Erro ao salvar arquivo:', error);
    return false;
  }
}

// Rota para obter contadores
app.get('/api/counters', (req, res) => {
  const counters = readCounters();
  res.json(counters);
});

// Rota para incrementar um contador específico
app.post('/api/counters/:index/increment', (req, res) => {
  const index = parseInt(req.params.index, 10);
  const counters = readCounters();
  
  if (index >= 0 && index < counters.length) {
    counters[index].value += 1;
    const success = saveCounters(counters);
    
    if (success) {
      res.json(counters[index]);
    } else {
      res.status(500).json({ error: 'Erro ao salvar contador' });
    }
  } else {
    res.status(404).json({ error: 'Contador não encontrado' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

