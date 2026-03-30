import { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './Pages/Home'
import Cadastro from './Pages/Cadastro'
import './styles/App.css'

function App() {
  const [games, setGames] = useState([])

  const fetchGames = async () => {
    try {
      const response = await axios.get('http://localhost:3001/games')
      setGames(response.data)
    } catch (error) {
      console.error("não achou os jogos:", error)
      alert("não ocnectou no servidor o backend talvez nn esteja ligado")
    }
  }

  useEffect(() => {
    fetchGames()
  }, [])

  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <Routes>
          <Route 
            path="/" 
            element={<Home games={games} fetchGames={fetchGames} />} 
          />

          <Route 
            path="/cadastrar" 
            element={<Cadastro fetchGames={fetchGames} />} 
          />
          
          <Route path="/jogo/:id" element={<div style={{color: 'white'}}>Página de Detalhes em breve...</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App