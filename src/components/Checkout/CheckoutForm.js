import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './CheckoutForm.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import axios from 'axios';
const CheckoutForm = () => {
    let location = useLocation();
    const [step, setStep] = useState(1);
    const navigate = useNavigate()
    const { clearCart } = useContext(CartContext)
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            postalCode: '',
            paymentName: '',
            cardNumber: '',
            cvv: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            phone: Yup.string().matches(/^\d{11}$/, 'Phone must be 10 digits').required('Phone is required'),
            address: Yup.string().required('Address is required'),
            city: Yup.string().required('City is required'),
            postalCode: Yup.string().matches(/^\d{5}$/, 'Postal Code must be 5 digits').required('Postal Code is required'),
            paymentName: step === 2 ? Yup.string().required('Name on card is required') : null,
            cardNumber: step === 2 ? Yup.string().matches(/^\d{16}$/, 'Card Number must be 16 digits').required('Card number is required') : null,
            cvv: step === 2 ? Yup.string().matches(/^\d{3}$/, 'CVV must be 3 digits').required('CVV is required') : null,
        }),
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: async (values) => {
            try {
                const response = await axios.post(
                    "http://localhost:5000/api/orderpost",
                    { userData: values, orderDetails: location.state }
                );
                if (response.status === 200) {
                    clearCart()
                    navigate('/products')
                } else {
                    console.log("Unexpected status code:", response.status);
                }
            } catch (error) {
                console.error("Error submitting form:", error);
            }
        }
    });

    const nextStep = async () => {
        const errors = await formik.validateForm();
        formik.setTouched({
            name: true,
            email: true,
            phone: true,
            address: true,
            city: true,
            postalCode: true,
            paymentName: true,
            cardNumber: true,
            cvv: true,
        });

        if (Object.keys(errors).length === 0) {
            setStep(step + 1);
        }
    };

    const previousStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            {step === 1 && (
                <div>
                    <div>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                        {formik.errors.name && formik.touched.name ? <div className="error-message">{formik.errors.name}</div> : null}
                    </div>
                    <div>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        {formik.errors.email && formik.touched.email ? <div className="error-message">{formik.errors.email}</div> : null}
                    </div>
                    <div>
                        <input
                            id="phone"
                            name="phone"
                            type="text"
                            placeholder="Phone"
                            onChange={formik.handleChange}
                            value={formik.values.phone}
                        />
                        {formik.errors.phone && formik.touched.phone ? <div className="error-message">{formik.errors.phone}</div> : null}
                    </div>
                    <div>
                        <input
                            id="address"
                            name="address"
                            type="text"
                            placeholder="Address"
                            onChange={formik.handleChange}
                            value={formik.values.address}
                        />
                        {formik.errors.address && formik.touched.address ? <div className="error-message">{formik.errors.address}</div> : null}
                    </div>
                    <div>
                        <input
                            id="city"
                            name="city"
                            type="text"
                            placeholder="City"
                            onChange={formik.handleChange}
                            value={formik.values.city}
                        />
                        {formik.errors.city && formik.touched.city ? <div className="error-message">{formik.errors.city}</div> : null}
                    </div>
                    <div>
                        <input
                            id="postalCode"
                            name="postalCode"
                            type="text"
                            placeholder="Postal Code"
                            onChange={formik.handleChange}
                            value={formik.values.postalCode}
                        />
                        {formik.errors.postalCode && formik.touched.postalCode ? <div className="error-message">{formik.errors.postalCode}</div> : null}
                    </div>
                    <button type="button" onClick={nextStep}>Next</button>
                </div>
            )}
            {step === 2 && (
                <div>
                    <div>
                        <input
                            id="paymentName"
                            name="paymentName"
                            type="text"
                            placeholder="Name on Card"
                            onChange={formik.handleChange}
                            value={formik.values.paymentName}
                        />
                        {formik.errors.paymentName && formik.touched.paymentName ? <div className="error-message">{formik.errors.paymentName}</div> : null}
                    </div>
                    <div>
                        <input
                            id="cardNumber"
                            name="cardNumber"
                            type="text"
                            placeholder="Card Number"
                            onChange={formik.handleChange}
                            value={formik.values.cardNumber}
                        />
                        {formik.errors.cardNumber && formik.touched.cardNumber ? <div className="error-message">{formik.errors.cardNumber}</div> : null}
                    </div>
                    <div>
                        <input
                            id="cvv"
                            name="cvv"
                            type="text"
                            placeholder="CVV"
                            onChange={formik.handleChange}
                            value={formik.values.cvv}
                        />
                        {formik.errors.cvv && formik.touched.cvv ? <div className="error-message">{formik.errors.cvv}</div> : null}
                    </div>
                    <button type="button" onClick={previousStep}>Previous</button>
                    <button type="submit">Submit</button>
                </div>
            )}
        </form>
    );
};

export default CheckoutForm;
