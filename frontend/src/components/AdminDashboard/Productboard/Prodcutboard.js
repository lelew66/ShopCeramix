import React, {useState, useMemo} from 'react'
import { useAuthContext } from '../../../hooks/useAuthContext';
import './Productboard.css';
import { IoMdArrowDropdown } from "react-icons/io";

const Productboard = ({data}) => {

    
    const {user} = useAuthContext();
  
    let products = [...data];

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [showUpdateProductForm, setShowUpdateAddProductForm] = useState(false);
  const [showDeleteProductForm, setShowDeleteAddProductForm] = useState(false);
  const [showSearchProductForm, setShowSearchProductForm] = useState(false);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [quantity, setQuantity] = useState('');
  const [allProducts, setAllProducts] = useState(products);

  const [findError, setFindError] = useState('');


    const sortedData = useMemo(() => {
        
        if (sortConfig !== null) {
            allProducts.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return allProducts;
    }, [allProducts, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const toggleAddProductForm = () => {
        setShowAddProductForm(!showAddProductForm);
    };

    const toggleUpdateProductForm= () => {
        setShowUpdateAddProductForm(!showUpdateProductForm);
    };

    const toogleDeleteProductForm = () => {
        setShowDeleteAddProductForm(!showDeleteProductForm);
    };

    const toggleSearchProductForm = () => {
        setShowSearchProductForm(!showSearchProductForm);
    };

    const handleAddSubmit = async(e) => {
        e.preventDefault();
       
        const productData = {
          category,
          id: productId,
          name: productName,
          price: productPrice,
          quantity,
          description,
          imageURL,
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/products`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
              },
              body: JSON.stringify(productData),
            });

            if(!response.ok){
                throw new Error('Something went wrong');
            }

            const addedProduct = await response.json();
            setAllProducts(products =>[...products, addedProduct]);

            setCategory('');
            setProductId('');
            setProductName('');
            setProductPrice('');
            setDescription('');
            setImageURL('');
            setQuantity('');
        }  catch (error) {
            console.error('Error adding product:', error);
          }
    
    };

    const handleFindProduct = async(e) => {
        e.preventDefault();
        setFindError('');
        try {
            // const response = await fetch(`/products?id=${productId}&t=${new Date().getTime()}`
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/products/byId?id=${productId}`, {
              
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
              },
            });
          
            if(!response.ok){
                if(response.status === 404){
                    setFindError('Product not found');
                
                }else{
                    setFindError('An error occurred while fetching the product.');
                }
               return;
            }
            const foundProduct = await response.json();
            console.log(foundProduct);
            if(foundProduct){
                setCategory(foundProduct.category);
                setProductName(foundProduct.name);
                setProductPrice(foundProduct.price);
                setDescription(foundProduct.description);
                setImageURL(foundProduct.imageURL);
                setQuantity(foundProduct.quantity);
            }
      
           
 
        }  catch (error) {
            console.error('Error finding product:', error);
            setFindError('An error occurred while finding the product.');
          }
    };

    const handleUpdateSubmit = async(e) => {
        e.preventDefault();
       
        const productData = {//remove the id from reqest body since its in the url
          category,
        //   id: productId,
          name: productName,
          price: productPrice,
          quantity,
          description,
          imageURL,
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/products/${productId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
              },
              body: JSON.stringify(productData),
            });
            if(!response.ok){
                throw new Error('Something went wrong');
            }
            const updatedProduct = await response.json();
            // setAllProducts(products =>[...products, addedProduct]);
            setAllProducts(allProducts => allProducts.map(product => product.id === productId ? updatedProduct: product));
            setCategory('');
            setProductId('');
            setProductName('');
            setProductPrice('');
            setDescription('');
            setImageURL('');
            setQuantity('');
 
        }  catch (error) {
            console.error('Error adding product:', error);
          }

    };

    const handleDeleteSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/products/${productId}`, {
                method: 'DELETE',
                headers:{
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            });
            if(!response.ok){
                throw new Error('Something went wrong');
            }

            setAllProducts(allProducts => allProducts.filter(product => {
                // console.log(product.id);
                return product.id !== productId;
            }
            ));
            setCategory('');
            setProductId('');
            setProductName('');
            setProductPrice('');
            setDescription('');
            setImageURL('');
            setQuantity('');

        }catch(error){
            console.log(error);
        }
    };

    const handleClearForm = () =>{
        setCategory('');
        setProductId('');
        setProductName('');
        setProductPrice('');
        setDescription('');
        setImageURL('');
        setQuantity('');
    }

  return (
    <div className="orders-container">
        <div className="control-panel">
           <button onClick={toggleAddProductForm}>Add Product</button>
           <button onClick={toggleUpdateProductForm}>Update Product</button>
           <button onClick={toogleDeleteProductForm}>Delete Product</button>
           <button onClick={toggleSearchProductForm}>Search Product</button>

        </div>
          {findError && <p style={{color:'var(--error)', margin:'0 auto'}}>{findError}</p>}
  
        {
            showAddProductForm && (
                <form className="adminForm" onSubmit={handleAddSubmit}>
                  
                    <input 
                        className='input'
                        type="number" 
                        value={productId} 
                        onChange={(e) => setProductId(e.target.value)} 
                        placeholder="Add Product Number"
                    />
                    <input 
                        className='input'
                        type="text" 
                        value={productName} 
                        onChange={(e) => setProductName(e.target.value)} 
                        placeholder="Add Product Name"
                    />
                   
                    <input 
                        className="input wide-input"
                        type="text" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        placeholder="Add Description"
                    />

                    <input 
                        className='input'
                        type="number" 
                        value={productPrice} 
                        onChange={(e) => setProductPrice(e.target.value)} 
                        placeholder="Add Product Price"
                    />
                     <input 
                        className='input'
                        type="number" 
                        value={quantity} 
                        onChange={(e) => setQuantity(e.target.value)} 
                        placeholder="Add Quantity"
                    />
                     <input 
                        className="input wide-input"
                        type="text" 
                        value={imageURL} 
                        onChange={(e) => setImageURL(e.target.value)} 
                        placeholder="Add ImageURL"
                    />
                    <select  className='input' style={{height: '28px', background:"none", color:'var(--light-grey)'}} value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Select a Category</option>
                        <option value="Decor">Decor</option>
                        <option value="Drink">Drink</option>
                        <option value="Tableware">Tableware</option>
                     </select>
                    
                    <button className="btn"type="submit" style={{marginLeft:'3px'}} >Submit</button>
        </form>
        
            )
        }
            
        { showUpdateProductForm && (
            <form className="adminForm" onSubmit={handleUpdateSubmit}>
                  
                  <input 
                      className='input'
                      type="number" 
                      value={productId} 
                      onChange={(e) => setProductId(e.target.value)} 
                      placeholder="Enter product number"
                  />
                  <input 
                      className='input'
                      type="text" 
                      value={productName} 
                      onChange={(e) => setProductName(e.target.value)} 
                      placeholder="Product Name"
                  />
                 
                  <input 
                      className="input wide-input"
                      type="text" 
                      value={description} 
                      onChange={(e) => setDescription(e.target.value)} 
                      placeholder="Description"
                  />

                  <input 
                      className='input'
                      type="number" 
                      value={productPrice} 
                      onChange={(e) => setProductPrice(e.target.value)} 
                      placeholder="Product Price"
                  />
                   <input 
                      className='input'
                      type="number" 
                      value={quantity} 
                      onChange={(e) => setQuantity(e.target.value)} 
                      placeholder="Quantity"
                  />
                   <input 
                      className="input wide-input"
                      type="text" 
                      value={imageURL} 
                      onChange={(e) => setImageURL(e.target.value)} 
                      placeholder="ImageURL"
                  />
                  <select  className='input' style={{height: '28px', background:"none", color:'var(--light-grey)'}} value={category} onChange={(e) => setCategory(e.target.value)}>
                      <option value="">Select a Category</option>
                      <option value="Decor">Decor</option>
                      <option value="Drink">Drink</option>
                      <option value="Tableware">Tableware</option>
                   </select>
                  <button className="btn" onClick={handleFindProduct} type="button" style={{marginLeft:'3px'}} >Find</button>
                  <button className="btn" type="submit" style={{marginLeft:'3px'}} >Update</button>
      </form>
        )}

        { showDeleteProductForm && (
            <form className="adminForm" onSubmit={handleDeleteSubmit}>
                  
                  <input 
                      className='input'
                      type="number" 
                      value={productId} 
                      onChange={(e) => setProductId(e.target.value)} 
                      placeholder="Enter product number"
                  />
                  <input 
                      className='input'
                      type="text" 
                      value={productName} 
                      onChange={(e) => setProductName(e.target.value)} 
                      placeholder="Product Name"
                  />
                 
                  <input 
                      className="input wide-input"
                      type="text" 
                      value={description} 
                      onChange={(e) => setDescription(e.target.value)} 
                      placeholder="Description"
                  />

                  <input 
                      className='input'
                      type="number" 
                      value={productPrice} 
                      onChange={(e) => setProductPrice(e.target.value)} 
                      placeholder="Product Price"
                  />
                   <input 
                      className='input'
                      type="number" 
                      value={quantity} 
                      onChange={(e) => setQuantity(e.target.value)} 
                      placeholder="Quantity"
                  />
                   <input 
                      className="input wide-input"
                      type="text" 
                      value={imageURL} 
                      onChange={(e) => setImageURL(e.target.value)} 
                      placeholder="ImageURL"
                  />
                  <select  className='input' style={{height: '28px', background:"none", color:'var(--light-grey)'}} value={category} onChange={(e) => setCategory(e.target.value)}>
                      <option value="">Select a Category</option>
                      <option value="Decor">Decor</option>
                      <option value="Drink">Drink</option>
                      <option value="Tableware">Tableware</option>
                   </select>
                  <button className="btn" onClick={handleFindProduct} type="button" style={{marginLeft:'3px'}} >Find</button>
                  <button className="btn" type="submit" style={{marginLeft:'3px'}} >Delete</button>
            </form>
        )}
        
        { showSearchProductForm && (
            <form className="adminForm">
                  
                  <input 
                      className='input'
                      type="number" 
                      value={productId} 
                      onChange={(e) => setProductId(e.target.value)} 
                      placeholder="Enter product number"
                  />
                  <input 
                      className='input'
                      type="text" 
                      value={productName} 
                      onChange={(e) => setProductName(e.target.value)} 
                      placeholder="Product Name"
                  />
                 
                  <input 
                      className="input wide-input"
                      type="text" 
                      value={description} 
                      onChange={(e) => setDescription(e.target.value)} 
                      placeholder="Description"
                  />

                  <input 
                      className='input'
                      type="number" 
                      value={productPrice} 
                      onChange={(e) => setProductPrice(e.target.value)} 
                      placeholder="Product Price"
                  />
                   <input 
                      className='input'
                      type="number" 
                      value={quantity} 
                      onChange={(e) => setQuantity(e.target.value)} 
                      placeholder="Quantity"
                  />
                   <input 
                      className="input wide-input"
                      type="text" 
                      value={imageURL} 
                      onChange={(e) => setImageURL(e.target.value)} 
                      placeholder="ImageURL"
                  />
                  <select  className='input' style={{height: '28px', background:"none", color:'var(--light-grey)'}} value={category} onChange={(e) => setCategory(e.target.value)}>
                      <option value="">Select a Category</option>
                      <option value="Decor">Decor</option>
                      <option value="Drink">Drink</option>
                      <option value="Tableware">Tableware</option>
                   </select>
                  <button className="btn" onClick={handleFindProduct} type="button" style={{marginLeft:'3px'}} >Find</button>
                  <button className="btn" onClick={handleClearForm} type="button" style={{marginLeft:'3px'}} >Clear</button>
                 
            </form>
        )}
        <table>
            <thead>
                <tr>
                    <th onClick={() => requestSort('category')}>Category<span><IoMdArrowDropdown /></span></th>
                    <th onClick={() => requestSort('productNo')}>Product No<span><IoMdArrowDropdown /></span></th>
                    <th onClick={() => requestSort('name')}>Name<span><IoMdArrowDropdown /></span></th>
                    <th onClick={() => requestSort('price')}>Price<span><IoMdArrowDropdown /></span></th>
                    <th onClick={() => requestSort('quantity')}>Qty<span><IoMdArrowDropdown /></span></th>
                </tr>
            </thead>
            <tbody>
                {allProducts.map((product) => (
                    <tr key={product._id}>
                        <td>{product.category}</td>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.quantity}</td>
                        
                    </tr>
                ))}
            </tbody>
        </table>
  
    </div>
  )
}

export default Productboard
