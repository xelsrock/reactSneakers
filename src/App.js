import React from 'react'
import axios from 'axios'
import Card from './components/Card/Card'
import Header from './components/Header'
import Drawer from './components/Drawer'

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
  const [cartItems, setCartItems] = React.useState(() => {
    return JSON.parse(localStorage.getItem('sneakers')) || [];
  });

  React.useEffect(() => {
    // fetch('https://64b0146cc60b8f941af53120.mockapi.io/items')
    //   .then(res => res.json())
    //   .then(data => setItems(data))
    //   .catch(err => console.error(err));

    axios.get('https://64b0146cc60b8f941af53120.mockapi.io/items').then((res) => {
      setItems(res.data);
    });
  }, []);

  React.useEffect(() => {
    console.log('ok');
    localStorage.setItem('sneakers', JSON.stringify(cartItems));
  }, [cartItems])

  const onAddToCart = (obj) => {
    if (!cartItems.includes(obj)) {
      setCartItems([...cartItems, obj]);
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
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>
            {
              searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'
            }
          </h1>
          
          <div className="search__block d-flex">
            <img src="img/search.svg" alt="Поиск"/>
            <input onChange={onInputSearch} value={searchValue} placeholder="Поиск..."/>
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items
            .filter((elem) => elem.name.toLowerCase().includes(searchValue.toLowerCase()))
            .map((arr, i) => (
              <Card 
                key={i} 
                name={arr.name} 
                price={arr.price} 
                img={arr.img}
                onPlus={() => onAddToCart(arr)}
                onFavorite={() => console.log('like')}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
