import React from 'react'

const Card = () => {
  return (
    <div className="card">
      <div className="favorite">
        <img src="img/heart-unlike.svg" alt="Добавить в Избранное"/>
      </div>

      <img width={133} height={112} src="/img/sneakers/1.jpg" alt="Sneakers"/>
      <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
      <div className="d-flex justify-between">
        <div className="d-flex flex-column align-center">
          <span>Цена:</span>
          <b>12 999</b>
        </div>
        <button className="button">
          <img width={11} height={11} src="/img/plus.svg" alt="Plus"/>
        </button>
      </div>
    </div>
  )
}

export default Card