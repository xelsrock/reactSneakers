const Drawer = ({ onClose, cartItems, removeItemsCart }) => {
  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="mb-30 d-flex justify-between">Корзина
          <img onClick={onClose} className="remove__btn cu-p" src="img/btn-remove.svg" alt="Удалить"/>

        </h2>
        
        <div className="items">
          {cartItems.length > 0 ? (
            cartItems.map((obj) => (
              <div className="cart__item d-flex align-center mb-20">
                <div style={{ backgroundImage: `url(${obj.img})` }} className="cart__item_img"></div>
                <div className="mr-20 flex">
                  <p className="mb-5">{obj.name}</p>
                  <b>{obj.price} руб.</b>
                </div>
                <img onClick={() => removeItemsCart(obj.id)} className="remove__btn" src="img/btn-remove.svg" alt="Удалить"/>
              </div> 
            ))) : null
          }
        </div>

        <div className="cart__total_block">
          <ul>
            <li>
              <span>Итого:</span>
              <div></div>
              <b>21 498 руб.</b>
            </li>
            <li>
              <span>Налог 5%: </span>
              <div></div>
              <b>1074 руб.</b>
            </li>
          </ul>
          
          <button className="green__btn">Оформить заказ
            <img src="img/arrow.svg" alt="Arrow"/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Drawer