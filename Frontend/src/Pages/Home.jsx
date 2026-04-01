import { useState } from 'react'
import axios from 'axios'
import Gameimagem from '../components/GameImagem'
import { useNavigate } from 'react-router-dom'

const Home = ({ games, fetchGames }) => {
  const [estaEditando, setEstaEditando] = useState(false)
  const [jogoEscolhido, setJogoEscolhido] = useState(null)

  const navigate = useNavigate()

  const openEditModal = (e, game) => {
    e.stopPropagation()
    setJogoEscolhido(game)
    setEstaEditando(true)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try{
      await axios.put(`http://localhost:3001/games/${jogoEscolhido.id}`, jogoEscolhido)
      setEstaEditando(false)
      fetchGames()
      alert("jogo atualizado")
    }catch (err) {
      alert("não atualizou")
    }
  }

  const deleteGame = async (e, id) => {
    e.stopPropagation()
    if (window.confirm("Remover?")) {
      try {
        await axios.delete(`http://localhost:3001/games/${id}`)
        fetchGames()
      } catch (err) { alert('não deletou')}
    }
  }

  return (
    <div className="home-content">
      <h2>Lista de Jogos</h2>
      <div className = 'game-grid'>
        {games.length > 0 ? (
          games.map((game) => (
            <div key={game.id} className="game-card" onClick = {() => navigate(`/detalhes/${game.id}`)}>
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
                  <div className = 'action-buttons'>
                    <button onClick={(e) => openEditModal(e, game)} className = 'button-edit'>Editar</button>
                    <button onClick={(e) => deleteGame(e, game.id)} className = "button-delete">Remover</button>
                  </div>
                </div>
              </div>
            </div> 
          ))
        ) : (
          <p>Carregando os jogos ou nenhum foi encontrado...</p>
        )}
      </div>

      {estaEditando && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Editar Jogo</h3>
            <form onSubmit={handleUpdate}>
              <input 
                placeholder="Título" 
                value={jogoEscolhido.titulo} 
                onChange={(e) => setJogoEscolhido({...jogoEscolhido, titulo: e.target.value})} 
                required 
              />
              <input 
                placeholder="Gênero" 
                value={jogoEscolhido.genero} 
                onChange={(e) => setJogoEscolhido({...jogoEscolhido, genero: e.target.value})} 
                required 
              />
              <input 
                placeholder="Plataforma" 
                value={jogoEscolhido.plataforma} 
                onChange={(e) => setJogoEscolhido({...jogoEscolhido, plataforma: e.target.value})} 
                required 
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="number" 
                  placeholder="Ano" 
                  value={jogoEscolhido.ano_lanc} 
                  onChange={(e) => setJogoEscolhido({...jogoEscolhido, ano_lanc: e.target.value})} 
                  required 
                />
                <input 
                  type="number" 
                  step="0.01"
                  placeholder="Preço" 
                  value={jogoEscolhido.preco} 
                  onChange={(e) => setJogoEscolhido({...jogoEscolhido, preco: e.target.value})} 
                  required 
                />
                <input 
                  type="number" 
                  placeholder="Troféus" 
                  value={jogoEscolhido.trofeus} 
                  onChange={(e) => setJogoEscolhido({...jogoEscolhido, trofeus: e.target.value})} 
                  required 
                />
              </div>
              
              <div className="modal-actions">
                <button type="submit" className="btn-save">Salvar</button>
                <button type="button" className="btn-cancel" onClick={() => setEstaEditando(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home