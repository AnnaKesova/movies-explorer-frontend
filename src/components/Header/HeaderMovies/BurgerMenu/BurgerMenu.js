import { Link, useNavigate } from 'react-router-dom';
import './BurgerMenu.css';
import people from "../../../../images/people.svg";

function BurgerMenu({ isOpen, isClose }) {
  const navigate = useNavigate();
  function toProfile() {
    navigate("/profile");
  } 

  return (
    <div className={`burger-menu ${isOpen && 'open'}`}>
      <div className='burger-menu__container'>
        <button
          className='burger-menu__close-icon'
          onClick={isClose}
          type='button'
        />
        <nav className='burger-menu__link-wrapper'>
            <div className='burger-menu__overlay'></div>
          <Link to='/' className='burger-menu__link'>
            Главная
          </Link>
          <Link to='/movies' className='burger-menu__link'>
            Фильмы
          </Link>
          <Link to='/saved-movies' className='burger-menu__link'>
            Сохраненные фильмы
          </Link>
        </nav>
        <button className="movies__profile" type="button" onClick={toProfile}>
            <span className="movies__name">Аккаунт</span>
            <div className="movies__radius">
              <img src={people} className="movies__my" alt="people" />
            </div>
          </button>
      </div>
    </div>
  );
}

export default BurgerMenu;