import React, { useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import { useContext } from 'react'

const Navbar = () => {

    const[menu,setMenu] = useState("shop");
    const {getTotalCartItems} = useContext(ShopContext)
  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src={logo} alt='' />
        <p>SHOPPER</p>
      </div>
        <ul className='nav-menu'>
            <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration: 'none' }} to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("boys")}}><Link style={{textDecoration: 'none' }} to="/boys">Boys</Link> {menu==="boys"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("girls")}}><Link style={{textDecoration: 'none' }} to="/girls">Girls</Link> {menu==="girls"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("shose")}}><Link style={{textDecoration: 'none' }} to="/shose">Shose</Link>{menu==="shose"?<hr/>:<></>}</li>
        </ul>
        <div className="nav-login-cart">
            <Link to='/login'><button>Login</button></Link>
            <Link to='/cart'><img src={cart_icon} alt='' /></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
      
    </div>
  )
}

export default Navbar
