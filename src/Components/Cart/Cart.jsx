import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../Store/Cart-context";
import CheckOut from "./CheckOut";
function Cart(props) {
  const [isCheckout, setIsCheckout] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const hasItems = cartCtx.items.lenght > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const oredeHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      // "https://food-orders-ccc7a-default-rtdb.firebaseio.com/orders.json",
      'https://newfoodorders-662fe-default-rtdb.firebaseio.com/neworders.json',
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
          totalAmount:cartCtx.totalAmount
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart()
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {!hasItems && (
        <button className={classes.button} onClick={oredeHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalCounter = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <CheckOut onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </>
  );
  
  const isSubmittingModalContent = <p>sending order data...</p>
   
   const didSubmitModalContent = <>
   <p>successfully send the order!</p>
   <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose}>
        Close
      </button>
   </div>
   </>
   
  return <Modal onClose={props.onClose}>
    {!isSubmitting && !didSubmit && cartModalCounter}
    {isSubmitting && isSubmittingModalContent}
    { !isSubmitting && didSubmit && didSubmitModalContent}

    </Modal>;
}

export default Cart;
