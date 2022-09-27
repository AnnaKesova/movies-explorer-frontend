import logo from '../../images/logo.svg';
import './App.css';

function App() {
  return (
    <div className='app'>
        <div className="app__page page">
      <header className="page__header header">
        <div className="header__content"> 
        <img src={logo} className="header__logo" alt="logo" />
        <nav className="header__menu menu">
          <ul className="menu__list">
            <li className="menu__routes">
              <button className="menu__route menu__route_border_none" type="button" title="Регистрация">Регистрация</button>
              </li>
              <li className="menu__routes">
                <button className="menu__route menu__route_border_yes" type="button" title="Войти">Войти</button>
            </li>
          </ul>
        </nav>
        </div>
      </header>
    </div>
    </div>
  );
}

export default App;
