import './Item.css';
import Button from '@material-ui/core/Button';
import { CartItemType } from '../App';

interface ItemProps {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
}

export default function Item(props: ItemProps) {
  return (
    <div className='item_container'>
      <img src={props.item.image} alt={props.item.title} />
      <div className='item_properties'>
        <h3>{props.item.title}</h3>
        <p>{props.item.description}</p>
        <h3>${props.item.price}</h3>
      </div>

      <Button
        onClick={() => props.handleAddToCart(props.item)}
        className='add_to_cart_button'
      >
        Add to cart
      </Button>
    </div>
  );
}
