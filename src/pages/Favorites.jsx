import Card from '../components/Card/Card'

const Favorites = ({ items, onAddToCart, onAddToFavorite }) => {
  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Избранное</h1>
      </div>

      <div className="d-flex flex-wrap">
          {items
            .map((arr, i) => (
              <Card 
                key={i} 
                onPlus={() => onAddToCart(arr)}
                onLike={() => onAddToFavorite(arr)}
                favorite={true}
                {...arr}
              />
            ))}
        </div>
    </div>
  )
}

export default Favorites