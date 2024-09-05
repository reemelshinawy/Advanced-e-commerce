import React, { createContext, useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const { data, loading, error } = useFetch('https://dummyjson.com/products');

    useEffect(() => {
        if (data && data.products) {
            setProducts(data.products);
        }
    }, [data]);

    const addProduct = (product) => {
        setProducts([...products, { ...product, id: products.length + 1 }]);
    };

    const deleteProduct = (productId) => {
        setProducts(products.filter(product => product.id !== productId));
    };

    const editProduct = (updatedProduct) => {
        setProducts(
            products.map(product =>
                product.id === updatedProduct.id ? updatedProduct : product
            )
        );
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, deleteProduct, editProduct, loading, error }}>
            {children}
        </ProductContext.Provider>
    );
};
