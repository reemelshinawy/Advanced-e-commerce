import React, { useState, useContext, useEffect } from 'react';
import { ProductContext } from '../../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Dashboard.css'

const Dashboard = () => {
    const navigate = useNavigate();
    const { products, addProduct, deleteProduct, editProduct } = useContext(ProductContext);
    const [product, setProduct] = useState({
        name: '',
        price: '',
        thumbnail: '',
        brand: '',
        description: '',
        discountPercentage: '',
        rating: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        if (isEditing && editId !== null) {
            const productToEdit = products.find(prod => prod.id === editId);
            if (productToEdit) {
                setProduct({
                    title: productToEdit.title || '',
                    price: productToEdit.price || '',
                    thumbnail: productToEdit.thumbnail || '',
                    brand: productToEdit.brand || '',
                    description: productToEdit.description || '',
                    discountPercentage: productToEdit.discountPercentage || '',
                    rating: productToEdit.rating || ''
                });
            }
        }
    }, [isEditing, editId, products]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            editProduct({ ...product, id: editId });
            setIsEditing(false);
            setEditId(null);
        } else {
            addProduct(product);
        }
        setProduct({
            title: '',
            price: '',
            thumbnail: '',
            brand: '',
            description: '',
            discountPercentage: '',
            rating: ''
        });
        navigate('/');
    };

    const handleEdit = (product) => {
        setIsEditing(true);
        setEditId(product.id);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditId(null);
        setProduct({
            title: '',
            price: '',
            thumbnail: '',
            brand: '',
            description: '',
            discountPercentage: '',
            rating: ''
        });
    };

    return (
        <div>
            <h1 className='page-title'>Dashboard</h1>
            <form onSubmit={handleSubmit} className='main-sec dashboard-form'>
                <input
                    type="text"
                    name="title"
                    value={product.title || ''}
                    onChange={handleChange}
                    placeholder="Product title"
                    required={!isEditing}
                />
                <input
                    type="number"
                    name="price"
                    value={product.price || ''}
                    onChange={handleChange}
                    placeholder="Price"
                    required={!isEditing}
                />
                <input
                    type="text"
                    name="thumbnail"
                    value={product.thumbnail || ''}
                    onChange={handleChange}
                    placeholder="Image URL"
                    required={!isEditing}
                />
                <input
                    type="text"
                    name="brand"
                    value={product.brand || ''}
                    onChange={handleChange}
                    placeholder="Brand Name"
                    required={!isEditing}
                />
                <input
                    name="description"
                    value={product.description || ''}
                    onChange={handleChange}
                    placeholder="Description"
                    required={!isEditing}
                />
                <input
                    type="number"
                    name="discountPercentage"
                    value={product.discountPercentage || ''}
                    onChange={handleChange}
                    placeholder="discountPercentage (optional, max 100)"
                    max="100"
                />
                <input
                    type="number"
                    name="rating"
                    value={product.rating || ''}
                    onChange={handleChange}
                    placeholder="rating (optional, max 5)"
                    max="5"
                />
                <button type="submit">{isEditing ? 'Update Product' : 'Add Product'}</button>
                {isEditing && <button type="button" onClick={handleCancelEdit}>Cancel Edit</button>}
            </form>

            <div className='product-list'>
                <h2 className='page-title'>Products List</h2>
                <ul className='dash-prods'>
                    {products.map(product => (
                        <li key={product.id} className='product-item'>
                            <img src={product.thumbnail} alt={product.title} width="100" />
                            <div>
                                <h3>{product.title}</h3>
                                <p>Price: ${product.price}</p>
                                <p>Brand: {product.brand}</p>
                                <p>discount: {product.discountPercentage}%</p>
                                <p>Rate: {product.rating}/5</p>
                            </div>
                            <div className='dash-prod-btns'>
                                <button className='del' onClick={() => deleteProduct(product.id)}><FontAwesomeIcon icon="fa-solid fa-trash" /></button>
                                <button className='edi' onClick={() => handleEdit(product)}><FontAwesomeIcon icon="fa-solid fa-pen-to-square" /></button>
                            </div>
                        </li>)
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
