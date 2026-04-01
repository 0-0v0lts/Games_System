import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Detalhes.css';

const Detalhes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  const RAWG_KEY = 'a270cb5741884441adca87b8298d3c1b'; 

useEffect(() => {
  const fetchAllData = async () => {
    try {
      setLoading(true);
      
      const resLocal = await axios.get(`http://localhost:3001/games/${id}`);
      const localData = resLocal.data;
      const RAWG_KEY = 'a270cb5741884441adca87b8298d3c1b'; 
      const resRawg = await axios.get(
        `https://api.rawg.io/api/games?key=${RAWG_KEY}&search=${localData.titulo}`
      );

      let extraData = { sobre: "Descrição não encontrada." };
      
      if (resRawg.data.results.length > 0) {
        const gameSlug = resRawg.data.results[0].slug;
        const resDesc = await axios.get(
          `https://api.rawg.io/api/games/${gameSlug}?key=${RAWG_KEY}`
        );
        
        const textoOriginal = resDesc.data.description_raw;

        try {
          const resTranslate = await axios.get(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textoOriginal.substring(0, 500))}&langpair=en|pt-BR`
          );
          extraData.sobre = resTranslate.data.responseData.translatedText;
        } catch (err) {

          extraData.sobre = textoOriginal;
        }

        extraData.background = resDesc.data.background_image_additional || resDesc.data.background_image;
      }

      setGame({ ...localData, ...extraData });
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchAllData();
}, [id]);

  if (loading) return <div className="loading-screen">Carregando Detalhes...</div>;
  if (!game) return <div className="error-screen">Jogo não encontrado.</div>;

  return (
    <div className="details-page">
      <div 
        className="hero-banner" 
        style={{ backgroundImage: `url(${game.background || 'https://via.placeholder.com/1200x600'})` }}
      >
        <div className="hero-overlay"></div>
      </div>

      <div className="details-content">
        <button className="back-link" onClick={() => navigate('/')}>
          ← VOLTAR PARA A BIBLIOTECA
        </button>

        <header className="details-header">
          <div className="header-meta">
            <span className="year-tag">{game.ano_lanc}</span>
            <span className="platform-tag">{game.plataforma}</span>
          </div>
          <h1>{game.titulo}</h1>
        </header>

        <main className="details-main-grid">
          <section className="about-section">
            <h2>Sobre</h2>
            <p>{game.sobre || "Nenhuma descrição disponível para este título em português."}</p>
          </section>

          <aside className="stats-aside">
            <div className="stat-card">
              <span className="label">Investimento</span>
              <span className="value">R$ {game.preco}</span>
            </div>
            <div className="stat-card">
              <span className="label">Conquista</span>
              <span className="value"><img 
                    src="https://cdn-icons-png.flaticon.com/512/3112/3112946.png" 
                    alt="trofeu" 
                    style={{ width: '20px', height: '18px', filter: 'brightness(0) invert(1)', marginRight: '2px' }} 
                  /> {game.trofeus} Troféus</span>
            </div>
            <div className="stat-card">
              <span className="label">Gênero</span>
              <span className="value">{game.genero}</span>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
};

export default Detalhes;