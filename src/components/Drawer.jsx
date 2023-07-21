import React from "react"
import { Info } from "./Info"
import { AppContext } from "../App";
import axios from "axios";

const Drawer = ({ onClose, cartItems, removeItemsCart }) => {
  const { setCartItems, cartCount, setCartCount } = React.useContext(AppContext);
  const [orderId, setOrderId] = React.useState(null);
  const [orderComplete, setOrderComplete] = React.useState(false);
  const [taxPrice, setTaxPrice] = React.useState(0);

  React.useEffect(() => {
    setTaxPrice(Math.floor((cartCount * 5) / 100));
  }, [cartCount]);

  const onClickOrder = async () => {
    try {
      const today = new Date();
      const { data } = await axios.post('https://64b0146cc60b8f941af53120.mockapi.io/order', {
        items: cartItems,
        date: {
          day:today.getDate(),
          month: today.getMonth() + 1,
          year: today.getFullYear(),
          hours: today.getHours() <= 9 ? '0' + today.getHours() : today.getHours(),
          minutes: today.getMinutes() <= 9 ? '0' + today.getMinutes() : today.getMinutes(),
        },
      });
      setOrderId(data.id);
      setOrderComplete(true);
      setCartItems([]);
      setCartCount(0);
    } catch (error) {
      alert(error, 'Не удалось создать заказ');
    }
  }

  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="mb-30 d-flex justify-between">Корзина
          <img onClick={onClose} className="remove__btn cu-p" src="img/btn-remove.svg" alt="Удалить"/>

        </h2>
        {cartItems.length > 0 ? (
          <>
          <div className="items">
            {
              cartItems.map((obj) => (
                <div key={obj.id} className="cart__item d-flex align-center mb-20">
                  <div style={{ backgroundImage: `url(${obj.img})` }} className="cart__item_img"></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.name}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img onClick={() => removeItemsCart(obj)} className="remove__btn" src="img/btn-remove.svg" alt="Удалить"/>
                </div> 
              ))
            }
          </div>

          <div className="cart__total_block">
            <ul>
              <li>
                <span>Итого:</span>
                <div></div>
                <b>{cartCount} руб.</b>
              </li>
              <li>
                <span>Налог 5%: </span>
                <div></div>
                <b>{taxPrice} руб.</b>
              </li>
            </ul>
            
            <button onClick={onClickOrder} className="green__btn">Оформить заказ
              <img src="img/arrow.svg" alt="Arrow"/>
            </button>
          </div>
        </>
        ) : (
          <Info
            title={!orderComplete ? 'Корзина пуста' : 'Заказ оформлен'} 
            description={!orderComplete
              ? 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ'
              : `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
            } 
            imgUrl={!orderComplete ? '../img/empty_cart.jpg' : '../img/complete_order.jpg'}
          />
        )
      }
        
       
      </div>
    </div>
  )
}

export default Drawer