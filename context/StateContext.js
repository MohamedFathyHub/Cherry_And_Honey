import React , { createContext , useContext , useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';


const Context = createContext();

export const StateContext = ({ children }) => {
    const [ showCart , setShowCart ] = useState(false);
    const [ cartItems, setCartItems ] = useState([]);
    const [ totalPrice , setTotalPrice ] = useState(0)
    const [ totalQuantity , setTotalQuantity ] = useState(0) // Quantity for the total items
    const [ qty , setQty ] = useState(1)  // Quantity for the individual items

    let foundProduct;
    let index;
    
    const onAdd = (product , quantity) => {
        const checkProductInCart = cartItems.find(( item ) => item._id === product._id);

        setTotalPrice( (prevTotalPrice) => prevTotalPrice + product.price * quantity)
        setTotalQuantity( (prevTotalQuantity) => prevTotalQuantity + quantity)

        if ( checkProductInCart ) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })
            setCartItems(updatedCartItems);

        } else {
            product.quantity = quantity;
            setCartItems([...cartItems , { ... product }])
        }

        toast.success(`${qty} ${product.name} Added to the cart.`);  
    }

    const onRemove = (product) => {
        setCartItems( prevCartItems => prevCartItems.filter(item => item._id !== product._id))
        setTotalPrice( prevTotalPrice => prevTotalPrice - product.price * product.quantity)
        setTotalQuantity( prevTotalQuantity => prevTotalQuantity -  product.quantity)
    }

    const toggleCartItemQuantity = (id , value) => {
        foundProduct = cartItems.find((item) => item._id === id)
        index = cartItems.findIndex((item) => item._id === id)
        
        if(value === 'inc'){
            setCartItems( prevCartItems => 
                prevCartItems.map( item => {          
                    if (item._id === id){
                        return {...item, quantity: foundProduct.quantity + 1}
                    }
                    return item
                })
            );
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
            setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + 1)
        } else if (value === 'dec'){
            if(foundProduct.quantity > 1){
                setCartItems( prevCartItems => 
                    prevCartItems.map( item => {          
                        if (item._id === id){
                            return {...item, quantity: foundProduct.quantity - 1}
                        }
                        return item
                    })
                );
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
                setTotalQuantity((prevTotalQuantity) => prevTotalQuantity - 1)
            }
        }
    }

    const incQty = () => {
        setQty(( prevQty ) => prevQty + 1)
    }

    const decQty = () => {
        setQty(( prevQty ) => {
            if( prevQty - 1 < 1 ) return 1;
            return prevQty - 1
        })
    }
    
    return (
        <Context.Provider value={{showCart,setShowCart, cartItems,setCartItems , totalPrice,setTotalPrice, totalQuantity,setTotalQuantity , qty,incQty,decQty , onAdd , toggleCartItemQuantity , onRemove}}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext( Context )