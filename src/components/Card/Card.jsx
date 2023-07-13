import React from 'react';
import styles from './Card.module.scss';

const Card = ({ name, price, img, onFavorite, onPlus }) => {
  
  const [isAdd, setIsAdd] = React.useState(false);

  const onClickPlus = () => {
    onPlus({ name, price, img });
    setIsAdd(!isAdd);
  }

  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img src="img/heart-unlike.svg" alt="Добавить в Избранное" onClick={onFavorite}/>
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