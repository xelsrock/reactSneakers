import Card from "../components/Card/Card"

const Home = ({ 
  items,
  searchValue,
  onInputSearch,
  cartItems,
  onAddToFavorite,
  onAddToCart,
  favoriteItems,
  isLoading
}) => {

  const renderItems = () => {
    const filtredItems = items.filter((elem) => 
      elem.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (isLoading ? [...Array(8)] : filtredItems).map((arr, i) => (
      <Card 
        key={i} 
        onPlus={() => onAddToCart(arr)}
        onLike={() => onAddToFavorite(arr)}
        //? favorite={favoriteItems.find(favObj => favObj.id === arr.id) ? true : false}
        //? added={cartItems.some(obj => obj.id === arr.id)} 
        loading={isLoading}
        {...arr}
      />
    ))
  }

  return (
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
        {renderItems()}
      </div>
    </div>
  )
}

export default Home