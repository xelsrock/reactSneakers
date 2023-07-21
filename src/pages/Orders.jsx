import axios from 'axios';
import React from 'react';
import Card from '../components/Card/Card';
import { AppContext } from '../App';

export const Orders = () => {
  const {onAddToCart, onAddToFavorite} = React.useContext(AppContext);
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  
  React.useEffect(() => {
    try {
      (async () => {
        const { data } = await axios.get('https://64b0146cc60b8f941af53120.mockapi.io/order');
        setOrders(data);
        setIsLoading(false);
      })()
    } catch (error) {
      alert('Ошибка при получении товаров с корзины');
      console.error(error);
    }
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои заказы</h1>
      </div>

      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(4)] : orders).map((obj, i) => (
          <div className='order__content' key={i}>
            <h2>
              {
                !isLoading && `Заказ #${obj.id} от ${obj.date.day}.${obj.date.month}.${obj.date.year}, 
                  ${obj.date.hours}:${obj.date.minutes}`
              }
              
            </h2>
            <div className='order__card'>
              {(isLoading ? [...Array(4)] : obj.items).map((item, i) => (
                <Card 
                  key={i}
                  loading={isLoading}
                  {...item}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders;
