import React from 'react';
import { Product , FooterBanner , HeroBanner } from '../components';
import { client } from '../lib/client';

const Home = ({products , bannerData}) => {
  return (
    <div>
      <HeroBanner heroBanner = { bannerData.length && bannerData[0]}/>
      <div className="products-heading">
        <h2>The Best Food</h2>
        <p>all food you can find here</p>
      </div>

      <div className="products-container">
        {products?.map((product)=> <Product product={product} key={product._id}/>)}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]}/>
    </div>
  )
}

// (getServerSideProps) the HTML is generated upon request
export const getServerSideProps = async () => { 
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products , bannerData }
  }
}

export default Home ;