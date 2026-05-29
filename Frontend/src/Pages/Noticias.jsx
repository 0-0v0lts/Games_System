import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Noticias.css';

const Noticias = () => {
    const [noticias, setNoticias] = useState([]);
    const [categoriaAtiva, setCategoriaAtiva] = useState('tudo');
    const [loading, setLoading] = useState(true);

    const categorias = [
        { id: 'tudo', label: 'TUDO' },
        { id: 'lancamentos', label: 'LANÇAMENTOS' },
        { id: 'atualizacoes', label: 'ATUALIZAÇÕES' },
        { id: 'eventos', label: 'EVENTOS' },
        { id: 'comunidade', label: 'COMUNIDADE' },
        { id: 'ranking', label: 'RANKING' },
        { id: 'guia', label: 'GUIA' }
    ];

    useEffect(() => {
        const fetchNoticias = async () => {
            try {
                setLoading(true);
                const url = categoriaAtiva === 'tudo'
                    ? 'http://localhost:3001/noticias'
                    : `http://localhost:3001/noticias?categoria=${categoriaAtiva}`;
                const res = await axios.get(url);
                setNoticias(res.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchNoticias();
    }, [categoriaAtiva]);

    return (
        <div className="noticias-page">
            <aside className="noticias-sidebar">
                <h2>NOTÍCIAS</h2>
                <div className="categorias-section">
                    <h3>CATEGORIAS</h3>
                    <div className="categorias-list">
                        {categorias.map((cat) => (
                            <button
                                key={cat.id}
                                className={`categoria-btn ${categoriaAtiva === cat.id ? 'active' : ''}`}
                                onClick={() => setCategoriaAtiva(cat.id)}
                            >
                                {categoriaAtiva === cat.id ? cat.label : `- ${cat.label}`}
                            </button>
                        ))}
                    </div>
                </div>
            </aside>

            <main className="noticias-content">
                <header className="noticias-header">
                    <span>ÁREA DE NOTÍCIAS</span>
                </header>

                {loading ? (
                    <div className="loading-msg">Carregando notícias...</div>
                ) : (
                    <div className="noticias-grid">
                        {noticias.map((noticia) => (
                            <div key={noticia.id} className="noticia-card">
                                <div className="noticia-img-container">
                                    <img src={noticia.imagem_url} alt={noticia.titulo} />
                                </div>
                                <div className="noticia-info">
                                    <p className="noticia-titulo">{noticia.titulo}</p>
                                </div>
                            </div>
                        ))}
                        {noticias.length === 0 && (
                            <div className="no-noticias">Nenhuma notícia encontrada nesta categoria.</div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Noticias;