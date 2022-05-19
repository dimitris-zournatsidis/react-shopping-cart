import './App.css';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Item from './Item/Item';
import Cart from './Cart/Cart';

// Material UI components
import Drawer from '@material-ui/core/Drawer';
import { LinearProgress } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
// End of Material UI components

export interface CartItemType {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json();

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  );

  function getTotalItems(items: CartItemType[]) {
    return items.reduce((acc: number, item) => acc + item.amount, 0);
  }

  function handleAddToCart(clickedItem: CartItemType) {
    setCartItems((prev) => {
      // is the item already added in the cart?
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }

      // first time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  }

  function handleRemoveFromCart(id: number) {
    setCartItems((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1 }];
        } else {
          return [...acc, item];
        }
      }, [] as CartItemType[])
    );
  }

  function handleClearCart() {
    setCartItems([]);
  }

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong...</div>;
  return (
    <div className='app'>
      <Drawer
        anchor='right'
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      >
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
          clearCart={handleClearCart}
          closeCart={() => setIsCartOpen(false)}
        />
      </Drawer>

      <Button onClick={() => setIsCartOpen(true)} className='cart_button'>
        <Badge
          overlap='rectangular'
          badgeContent={getTotalItems(cartItems)}
          color='error'
        >
          <AddShoppingCartIcon />
        </Badge>
      </Button>

      <Grid container spacing={4}>
        {data?.map((item) => {
          return (
            <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddToCart} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default App;
