import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const inputStyle = { 
  padding: '10px', 
  borderRadius: '6px', 
  border: '1px solid #ccc',
  outline: 'none'
}

const Cadastro = ({ fetchGames }) => {
  const [titulo, setTitulo] = useState('')
  const [genero, setGenero] = useState('')
  const [plataforma, setPlataforma] = useState('')
  const [ano_lanc, setAnoLanc] = useState('')
  const [preco, setPreco] = useState('')
  const [trofeus, setTrofeus] = useState('')
  
  const navigate = useNavigate()

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
      navigate('/') // Linha extra para voltar à home após cadastrar
    } catch (error) {
      console.error("não cadastrou:", error)
      alert("erro salvando no banco de dados")
    }
  }

  return (
    <div className='form-container' style={{ marginTop: '50px' }}>
      <h3 style={{ color: 'white' }}>Cadastrar Nova Platina</h3>
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
      
      <button 
        onClick={() => navigate('/')} 
        style={{ marginTop: '20px', background: 'none', border: '1px solid white', color: 'white', cursor: 'pointer', padding: '5px 10px', borderRadius: '4px' }}
      >
        Voltar para a Lista
      </button>
    </div>
  )
}

export default Cadastro