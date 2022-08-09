import React from 'react'
import Link from 'next/link'
import { AiOutlineShoppingCart } from 'react-icons/ai'

import { Cart } from './'
import { useStateContext } from '../context/StateContext'

const Navbar = () => {
  const { showCart , setShowCart , totalQuantity } = useStateContext()
  return (
    <div>
      <Link href="/">
        <img 
        src="https://i.ibb.co/Lz563Wn/Cherry-Honey-logos-black.png" 
        alt="Cherry-Honey-logos-black" 
        className="cherry-logo"
        />
      </Link>

      <div className="navbar-container">
        <button type="button" className="cart-icon" onClick={()=> setShowCart(true)}>
          <AiOutlineShoppingCart />
          <span className="cart-item-qty">{totalQuantity}</span>
        </button>

      </div>
      { showCart && <Cart />}
    </div>
    
  )
}

export default Navbar