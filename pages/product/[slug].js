import React, { useState } from 'react'
import { client , urlFor } from '../../lib/client'
import { AiOutlineMinusCircle , AiOutlinePlusCircle ,AiOutlineStar , AiFillStar } from "react-icons/ai";
import Product from '../../components/Product'
import { useStateContext } from '../../context/StateContext'


const ProductDetails = ( { product , products }) => {
  const { image , name , details , price , _id } = product
  const [index, setIndex] = useState(0)
  const { qty , incQty , decQty , onAdd , setShowCart} = useStateContext()

  const handleBuyNow = () => {
    onAdd(product , qty)
    setShowCart(true)
  }

  return (
    <div>
        <div className="product-detail-container">
          <div>
            <div>
                <img className='image-container' src={urlFor(image && image[index])} width='500' height='450'/>
            </div>
              <div className='small-images-container'>
              {image?.map( (item  , i) => (
                <img 
                  src={urlFor(item)}
                  key={i}
                  className={i === index ? 
                    'small-image selected-image' :
                    'small-image'}
                  onMouseEnter={() => setIndex(i)}
                  />
              ))}
              </div>
          </div>
          <div className='product-detail-desc'>
            <h1>{name}</h1>
            <div className="reviews">
              <div>
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
              </div>
              <p>(20)</p>
            </div>
            <h4>Details: </h4>
            <p>{details}</p>
            <p className="price">${price}</p>
            <div className="quantity">
              <h3>Quantity: </h3>
              <p className="quantity-desc">
                <span className="minus" onClick={decQty}><AiOutlineMinusCircle /></span>
                <span className="num">{qty}</span>
                <span className="plus" onClick={incQty}><AiOutlinePlusCircle /></span>
              </p>
            </div>
            <div className='buttons'>
              <button className='add-to-cart'type='button'onClick={() => onAdd(product , qty)}>ADD TO CART</button>
              <button className='buy-now'type='button' onClick={handleBuyNow}>BUY NOW</button>
            </div>
          </div>
        </div>
        <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            <div className='maylike-products-container track'>
              {products.filter(item => ( item._id !== _id )).map(product =>(
                 <Product key={product._id} product={product}/>
                 ))
            }
            </div>
          </div>
        </div>
    </div>
  )
}


export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
        slug {
            current
        }
    }`

    const products = await client.fetch(query);

    const paths = products.map((product) => ({
      params: {
        slug: product.slug.current
      }
    }));

    return {
      paths,
      fallback: 'blocking'
    }
}

// (getStaticProps) The HTML is generated once upon build
export const getStaticProps = async ({ params: { slug } }) => { 
    const query = `*[_type == "product" && slug.current == '${slug}' ][0]`;
    const productsQuery = '*[_type == "product"]'

    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);
  
    return {
      props: { product , products }
    }
  }

export default ProductDetails