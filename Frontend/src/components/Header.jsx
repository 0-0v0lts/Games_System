import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
    return (
        <header className = "main-header">
            <div className = 'header-left'>
                <Link to = "/" className = "logo">
                Home
                </Link>
            </div>

            <div className = 'header-right'>
                <Link to = "/Cadastrar" className = 'add-button'>
                Cadastrar
                </Link>
                 <div className = 'user-profile'>
                <div className = 'avatar'>LF</div>
                <span className = 'user-name'>Lucas Ferraz dos Santos</span>
                </div>
            </div>
        </header>
    )
}

export default Header;