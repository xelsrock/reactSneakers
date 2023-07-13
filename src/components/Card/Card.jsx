import styles from './Card.module.scss';

const Card = ({ name, price, img }) => {
  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img src="img/heart-unlike.svg" alt="Добавить в Избранное"/>
      </div>

      <img width={133} height={112} src={img} alt="Sneakers"/>
      <h5>{name}</h5>
      <div className="d-flex justify-between">
        <div className="d-flex flex-column align-center">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <button className="button">
          <img width={11} height={11} src="/img/plus.svg" alt="Plus"/>
        </button>
      </div>
    </div>
  )
}

export default Card