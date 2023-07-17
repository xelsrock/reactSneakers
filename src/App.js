import React from 'react'
import { Routes, Route } from 'react-router-dom';
import axios from 'axios'
import Header from './components/Header'
import Drawer from './components/Drawer'
import Home from './pages/Home';
import Favorites from './pages/Favorites';

// const arrSneakers = [
//   {"id": "1", "name": "Мужские Кроссовки Nike Blazer Mid Suede", "price": 12999, "img": "/img/sneakers/1.jpg"},
//   {"id": "2", "name": "Мужские Кроссовки Nike Air Max 270", "price": 13000, "img": "/img/sneakers/2.jpg"},
//   {"id": "3", "name": "Мужские Кроссовки Nike Blazer Mid Suede", "price": 8499, "img": "/img/sneakers/3.jpg"},
//   {"id": "4", "name": "Кроссовки Puma X Aka Boku Future Rider", "price": 8999, "img": "/img/sneakers/4.jpg"},
//   {"id": "5", "name": "Мужские Кроссовки Under Armour Curry 8", "price": 15999, "img": "/img/sneakers/5.jpg"},
//   {"id": "6", "name": "Мужские Кроссовки Nike Kyrie 7", "price": 12999, "img": "/img/sneakers/6.jpg"},
//   {"id": "7", "name": "Мужские Кроссовки Jordan Air Jordan 11", "price": 11999, "img": "/img/sneakers/7.jpg"},
//   {"id": "8", "name": "Мужские Кроссовки Nike LeBron XVIII", "price": 12499, "img": "/img/sneakers/8.jpg"},
//   {"id": "9", "name": "Мужские Кроссовки Nike Lebron XVIII Low", "price": 9999, "img": "/img/sneakers/9.jpg"},
//   {"id": "10", "name": "Мужские Кроссовки Nike Blazer Mid Suede", "price": 13499, "img": "/img/sneakers/10.jpg"},
//   {"id": "11", "name": "Кроссовки Puma X Aka Boku Future Rider", "price": 12499, "img": "/img/sneakers/1.jpg"},
//   {"id": "12", "name": "Мужские Кроссовки Nike Kyrie Flytrap IV", "price": 11999, "img": "/img/sneakers/2.jpg"}
// ]

function App() {
  const [cartOpen, setCartOpen] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');

  const [favoriteItems, setFavoriteItems] = React.useState(() => {
    return JSON.parse(localStorage.getItem('favorite')) || [];
  });

  const [cartItems, setCartItems] = React.useState(() => {
    return JSON.parse(localStorage.getItem('sneakers')) || [];
  });

  React.useEffect(() => {
    axios.get('https://64b0146cc60b8f941af53120.mockapi.io/items').then((res) => {
      setItems(res.data);
    });
  }, []);

  React.useEffect(() => {
    localStorage.setItem('sneakers', JSON.stringify(cartItems));
  }, [cartItems]);

  React.useEffect(() => {
    localStorage.setItem('favorite', JSON.stringify(favoriteItems));
  }, [favoriteItems]);

  const onAddToCart = (obj) => {
    if (!cartItems.map(obj => obj.id).includes(obj.id)) {
      setCartItems([...cartItems, obj]);
    }
  };

  const onAddToFavorite = (obj) => {
    if (favoriteItems.find(favObj => favObj.id === obj.id)) {
      setFavoriteItems(prev => prev.filter(item => item.id !== obj.id));
    } else {
      setFavoriteItems(prev => [...prev, obj]);
    }
  };

  const removeItemsCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const onInputSearch = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpen && <Drawer removeItemsCart={removeItemsCart} cartItems={cartItems} onClose={() => setCartOpen(false)}/>}

      <Header onClickCart={() => setCartOpen(true)}/>

      <Routes>
        <Route
          path="/"
          element={
            <Home
              items={items}
              searchValue={searchValue}
              onInputSearch={onInputSearch}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
            />
          }
          exact
        />

        <Route
          path="/favorites"
          element={
            <Favorites 
              items={favoriteItems}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
            />
          }
          exact
        />
      </Routes>
    </div>
  );
}

export default App;
