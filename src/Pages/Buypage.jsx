import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Buypage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item || location.state; // Handle both cases

  // Handle case when no item is passed
  if (!item) {
    return (
      <div className="max-w-2xl mt-15 mx-auto bg-white p-8 rounded-2xl shadow-md text-center">
        <h2 className="text-3xl font-bold mb-6">No Item Selected</h2>
        <p className="mb-4">Please go back and select an item to purchase.</p>
        <button 
          onClick={() => navigate(-1)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  const quantity = item.quantity || 1; // Default to 1 if quantity not specified
  const total = (item.price * quantity).toFixed(2);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle form submission to your backend
    // For now, we'll just log and navigate to a confirmation page
    const formData = new FormData(e.target);
    const orderData = {
      ...Object.fromEntries(formData),
      item,
      total
    };
    
    console.log('Order data:', orderData);
    navigate('/confirmation', { state: { order: orderData } });
  };

  return (
    <div className="max-w-2xl mt-15 mx-auto bg-white p-8 rounded-2xl shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Order & Payment Information</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Order Summary */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
          <ul className="border rounded-lg p-4 space-y-2">
            <li className="flex justify-between">
              <span>{item.title} (x{quantity})</span>
              <span>${(item.price * quantity).toFixed(2)}</span>
            </li>
            <li className="flex justify-between font-semibold border-t pt-2 mt-2">
              <span>Total</span>
              <span>${total}</span>
            </li>
          </ul>
        </div>

        {/* Shipping Info */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Shipping Information</h3>
          <input 
            type="text" 
            name="fullName"
            placeholder="Full Name" 
            className="w-full p-2 border rounded-lg mb-2" 
            required 
          />
          <input 
            type="email" 
            name="email"
            placeholder="Email Address" 
            className="w-full p-2 border rounded-lg mb-2" 
            required 
          />
          <textarea 
            name="address"
            placeholder="Shipping Address" 
            rows="3" 
            className="w-full p-2 border rounded-lg" 
            required
          ></textarea>
        </div>

        {/* Payment Method */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Payment Method</h3>
          <select 
            name="paymentMethod"
            className="w-full p-2 border rounded-lg"
            defaultValue="credit"
            required
          >
            <option value="credit">Credit Card</option>
            <option value="debit">Debit Card</option>
            <option value="upi">UPI</option>
            <option value="netbanking">Net Banking</option>
            <option value="wallet">Wallet</option>
          </select>
        </div>

        {/* Card Details */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Cardholder Name</label>
            <input 
              type="text" 
              name="cardName"
              className="w-full p-2 border rounded-lg" 
              placeholder="John Doe" 
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Card Number</label>
            <input 
              type="text" 
              name="cardNumber"
              maxLength="16" 
              className="w-full p-2 border rounded-lg" 
              placeholder="1234 5678 9012 3456" 
              required
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block mb-1 font-medium">Expiry Month</label>
              <input 
                type="text" 
                name="expiryMonth"
                maxLength="2" 
                className="w-full p-2 border rounded-lg" 
                placeholder="MM" 
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-1 font-medium">Expiry Year</label>
              <input 
                type="text" 
                name="expiryYear"
                maxLength="4" 
                className="w-full p-2 border rounded-lg" 
                placeholder="YYYY" 
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">CVV</label>
            <input 
              type="password" 
              name="cvv"
              maxLength="3" 
              className="w-full p-2 border rounded-lg" 
              placeholder="123" 
              required
            />
          </div>
        </div>

        <div>
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Place Order & Pay
          </button>
        </div>
      </form>
    </div>
  );
};

export default Buypage;