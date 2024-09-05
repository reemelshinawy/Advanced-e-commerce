import React, { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';
import ProductItem from './ProductItem';
import './Product.css'

const ProductList = () => {
    const { products } = useContext(ProductContext);

    return (
        <div className='products-list main-sec'>
            {products.map(product => (
                <ProductItem key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;
