import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
function App() {
  const [coin, setCoin] = useState([])
  const [busca, setBusca] = useState('')
  const [termoFiltrado, setTermoFiltrado] = useState('')
  useEffect(() => {
    const guardarAPI = () => {
      const respostaAPI =   axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd', 
        order: 'market_cap_desc',
        per_page: 10,         
        page: 1,
        sparkline: false
      }
    })
      .then((response) => {
      setCoin(response.data);
    })
    .catch((error) => {
      console.error("Erro ao buscar dados da CoinGecko:", error);
    });
  }
  guardarAPI()
  }, [])
const moedasfiltradas = coin.filter((moeda) => {
  if (termoFiltrado === '') {
    return true

  }
   return (
      moeda.name.toLowerCase().includes(termoFiltrado.toLowerCase()) ||
      moeda.symbol.toLowerCase().includes(termoFiltrado.toLowerCase())
    );
})
  return (
    <>
    <h1>Painel de Monitoramento de Criptomoedas</h1>
    <input type="text" placeholder='digite aqui sua moeda'
    onChange={(e) => setBusca(e.target.value)}/>
    <div className='form-container'>
       <button className='but1' onClick={() => setTermoFiltrado(busca)}>Concluir</button>
       
    <button className='but2' type='submit' onClick={() => { setBusca(''); setTermoFiltrado(''); }}>Limpar</button>
    </div>
  <ol>
{moedasfiltradas?.map((coins) => (
  <li key={coins.id}><img src={coins.image} alt={coins.name} width="20" style={{ marginRight: '8px' }} />
            {coins.name} ({coins.symbol.toUpperCase()}) - ${coins.current_price}
</li>
))}
  </ol>
    </>
  )
}

export default App
