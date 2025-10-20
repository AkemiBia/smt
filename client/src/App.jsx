import { useState, useEffect } from 'react';
import './App.css';

const JSONBIN_BIN_ID = '67b556a1e41b4d34e472afeb';
const JSONBIN_KEY = '$2a$10$4EUQPyWmBIa.wfKD8QqP2eGLzHYrx4DZXNnhQWMPkBsWtVzxPkT0S';

const defaultCounters = [
  { name: 'Isabela', value: 0, image: '/avatars/isabela.jpg' },
  { name: 'Dedeai', value: 0, image: '/avatars/dedeai.png' },
  { name: 'Bibs', value: 0, image: '/avatars/bibs.jpg' },
  { name: 'Lali', value: 0, image: '/avatars/lali.jpeg' },
  { name: 'Samuel', value: 0, image: '/avatars/samuel.svg' },
  { name: 'Lari', value: 0, image: '/avatars/lari.svg' }
];

function App() {
  const [counters, setCounters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar contadores
  const loadCounters = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Tentar carregar do JSONBin
      const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
        headers: {
          'X-Master-Key': JSONBIN_KEY
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setCounters(data.record);
        // Salvar também no localStorage
        localStorage.setItem('counters', JSON.stringify(data.record));
      } else {
        // Tentar carregar do localStorage
        const saved = localStorage.getItem('counters');
        if (saved) {
          setCounters(JSON.parse(saved));
        } else {
          // Inicializar
          setCounters(defaultCounters);
          localStorage.setItem('counters', JSON.stringify(defaultCounters));
        }
      }
    } catch (err) {
      console.error('Erro ao carregar:', err);
      // Fallback para localStorage
      const saved = localStorage.getItem('counters');
      if (saved) {
        setCounters(JSON.parse(saved));
      } else {
        setCounters(defaultCounters);
      }
    } finally {
      setLoading(false);
    }
  };

  // Incrementar um contador específico
  const incrementCounter = async (index) => {
    try {
      // Incrementar localmente primeiro
      const newCounters = [...counters];
      newCounters[index].value += 1;
      setCounters(newCounters);
      
      // Salvar no JSONBin
      const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': JSONBIN_KEY
        },
        body: JSON.stringify(newCounters)
      });
      
      if (!response.ok) {
        console.error('Erro ao salvar no JSONBin:', response.status);
        // Fallback: usar localStorage
        localStorage.setItem('counters', JSON.stringify(newCounters));
      } else {
        console.log('Salvo com sucesso no JSONBin!');
        // Também salvar no localStorage como backup
        localStorage.setItem('counters', JSON.stringify(newCounters));
      }
    } catch (err) {
      console.error('Erro ao salvar:', err);
      // Fallback: usar localStorage
      localStorage.setItem('counters', JSON.stringify(newCounters));
    }
  };

  // Carregar contadores ao montar o componente
  useEffect(() => {
    loadCounters();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-2xl text-gray-700 animate-pulse">Carregando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erro</h2>
          <p className="text-gray-700">{error}</p>
          <button 
            onClick={loadCounters}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Vo me mata counter
          </h1>
          <p className="text-gray-600 text-lg">
            Clique nos botões quando alguem falar vo me mata em call
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {counters.map((counter, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-slate-300"
            >
              <div className="flex flex-col items-center space-y-6">
                <div className="flex items-center gap-4">
                  {counter.image && (
                    <img 
                      src={counter.image} 
                      alt={counter.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-slate-400 shadow-md"
                    />
                  )}
                  <h2 className="text-2xl font-semibold text-slate-700 tracking-wide">
                    {counter.name}
                  </h2>
                </div>
                
                {/* Contador analógico */}
                <div className="relative">
                  <div className="bg-slate-800 rounded-lg p-4 shadow-inner border-2 border-slate-700">
                    <div className="flex gap-2">
                      {String(counter.value).padStart(4, '0').split('').map((digit, i) => (
                        <div 
                          key={i}
                          className="bg-gradient-to-b from-slate-700 via-slate-600 to-slate-700 text-slate-100 rounded-md w-14 h-20 flex items-center justify-center shadow-lg border border-slate-500 relative overflow-hidden"
                          style={{
                            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)'
                          }}
                        >
                          <span className="text-5xl font-bold font-mono" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                            {digit}
                          </span>
                          {/* Linha horizontal no meio para efeito de flip */}
                          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-black opacity-20"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Brilho reflexivo */}
                  <div className="absolute top-2 left-2 right-2 h-8 bg-gradient-to-b from-white/5 to-transparent rounded-t-lg pointer-events-none"></div>
                </div>

                <button
                  onClick={() => incrementCounter(index)}
                  className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-semibold py-3 px-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 border border-slate-500"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={loadCounters}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Recarregar Contadores
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p></p>
        </div>
      </div>
    </div>
  );
}

export default App;
