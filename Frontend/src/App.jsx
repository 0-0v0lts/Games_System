import { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './Pages/Home'
import Cadastro from './Pages/Cadastro'
import Detalhes from './Pages/Detalhes'
import './styles/App.css'

function App() {
  const [games, setGames] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
const [totalPages, setTotalPages] = useState(1)

  const fetchGames = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/games?page=${currentPage}`)
      setGames(response.data.games)
      setTotalPages(response.data.totalPages)
    } catch (error) {
      console.error("não achou os jogos:", error)
      alert("não ocnectou no servidor o backend talvez nn esteja ligado")
    }
  }

  useEffect(() => {
    fetchGames()
  }, [currentPage])

  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home games={games} fetchGames={fetchGames} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />}/>

          <Route path="/cadastrar" element={<Cadastro fetchGames={fetchGames} />}/>

          <Route path="/detalhes/:id" element={<Detalhes />}/>
        </Routes>
      </div>
      <footer className = 'footer-aluno'>
        <p>Copyright: Lucas Ferraz dos Santos</p>
      </footer>
    </BrowserRouter>
  )
}

export default App