import { createContext, useState } from "react";
import PRODUCTS from "../data/productsData.json";
// import { useAuthContext } from "../hooks/useAuthContext";

export const ShopContext = createContext(null);
// const { user } = useAuthContext();



const getDefaultCart = () => {

  let cart = {};
  for (let i = 1; i < PRODUCTS.products.length + 1; i++) {
    cart[i] = 0;

  }
  return cart;

  // let cart = {number:0};
  // return cart;
};

export const ShopContextProvider = (props) => {

  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [needUpdate, setNeedUpdate] = useState(0);

  const cartNeedUpdate = () => {
    return needUpdate;
  };


  const getCart = async (user) => {

    if (!user) {
      // console.log("getCart, user is null: ", user);
      return [];
    }

    
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/shoppingcart`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });
    const cart = await res.json();
    // console.log("==>cartItems:", cartItems);
    return cart;
  };

  const getCartInfo = async (user) => {
    const cart = await getCart(user);
    let cartInfo = [];
    for (const item in cart) {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/products/byMongoId?id=${cart[item].productId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const product = await res.json();
      // console.log("==>getCartInfo: quantity:", cart[item].productQuantity);
      // console.log("==>getCartInfo: imageURL:", product.imageURL[0]);
      cartInfo.push({
        _id: product._id,
        productId: product.id,
        name: product.name,
        price: product.price,
        imageURL: product.imageURL[0],
        quantity: cart[item].productQuantity,
      });
    }
    // console.log("==>getCartInfo:", cartInfo);
    return cartInfo;
  }

  const getTotalCartAmount = async (user) => {

    if(!user){
      console.log("getTotalCartAmount, user is null: ", user);
      return 0;
    }
    let totalAmount = 0;
    let cartinfor = await getCartInfo(user);
    console.log("getTotalCartAmount, cartinfor:", cartinfor);
    for (const item in cartinfor) {
      totalAmount += cartinfor[item].price * cartinfor[item].quantity;
    }
    return totalAmount;


    // let totalAmount = 0;
    // for (const item in cartItems) {
    //   if (cartItems[item] > 0) {
    //     console.log(cartItems[item])
    //     let itemInfo = PRODUCTS.products.find((product) => product.id === item);
    //     console.log(itemInfo.id)
    //     totalAmount += cartItems[item] * (itemInfo.price);
    //   }
    // }
    // return totalAmount;
  };

  const getTotalCartItems = async (user) => {
    // let totalItems = 0;
    // for (const item in cartItems) {
    //   if (cartItems[item] > 0) {
    //     totalItems += cartItems[item];
    //   }
    // }
    // return totalItems;


    if (!user) {
      // console.log("getTotalCartItems, user is null");
      return 0;
    }
    let totalAmount = 0;
    // console.log("getTotalCartItems, user token:", user.token);
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/shoppingcart`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });
    const cartItems = await res.json();
    // console.log("==>cartItems:", cartItems);
    for (const item in cartItems) {
      totalAmount += cartItems[item].productQuantity;
    }
    // console.log("==>totalAmount:", totalAmount);
    return totalAmount;


  };

  const addToCart = async (itemId, user) => {
    if(!user){
      return;
    }
    // setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

    // console.log("addToCart, userid:", user, itemId);
    // setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    //fetch('/shoppingcart',
    fetch(`${process.env.REACT_APP_SERVER_URL}/shoppingcart`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        // user:userid,
        body: JSON.stringify({
          userid: user.userid,
          productId: itemId,
          quantity: 1
        }),
      }).then(res => {
        // console.log("res:", res);
        if (res.ok) {
          //return res.json();  
          // console.log("added to cart");
          setNeedUpdate(needUpdate + 1);
        }
        else {
          // console.log("not added to cart");
        }
      }).catch(e => {
        console.error(e.error);
      });
  };

  const removeFromCart = (itemId, user) => {
    // setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));


    // console.log("removeFromCart, userid:", user, itemId);
    fetch(`${process.env.REACT_APP_SERVER_URL}/shoppingcart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      // user:userid,
      body: JSON.stringify({
        userid: user.userid,
        productId: itemId,
        quantity: -1
      }),
    }).then(res => {
      // console.log("res:", res);
      if (res.ok) {
        // console.log("remove from cart");
        setNeedUpdate(needUpdate + 1);
      }
      else {
        // console.log("not remove from  cart");
      }
    }).catch(e => {
      console.error(e.error);
    });
  };

  const updateCartItemCount = (newAmount, itemId) => {
    // setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const checkout = async (user) => {

    // let items = [];
    // for (const item in cartItems) {
    //   if (cartItems[item] > 0) {
    //     items.push({ id: item, quantity: cartItems[item] });
    //   }
    // }
    // console.log("checkout, userid:",userid);

    // console.log(" ----> checkout, userid:", user);

    fetch(`${process.env.REACT_APP_SERVER_URL}/checkout`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Athorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          //TODO: get the items from the cart
          userid: user.userid,
          items: [
            { id: 1, quantity: 3 },
            { id: 2, quantity: 1 },
          ]
        }),
      }).then(res => {
        if (res.ok) return res.json();
        return res.json.then(json => Promise.reject(json));
      }).then(({ url }) => {
        // console.log(url);
        window.location = url;
      }).catch(e => {
        console.error(e.error);
      });
    setCartItems(getDefaultCart());
  };

  const contextValue = {
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    checkout,
    cartNeedUpdate,
    getCart,
    getCartInfo,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};