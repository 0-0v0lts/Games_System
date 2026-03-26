import { useState, useEffect } from 'react'
import axios from 'axios'

const Gameimagem = ({ title }) => {
  const [imgUrl, setImgUrl] = useState('')

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.get(`https://api.jikan.moe/v4/anime?q=${title}&limit=1`)
        if (res.data.data.length > 0) {
          setImgUrl(res.data.data[0].images.jpg.large_image_url)
        }
      } catch (err) {
        console.error("nn achou a imagem", err)
      }
    }
    fetchImage()
  }, [title])
  return (
    <img 
    src = {imgUrl || 'https://via.placeholder.com/280x160?text=Buscando+Capa...'}
    alt = {title}
    style = {{ 
      width: '100%',
      height: '160px',
      objectFit: 'cover',
      borderRadius: '12px 12px 0 0' 
    }}
    />
  )
}

function App() {
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
    <div style = {{ 
      padding: '40px',
      fontFamily: 'sans-serif',
      backgroundColor: '#f0f2f5',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#1a1a1a' }}>Sistema de Cadastro de Platinas</h1>
      <hr />

      <h2>Lista de Jogos</h2>
      <div style={{
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap'
       }}>
        {games.length > 0 ? (
          games.map((game) => (
            <div key={game.id}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0px 2px 5px rgba(0,0,0,0.8)',
              width: '280px',
              border: '1px solid #e1e4e8',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              transition: 'transform 0.2s',
              cursor: 'pointer',
              overflow: 'hidden'
            }}>
              <Gameimagem title = {game.titulo} />

              <h3>{game.titulo}</h3>
              <p><strong>Gênero:</strong> {game.genero}</p>
              <p><strong>plataforma:</strong> {game.plataforma}</p>
              <p><strong>Ano:</strong> {game.ano_lanc}</p>
              <p style = {{ color: 'green', fontWeight: 'bold' }}>R$ {game.preco}</p>
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