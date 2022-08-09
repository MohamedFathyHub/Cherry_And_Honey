import React from 'react'
import Link from 'next/link'

import { urlFor } from '../lib/client'

const HeroBanner = ({ heroBanner }) => {
  return (
    <div className='hero-banner-container'>
      <div>
        <p className="beats-solo">{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <img src={urlFor(heroBanner.image)} alt="food" className="hero-banner-image"/>
      </div>
      <div>
        <Link href={`/product/${heroBanner.product}`}>
          <button type="button" className='btn2'>{heroBanner.buttonText}</button>
        </Link>
        <div className="desc">
          {/* <h5>{heroBanner.desc}</h5> */}
          <p></p>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner