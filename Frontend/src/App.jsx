import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const inputStyle = { 
  padding: '10px', 
  borderRadius: '6px', 
  border: '1px solid #ccc',
  outline: 'none'
}

const Gameimagem = ({ title }) => {
  const [imgUrl, setImgUrl] = useState('')
  const API_KEY = 'a270cb5741884441adca87b8298d3c1b'

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${title}`)
        if (res.data.results && res.data.results.length > 0) {
          setImgUrl(res.data.results[0].background_image)
        }
      } catch (err) {
        console.error("nn achou a imagem", err)
      }
    }
    if (title) fetchImage()
  }, [title, API_KEY])
  return (
    <div className='image-container'>
      <img 
      src = {imgUrl || 'https://via.placeholder.com/280x160?text=Buscando+Capa...'}
      alt = {title}
      />
    </div>
  )
}

function App() {

  const [titulo, setTitulo] = useState('')
  const [genero, setGenero] = useState('')
  const [plataforma, setPlataforma] = useState('')
  const [ano_lanc, setAnoLanc] = useState('')
  const [preco, setPreco] = useState('')
  const [trofeus, setTrofeus] = useState('')

  const deleteGame = async (id) => {
    if (window.confirm("Remover Platina?")) {
      try {
        await axios.delete(`http://localhost:3001/games/${id}`)
        fetchGames()
      } catch (err) { alert('não deletou')}
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:3001/games', {
        titulo,
        genero,
        plataforma,
        ano_lanc,
        preco,
        trofeus
      })

      alert("Cadastrado")

      setTitulo(''); setGenero(''); setAnoLanc(''); setPlataforma(''); setPreco(''); setTrofeus('');

      fetchGames()
    } catch (error) {
      console.error("não cadastrou:", error)
      alert("erro salvando no banco de dados")
    }
  }
  
  const [games, setGames] = useState([])

  const fetchGames = async () => {
    try {
      const response = await axios.get('http://localhost:3001/games')
      setGames(response.data)
    }catch (error) {
      console.error("não achou os jogos:", error)
      alert("não ocnectou no servidor o backend talvez nn esteja ligado")
    }
  }


  useEffect(() => {
    fetchGames()
  }, [])

  return(
    <div className = 'container'>
      <h1 style={{ color: 'white' }}>Sistema de Cadastro de Platinas</h1>

    <div className='form-container'>
        <h3>Cadastrar Nova Platina</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input 
            placeholder="Título" 
            value={titulo} 
            onChange={(e) => setTitulo(e.target.value)} 
            required 
            style={inputStyle} 
          />
          <input 
            placeholder="Gênero" 
            value={genero} 
            onChange={(e) => setGenero(e.target.value)} 
            required 
            style={inputStyle} 
          />
          <input 
            placeholder="Plataforma" 
            value={plataforma} 
            onChange={(e) => setPlataforma(e.target.value)} 
            required 
            style={inputStyle} 
          />
          <input 
            placeholder="Ano" 
            type="number" 
            value={ano_lanc} 
            onChange={(e) => setAnoLanc(e.target.value)} 
            required 
            style={{...inputStyle, width: '80px'}} 
          />
          <input 
            placeholder="Preço" 
            type="number" 
            step="0.01" 
            value={preco} 
            onChange={(e) => setPreco(e.target.value)} 
            required 
            style={{...inputStyle, width: '100px'}} 
          />
          <input 
            placeholder="Troféus" 
            type="number" 
            value={trofeus} 
            onChange={(e) => setTrofeus(e.target.value)} 
            required 
            style={{...inputStyle, width: '100px'}} 
          />
          <button type="submit" style={{
            padding: '10px 20px',
            backgroundColor: '#27ae60',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>Salvar</button>
        </form>
      </div>

      <hr style={{ opacity: 0.2, margin: '30px 0' }}/>

      <h2>Lista de Jogos</h2>
      <div className = 'game-grid'>
        {games.length > 0 ? (
          games.map((game) => (
            <div key={game.id} className="game-card">
              <Gameimagem title = {game.titulo} />
             <div className='info-game'>
                <div className = 'top-badges'>
                  <span className = "badge genre-badge">{game.genero}</span>
                  <span className = 'badge trophy-badge'>
                    <img 
                    src="https://cdn-icons-png.flaticon.com/512/3112/3112946.png" 
                    alt="trofeu" 
                    style={{ width: '10px', height: '10px', filter: 'brightness(0) invert(1)', marginRight: '2px' }} 
                  /> 
                  {game.trofeus}</span>
                </div>
                <h3 className = 'game-title'>{game.titulo}</h3>
                
                <div className='hover-detail'>
                  <div className = 'badge-row'>
                    <span className = 'badge platform-badge'>{game.plataforma}</span>
                    <span className = 'badge year-badge'>{game.ano_lanc}</span>
                    <span className='badge price-tag'>R$ {game.preco}</span>
                  </div>
                  <button onClick={() => deleteGame(game.id)} className = "button-delete">Remover</button>
                </div>
              </div>
            </div> 
          ))
        ) : (
          <p>Carregando os jogos ou nenhum foi encontrado...</p>
        )}
    </div>
  </div> 
  )
}

export default App