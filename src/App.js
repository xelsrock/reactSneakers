import React from 'react'
import Card from './components/Card/Card'
import Header from './components/Header'
import Drawer from './components/Drawer'

// const arrSneakers = [
//   {"name": "Мужские Кроссовки Nike Blazer Mid Suede", "price": 12999, "img": "/img/sneakers/1.jpg"},
//   {"name": "Мужские Кроссовки Nike Air Max 270", "price": 13000, "img": "/img/sneakers/2.jpg"},
//   {"name": "Мужские Кроссовки Nike Blazer Mid Suede", "price": 8499, "img": "/img/sneakers/3.jpg"},
//   {"name": "Кроссовки Puma X Aka Boku Future Rider", "price": 8999, "img": "/img/sneakers/4.jpg"},
//   {"name": "Мужские Кроссовки Under Armour Curry 8", "price": 15999, "img": "/img/sneakers/5.jpg"},
//   {"name": "Мужские Кроссовки Nike Kyrie 7", "price": 12999, "img": "/img/sneakers/6.jpg"},
//   {"name": "Мужские Кроссовки Jordan Air Jordan 11", "price": 11999, "img": "/img/sneakers/7.jpg"},
//   {"name": "Мужские Кроссовки Nike LeBron XVIII", "price": 12499, "img": "/img/sneakers/8.jpg"},
//   {"name": "Мужские Кроссовки Nike Lebron XVIII Low", "price": 9999, "img": "/img/sneakers/9.jpg"},
//   {"name": "Мужские Кроссовки Nike Blazer Mid Suede", "price": 13499, "img": "/img/sneakers/10.jpg"},
//   {"name": "Кроссовки Puma X Aka Boku Future Rider", "price": 12499, "img": "/img/sneakers/1.jpg"},
//   {"name": "Мужские Кроссовки Nike Kyrie Flytrap IV", "price": 11999, "img": "/img/sneakers/2.jpg"}
// ]

function App() {
  const [cartOpen, setCartOpen] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);

  React.useEffect(() => {
    fetch('https://64b0146cc60b8f941af53120.mockapi.io/items')
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error(err));
  }, []);

  const onAddToCart = (obj) => {
    if (!cartItems.find(elem => elem.name === obj.name)) {
      setCartItems(prev => [...prev, obj]);
    }
  };

  const removeItemsCart = (obj) => {
    setCartItems(prev => [...prev])
  };

  return (
    <div className="wrapper clear">
      {cartOpen && <Drawer removeItemsCart={removeItemsCart} cartItems={cartItems} onClose={() => setCartOpen(false)}/>}

      <Header onClickCart={() => setCartOpen(true)}/>
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>Все кроссовки</h1>
          
          <div className="search__block d-flex">
            <img src="img/search.svg" alt="Поиск"/>
            <input placeholder="Поиск..."/>
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {
            items.map((arr, i) => (
              <Card 
                key={i} 
                name={arr.name} 
                price={arr.price} 
                img={arr.img}
                onPlus={(obj) => onAddToCart(obj)}
                onFavorite={() => console.log('like')}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
