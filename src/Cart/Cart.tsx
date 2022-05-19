import './Cart.css';
import CartItem from '../CartItem/CartItem';
import { CartItemType } from '../App';
import CloseIcon from '@material-ui/icons/Close';

interface CartProps {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  closeCart: () => void;
}

export default function Cart(props: CartProps) {
  function calculateTotal(items: CartItemType[]) {
    return items.reduce(
      (acc: number, item) => acc + item.amount * item.price,
      0
    );
  }

  return (
    <aside className='cart_container'>
      <div className='top_cart_section'>
      <h2>Your Cart</h2>
      <CloseIcon onClick={props.closeCart} className='close_cart_button'/>
      </div>

      {props.cartItems.length > 1 && (
        <span onClick={props.clearCart} className='clear_cart_button'>
          Clear All
        </span>
      )}

      {props.cartItems.length === 0 ? <p>No items in cart</p> : null}
      {props.cartItems.map((cartItem) => {
        return (
          <CartItem
            key={cartItem.id}
            item={cartItem}
            addToCart={props.addToCart}
            removeFromCart={props.removeFromCart}
          />
        );
      })}

      {props.cartItems.length > 0 && (
        <h2>Total: ${calculateTotal(props.cartItems).toFixed(2)}</h2>
      )}
    </aside>
  );
}
