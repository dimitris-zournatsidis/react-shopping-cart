import './CartItem.css';
import Button from '@material-ui/core/Button';
import { CartItemType } from '../App';

interface CartItemProps {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
}

export default function CartItem(props: CartItemProps) {
  return (
    <div className='cart_item_container'>
      <div className='cart_item'>
        <h3>{props.item.title}</h3>
        <div className='information'>
          <p>Price: ${props.item.price}</p>
          <p>Total: ${(props.item.amount * props.item.price).toFixed(2)}</p>
        </div>

        <div className='buttons'>
          <Button
            size='small'
            disableElevation
            variant='contained'
            onClick={() => props.removeFromCart(props.item.id)}
            className='cart_minus_button'
          >
            -
          </Button>

          <p>{props.item.amount}</p>

          <Button
            size='small'
            disableElevation
            variant='contained'
            onClick={() => props.addToCart(props.item)}
            className='cart_plus_button'
          >
            +
          </Button>
        </div>
      </div>

      <img src={props.item.image} alt={props.item.title} />
    </div>
  );
}
