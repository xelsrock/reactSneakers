import React from 'react';
import ContentLoader from "react-content-loader";
import styles from './Card.module.scss';

const Card = ({ 
  id, 
  name, 
  price, 
  img, 
  onLike, 
  onPlus, 
  favorite = false, 
  added = false, 
  loading = false 
}) => {
  
  const [isAdd, setIsAdd] = React.useState(added);
  const [isFavorite, setIsFavorite] = React.useState(favorite);

  const onClickPlus = () => {
    onPlus({ id, name, price, img });
    setIsAdd(!isAdd);
  };

  const onFavorite = () => {
    onLike({ id, name, price, img })
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {
        loading ? (
          <ContentLoader 
            speed={2}
            width={155}
            height={200}
            viewBox="0 0 155 200"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="10" ry="10" width="150" height="100" /> 
            <rect x="0" y="108" rx="5" ry="5" width="150" height="15" /> 
            <rect x="0" y="130" rx="5" ry="5" width="100" height="20" /> 
            <rect x="0" y="169" rx="5" ry="5" width="80" height="25" /> 
            <rect x="111" y="163" rx="5" ry="5" width="32" height="32" />
          </ContentLoader>
        ) : (
          <>
            <div className={styles.favorite}>
              <img src={isFavorite ? 'img/heart-like.svg' : 'img/heart-unlike.svg'} alt="Добавить в Избранное" onClick={onFavorite}/>
            </div>

            <img width={133} height={112} src={img} alt="Sneakers"/>
            <h5>{name}</h5>
            <div className="d-flex justify-between">
              <div className="d-flex flex-column align-center">
                <span>Цена:</span>
                <b>{price} руб.</b>
              </div>
              <img 
                className={styles.plus} 
                onClick={onClickPlus} 
                src={isAdd ? '/img/btn-check.svg' : '/img/btn-plus.svg'}
                alt="Plus"
              />
            </div>
          </>
        )
      }
      
    </div>
  )
}

export default Card