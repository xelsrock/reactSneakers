import React from 'react';
import styles from './Card.module.scss';

const Card = ({ id, name, price, img, onLike, onPlus, favorite = false }) => {
  
  const [isAdd, setIsAdd] = React.useState(false);
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
    </div>
  )
}

export default Card