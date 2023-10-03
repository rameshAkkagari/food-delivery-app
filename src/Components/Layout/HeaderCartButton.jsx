import React,{useContext,useEffect,useState} from 'react'
import CartContext from '../../Store/Cart-context';
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css';
function HeaderCartButton(props) {
  const  [btn,setBtn] = useState(false)
    const cartctx = useContext(CartContext)
    const {items} = cartctx;

    const numberOfCartItems = cartctx.items.reduce((curNumber,item)=>{
        return curNumber + item.amount
    },0)
 

    const btnClasses = `${classes.button} ${btn ? classes.bump :""}`
 
   useEffect(()=>{
    if(items.length === 0){
      return;
    }
       setBtn(true)

     const timer =   setTimeout(() =>{
        setBtn(false)
       },300)

       return () =>{
        clearTimeout(timer)
       }
   },[items])
 
    return (
    <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon/>
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton