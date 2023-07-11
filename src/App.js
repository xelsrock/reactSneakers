import Card from './components/Card'
import Header from './components/Header'
import Drawer from './components/Drawer'

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
          <Card />
        </div>
      </div>
    </div>
  );
}

export default App;
