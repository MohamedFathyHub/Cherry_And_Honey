import React from 'react'
import { AiFillFacebook , AiFillInstagram , AiFillTwitterCircle } from "react-icons/ai";


const Footer = () => {
  return (
    <div className="footer-container">
      <p>2022 Cherry & Honey All rights reserved</p>
      <p className="icons">
        <AiFillFacebook />
        <AiFillInstagram />
        <AiFillTwitterCircle />
      </p>
    </div>
  )
}

export default Footer