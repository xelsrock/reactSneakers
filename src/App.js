import Card from './components/Card/Card'
import Header from './components/Header'
import Drawer from './components/Drawer'

const arrSneakers = [
  {name: 'Мужские Кроссовки Nike Blazer Mid Suede', price: 12999, img: '/img/sneakers/1.jpg'},
  {name: 'Мужские Кроссовки Nike Air Max 270', price: 13000, img: '/img/sneakers/2.jpg'},
  {name: 'Мужские Кроссовки Nike Blazer Mid Suede', price: 8499, img: '/img/sneakers/3.jpg'},
  {name: 'Кроссовки Puma X Aka Boku Future Rider', price: 8999, img: '/img/sneakers/4.jpg'},
]

function App() {
  return (
    <div className="wrapper clear">
      <Drawer />
      <Header />
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>Все кроссовки</h1>
          
          <div className="search__block d-flex">
            <img src="img/search.svg" alt="Поиск"/>
            <input placeholder="Поиск..."/>
          </div>
        </div>

        <div className="d-flex">
          {
            arrSneakers.map((arr, i) => <Card key={i} name={arr.name} price={arr.price} img={arr.img}/>)
          }
        </div>
      </div>
    </div>
  );
}

export default App;
