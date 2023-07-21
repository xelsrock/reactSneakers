import React from 'react'
import { AppContext } from './../App';

export const Info = ({ title, description, imgUrl }) => {
  const { setCartOpen } = React.useContext(AppContext);

  return (
    <div className='d-flex align-center justify-center flex-column flex'>
      <img
        className='mb-20' 
        width='120px'
        src={imgUrl} 
        alt="Empty" 
      />
      <h2>{title}</h2>
      <p className='opacity-6'>{description}</p>
      <button onClick={() => setCartOpen(false)} className='green__btn'>
      <img src="..img/arrow_back.svg" alt="Arrow" className='mr-20' />
        Вернуться назад
      </button>
    </div>
  )
}
