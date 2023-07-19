import { Link } from 'react-router-dom';

const Header = ({ onClickCart, cartCount }) => {
  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to='/' exact='true'>
        <div className="d-flex align-center">
          <img width={40} height={40} src="/img/logo.png" alt="Logo"/>
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      
      <ul className="d-flex">
        <li onClick={onClickCart} className="mr-30 cu-p">
          <img width={18} height={18} src="/img/cart.svg" alt="Корзина"/>
          <span>{cartCount} руб.</span>
        </li>
        <li className="cu-p">
          <Link to='/favorites' exact='true'>
            <img width={18} height={18} src="/img/favorite.svg" alt="Избранное"/>
          </Link>
        </li>
        <li className="cu-p">
          <img width={18} height={18} src="/img/user.svg" alt="Профиль"/>
        </li>
      </ul>
    </header>
  )
}

export default Header