import React from 'react';
import { AppContext } from '../App';
import Card from '../components/Card/Card';

const Favorites = ({ onAddToCart, onAddToFavorite }) => {

  const { favoriteItems } = React.useContext(AppContext);

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Избранное</h1>
      </div>

      <div className="d-flex flex-wrap">
          {favoriteItems
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