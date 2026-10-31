import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import './productDetail.css';

export default function ProductDetail({ cartItems, setCartItms }) {
  const [products, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();

  const [showBuyNowFlow, setShowBuyNowFlow] = useState(false);
  const [mobileNo, setMobileNo] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';
    fetch(`${apiUrl}/product/${id}`)
      .then(res => res.json())
      .then(res => {
        setProduct(res.products);
      })
      .catch(err => console.error("FETCH ERROR 👉", err));
  }, [id]);

  function addToCard() {
    const itemExsist = cartItems.find((item) => item.products._id === products._id)
    if (!itemExsist) {
      const newItem = { products, qty };
      setCartItms((state) => [...state, newItem]);
      toast.success("Cart Item Added Successfully")
    }
  }

  function handleBuyNowClick() {
    setShowBuyNowFlow(true);
  }

  async function handleSendOtp() {
    if (mobileNo.length === 10) {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';
        const response = await fetch(`${apiUrl}/user/send-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mobileNo })
        });
        const data = await response.json();

        if (data.success) {
          toast.success(data.message || `OTP sent to ${mobileNo}`);
          setOtpSent(true);
        } else {
          toast.error(data.message || "Failed to send OTP");
        }
      } catch (error) {
        toast.error("An error occurred while sending OTP");
      }
    } else {
      toast.error("Please enter a valid 10-digit mobile number");
    }
  }

  async function handleVerifyOtp() {
    if (otp.length > 3) {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';
        const response = await fetch(`${apiUrl}/user/verify-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mobileNo, otp })
        });
        const data = await response.json();

        if (data.success) {
          toast.success("OTP verified successfully!");

          const itemExsist = cartItems.find((item) => item.products._id === products._id)
          if (!itemExsist) {
            const newItem = { products, qty };
            setCartItms((state) => [...state, newItem]);
          }
          navigate('/payment');
        } else {
          toast.error(data.message || "Invalid OTP. Please try again.");
        }
      } catch (error) {
        toast.error("An error occurred while verifying OTP");
      }
    } else {
      toast.error("Please enter the 4-digit OTP");
    }
  }

  function increaseQty() {
    if (products.stock === qty) {
      return;
    }
    setQty((state) => state + 1);
  }

  function decreaseQty() {
    if (qty > 1) {
      setQty((state) => state - 1);
    }
  }

  return products && (
    <div className="product-detail-container">
      <div className="container">
        <div className="row justify-content-around align-items-stretch">
          {/* Left Side: Product Image */}
          <div className="col-12 col-lg-5 mb-5 mb-lg-0 d-flex justify-content-center">
            <div className="product-image-wrapper w-100">
              <img
                src={products?.images?.[0]?.image || '/images/products/tamil vaippadu.jpg'}
                alt={products?.name || 'Product'}
                className="img-fluid"
              />
            </div>
          </div>

          {/* Right Side: Product Details */}
          <div className="col-12 col-lg-6">
            <div className="product-info-card">
              <h3>{products.name}</h3>

              <h4 id="product_price">₹{products.price}</h4>

              <div className="controls-wrapper">
                <span className="qty-btn" onClick={decreaseQty}>-</span>
                <input
                  type="number"
                  className="qty-input"
                  value={qty}
                  readOnly
                />
                <span className="qty-btn" onClick={increaseQty}>+</span>

                <button
                  type="button" onClick={addToCard} disabled={products.stock === 0}
                  className="cart-btn-premium"
                >
                  Add to Cart
                </button>

                <button
                  type="button" onClick={handleBuyNowClick} disabled={products.stock === 0 || showBuyNowFlow}
                  className="cart-btn-premium"
                  style={{ background: '#2c2c6c', boxShadow: '0 8px 20px rgba(44, 44, 108, 0.3)' }}
                >
                  Buy Now
                </button>
              </div>

              {showBuyNowFlow && (
                <div className="buy-now-flow mt-3 p-3" style={{ background: '#f9f9f9', borderRadius: '12px', border: '1px solid #eee' }}>
                  {!otpSent ? (
                    <>
                      <h5 style={{ color: '#2c2c6c', fontWeight: '600', marginBottom: '10px' }}>Enter Mobile Number</h5>
                      <input
                        type="tel"
                        placeholder="10-digit mobile number"
                        value={mobileNo}
                        onChange={(e) => setMobileNo(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className="form-control mb-3"
                        style={{ padding: '12px' }}
                      />
                      <button className="btn w-100" style={{ background: '#fca311', color: 'white', fontWeight: '600', padding: '12px' }} onClick={handleSendOtp}>Send OTP</button>
                    </>
                  ) : (
                    <>
                      <h5 style={{ color: '#2c2c6c', fontWeight: '600', marginBottom: '10px' }}>Enter OTP</h5>
                      <input
                        type="text"
                        placeholder="Enter 4-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        className="form-control mb-3"
                        style={{ padding: '12px', letterSpacing: '4px', textAlign: 'center', fontSize: '20px' }}
                      />
                      <button className="btn w-100" style={{ background: '#fca311', color: 'white', fontWeight: '600', padding: '12px' }} onClick={handleVerifyOtp}>Verify & Proceed</button>
                    </>
                  )}
                </div>
              )}

              <div className="divider" />

              <p className="status-text">
                Status: <span className={`font-weight-bold ${products.stock > 0 ? 'text-success' : 'text-danger'}`}>{products.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
              </p>

              <div className="divider" />

              <h5 className="desc-title">Description:</h5>
              <p className="desc-text">
                {products.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
