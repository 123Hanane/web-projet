import React, { useContext, useState, useEffect } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    setCartTotal(getTotalCartAmount());
  }, [cartItems, getTotalCartAmount]);

  const handlePayment = async () => {
    try {
      console.log('Payer', cartTotal);
      setTimeout(() => {
        console.log('Paiement réussi !');
      }, 2000);


      const response = await fetch('/your-payment-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: cartTotal,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Payment response:', data);
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      console.error('Erreur de paiement:', error);

    }
  };

  return (
    <div className='cartitems'>
      <div className="cartitem-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format cartitem-format-main">
                <img src={e.image} alt="" className='carticon-product-icon' />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                <p>${e.new_price * cartItems[e.id]}</p>
                <img
                  className='cartitems-remove-icon'
                  onClick={() => {
                    removeFromCart(e.id);
                  }}
                  src={remove_icon}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className='payment-container'>
        <button
          className="cartitems-pay-button"
          disabled={cartTotal <= 0}
          onClick={handlePayment}
        >
          Payer ${cartTotal}
        </button>
      </div>
    </div>
  );
};

export default CartItems;


