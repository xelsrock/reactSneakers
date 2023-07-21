import React from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

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

export const AppContext = React.createContext({});

function App() {
  const [cartOpen, setCartOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [cartCount, setCartCount] = React.useState(0);

  const [favoriteItems, setFavoriteItems] = React.useState(() => {
    return JSON.parse(localStorage.getItem('favorite')) || [];
  });

  const [cartItems, setCartItems] = React.useState(() => {
    return JSON.parse(localStorage.getItem('sneakers')) || [];
  });

  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsRes = await axios.get('https://64b0146cc60b8f941af53120.mockapi.io/items');
        setItems(itemsRes.data);
        setCartCount(cartItems.reduce((sum, obj) => {
          return obj.price + sum;
        }, 0));
        setIsLoading(false);
      } catch (error) {
        alert('Ошибка при загрузке данных');
        console.error(error)
      }
    }
    
    fetchData();
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
      setCartCount(prev => prev + obj.price);
    } else {
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
      setCartCount(prev => prev - obj.price);
    }
  };

  const onAddToFavorite = (obj) => {
    if (favoriteItems.find(favObj => favObj.id === obj.id)) {
      setFavoriteItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
    } else {
      setFavoriteItems(prev => [...prev, obj]);
    }
  };

  const removeItemsCart = (obj) => {
    setCartItems(prev => prev.filter(item => item.id !== obj.id));
    setCartCount(prev => prev - obj.price);
  };

  const onInputSearch = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <AppContext.Provider value={ 
      {
        items, 
        cartItems, 
        favoriteItems, 
        setCartOpen, 
        setCartItems, 
        cartCount, 
        setCartCount,
        onAddToCart,
        onAddToFavorite
      }}>
      <div className="wrapper clear">
        {cartOpen && <Drawer 
          removeItemsCart={removeItemsCart} 
          cartItems={cartItems} 
          onClose={() => setCartOpen(false)}
        />}

        <Header onClickCart={() => setCartOpen(true)} cartCount={cartCount}/>

        <Routes>
          <Route
            path=""
            element={
              <Home
                items={items}
                favoriteItems={favoriteItems}
                searchValue={searchValue}
                cartItems={cartItems}
                onInputSearch={onInputSearch}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
            exact='true'
          />

          <Route
            path="favorites"
            element={
              <Favorites 
                items={favoriteItems}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
              />
            }
            exact='true'
          />

          <Route
            path='orders'
            element={
              <Orders/>
            }
            exact='true'
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
