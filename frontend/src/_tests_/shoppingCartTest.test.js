
const shoppingCart = require("./shoppingCartTest");

const {
  getTotalCartAmount,
  getTotalCartItems,
  getCart,
  getCartInfo,
  addToCart,
  removeFromCart,
} = shoppingCart;

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
const cartProducts = [
  {
    _id: "",
    productId: 1,
    name: "product name",
    price:59.59,
    imageURL: "product imageURL",
    quantity: 1,
  },
  {
    _id: "",
    productId: 2,
    name: "product name",
    price: 109.59,
    imageURL: "product imageURL",
    quantity: 1,
  },
];

describe("shopping cart tests", () => {

  
  test("functions of shopping cart does not apply for user not log in",async () => {
    const amount = await getTotalCartAmount();
    const emptyCart = await getCart();
    const item=await getTotalCartItems();
    const adding=await addToCart();
    const reducing=await removeFromCart();
    expect(amount).toEqual(0);
    expect(emptyCart).toEqual([]);
    expect(item).toEqual(0);
    expect(adding).toBeFalsy();
    expect(reducing).toBeFalsy();
  
  });
})

  it("should return the mock data of shopping cart for a user",async() => {
    const cartInfo =  await getCart(userInfo.username);
    const products=  await getCartInfo(userInfo.username);
    expect(cartInfo).toEqual(userInfo.shoppingCart);
    expect(products).toEqual(cartProducts);

  });


  it("should calculate the total amount and total items in shopping cart", async() => {
    const amount = await getTotalCartAmount(0,userInfo.username);
    const items= await getTotalCartItems(userInfo.username);
    expect(amount).toBe(169.18);
    expect(items).toBe(2);
  });



it("should +1 the total amount and total items after adding a item shopping cart case 1",async()=>{
   
    const amount = await getTotalCartAmount(1,userInfo.username);
    const items=await getTotalCartItems(userInfo.username);
    expect(amount).toBe(228.77);
    expect(items).toBe(3);
  })


it("should +1 the total amount and total items after adding a item to the shopping cart case 2",async()=>{
 
    const amount =await getTotalCartAmount(3,userInfo.username);
    const items=await getTotalCartItems(userInfo.username);
    expect(amount).toBe(269.17);
    expect(items).toBe(3);
 })

it("should -1 the total amount and total items after deleting a item from the shopping cart", async() => {
    
    const amount = await getTotalCartAmount(-1,userInfo.username);
    const items=await getTotalCartItems(userInfo.username);
    expect(amount).toBe(109.59);
    expect(items).toBe(1);

})