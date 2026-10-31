import React, { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


export default function Cart({ cartItems, setCartItms }) {
    function increaseQty(item) {
        if (Number(item.products.stock) === Number(item.qty)) {
            return;
        }
        const updatedItems = cartItems.map((i) => {
            if (i.products._id === item.products._id) {
                return { ...i, qty: i.qty + 1 };
            }
            return i;
        });
        setCartItms(updatedItems);
    }

    function decreaseQty(item) {
        if (item.qty > 1) {
            const updatedItems = cartItems.map((i) => {
                if (i.products._id === item.products._id) {
                    return { ...i, qty: i.qty - 1 };
                }
                return i;
            });
            setCartItms(updatedItems);
        }
    }

    function removeItem(item) {
        const updatedItems = cartItems.filter((i) => i.products._id !== item.products._id);
        setCartItms(updatedItems);
    }

    const navigate = useNavigate();

    function placeorder() {
        if (!localStorage.getItem('userEmail')) {
            toast.error('Please login to place your order');
            navigate('/login');
            return;
        }
        navigate('/payment');
    }

    return cartItems.length > 0 ? (
        <Fragment>
            <div className="container container-fluid" >
                <h2 className="mt-5">Your Cart: <b>{cartItems.length}</b></h2>
                <div className="row d-flex justify-content-between">
                    <div className="col-12 col-lg-8">
                        {cartItems.map((item) => (
                            <Fragment key={item.products._id}>
                                <hr />
                                <div className="cart-item">
                                    <div className="row">
                                        <div className="col-4 col-lg-3">
                                            <img src={item?.products?.images?.[0]?.image || '/images/products/tamil vaippadu.jpg'} alt={item?.products?.name || 'Product'} height="90" width="115" />
                                        </div>

                                        <div className="col-5 col-lg-3">
                                            <Link to={"/product/" + item.products._id}>{item.products.name}</Link>
                                        </div>

                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p id="card_item_price">₹{item.products.price}</p>
                                        </div>

                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                            <div className="stockCounter d-inline">
                                                <span className="btn btn-danger minus" onClick={() => decreaseQty(item)}>-</span>
                                                <input type="number" className="form-control count d-inline" value={item.qty} readOnly />
                                                <span className="btn btn-primary plus" onClick={() => increaseQty(item)}>+</span>
                                            </div>
                                        </div>

                                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                            <i id="delete_cart_item" onClick={() => removeItem(item)} className="fa fa-trash btn btn-danger"></i>
                                        </div>

                                    </div>
                                </div>
                            </Fragment>
                        ))}
                    </div>

                    <div className="col-12 col-lg-3 my-4">
                        <div id="order_summary">
                            <h4>Order Summary</h4>
                            <hr />
                            <p>Subtotal:  <span className="order-summary-values">{cartItems.reduce((acc, item) => (acc + item.qty), 0)} (Units)</span></p>
                            <p>Est. total: <span className="order-summary-values">₹{cartItems.reduce((acc, item) => (acc + item.products.price * item.qty), 0).toFixed(2)}</span></p>

                            <hr />
                            <button id="checkout_btn" onClick={placeorder} className="btn btn-primary btn-block">Place Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    ) : (
        <h2 className='mt-5'>Your Cart is Empty! </h2>
    );
}
