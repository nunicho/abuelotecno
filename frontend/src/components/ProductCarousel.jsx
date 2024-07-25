import React from 'react'
import {Link} from 'react-router-dom'
import Carousel from  'react-bootstrap/Carousel'
import Image from "react-bootstrap/Image";
import Loader from './Loader'
import Message from './Message'
import { useGetTopProductsQuery } from '../slices/productsApiSlice'
import "../assets/styles/productCarousel.css";


const randomImages = [
  "../abuelo/1.png",
   "../abuelo/2.png",
   "../abuelo/3.png",
   "../abuelo/4.png",
   "../abuelo/5.png",
   "../abuelo/6.png",
   "../abuelo/7.png",
   "../abuelo/8.png",
   "../abuelo/9.png",
  "../abuelo/10.png",
  "../abuelo/11.png",
  "../abuelo/12.png",
  "../abuelo/13.png",
];

const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * randomImages.length);
  return randomImages[randomIndex];
};


const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-primary mb-4">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <div className="carousel-images-container">
              <Image
                src={product.image}
                alt={product.name}
                fluid
                className="carousel-main-image"
              />
              <Image
                src={getRandomImage()}
                alt="Random"
                fluid
                className="carousel-additional-image"
              />
            </div>
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
/*
import React from 'react'
import {Link} from 'react-router-dom'
import Carousel from  'react-bootstrap/Carousel'
import Image from "react-bootstrap/Image";
import Loader from './Loader'
import Message from './Message'
import { useGetTopProductsQuery } from '../slices/productsApiSlice'
import "../assets/styles/productCarousel.css";


const ProductCarousel = () => {
    const {data: products, isLoading, error} = useGetTopProductsQuery()


  return isLoading ? <Loader /> : error ?  <Message variant='danger'>{error}</Message>
  : (
    <Carousel pause='hover' className='bg-primary mb-4'>
        {products.map(product =>(
            <Carousel.Item key={product._id}>
                <Link to={`/product/${product._id}`}>
                    <Image src={product.image} alt={product.name} fluid />
                    <Carousel.Caption className='carousel-caption'>
                        <h2>{product.name} (${product.price})</h2>
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
        ))}
    </Carousel>
  )
}

export default ProductCarousel
*/