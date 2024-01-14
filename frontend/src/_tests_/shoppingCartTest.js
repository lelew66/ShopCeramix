const userInfo = {
  _id: "123456789",
  username: "Lucy",
  email: "LuckLucy@example.com",
  password: "123456789",
  shoppingCart: [
    { productId: 1, quantity: 1 },
    { productId: 2, quantity: 1 },
  ],
};
const productsMockData = [
  {
    _id: "",
    productId: 1,
    name: "product name",
    price: 59.59,
    imageURL: "product imageURL",
    quantity: 100,
  },
  {
    _id: "",
    productId: 2,
    name: "product name",
    price: 109.59,
    imageURL: "product imageURL",
    quantity: 100,
  },
  {
    _id: "",
    productId: 3,
    name: "product name",
    price: 99.99,
    imageURL: "product imageURL",
    quantity: 100,
  },
];

let itemsInfo=[];
const getCart = async (userName) => {
    if (!userName) {
      return [];
    }
  
    if (userName === userInfo.username) {
      return userInfo.shoppingCart;
    } else {
      return [];
    }
  };

const getCartInfo = async (userName) => {
    if (!userName) {
        return [];
      }
    let cartInfo = [];
    let cart = await getCart(userName);
  const products = productsMockData;
  products.forEach((product) => {
    let index =cart.findIndex((item)=>item.productId===product.productId)
    if(index!==-1){
    cartInfo.push({
      _id: product._id,
      productId: product.productId,
      name: product.name,
      price: product.price,
      imageURL: product.imageURL,
      quantity: cart[index].quantity,
   
    });}
  });
  itemsInfo =cartInfo;
  return cartInfo;
};

const getTotalCartAmount = async (itemId,userName) => {
  if (!userName) {
    return 0;
  }
  
  if(itemId>0){
  await addToCart(itemId,userName)
}
  else if(itemId<0){
    await removeFromCart(itemId,userName).then(() => {
        console.log(itemsInfo);
    });
}
  let totalAmount = 0;
  for (let item of itemsInfo ) {
    totalAmount += parseFloat(item.price) * parseInt(item.quantity);
  }
  return totalAmount;
};

const getTotalCartItems = async (userName) => {
  if (!userName) {
    return 0;
  }

  let totalItems = 0;
  for (const item of itemsInfo) {
    totalItems += parseInt(item.quantity);
  }
  return totalItems;
};

const addToCart = async (itemId, userName) => {
  if (!userName) {
    return 0;
  }
 await getCartInfo(userName);
  const index = itemsInfo.findIndex((item) =>parseInt(item.productId) === parseInt( itemId));
  if (index !== -1) {
    itemsInfo[index].quantity += 1;   
  } else {
    const productIndex = productsMockData.findIndex(
        (product) => product.productId === itemId
      );
      itemsInfo.push({
        _id: productsMockData[productIndex]._id,
        productId: productsMockData[productIndex].productId,
        name: productsMockData[productIndex].name,
        price:productsMockData[productIndex].price,
        imageURL:productsMockData[productIndex].imageURL,
          quantity: 1
          });
  }
  return itemsInfo.length;
};

const removeFromCart = async (itemId, userName) => {
    if (!userName) {
      return 0;
    }
    await getCartInfo(userName);
    const index = itemsInfo.findIndex((item) =>parseInt(item.productId) === parseInt( itemId)*-1);
    if (index !== -1) {
        itemsInfo[index].quantity -= 1;
    } 
    return itemsInfo.length;
  };
  

module.exports = {
  getTotalCartAmount,
  getTotalCartItems,
  getCart,
  getCartInfo,
  addToCart,
  removeFromCart,
};
