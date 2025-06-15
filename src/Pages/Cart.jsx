import React, { useContext } from "react";
import Userdata from "../context/Userdata";
import { IoArrowUndoOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Cart = () => {
  const store = useContext(Userdata);
  let products = store.database;
  // console.log(products);
  
  const subtotal = products.reduce(
    (sum, product) => sum + product.price * 12,
    0
  );
  const tax = subtotal * 0.1; 
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gray-50 py-12 mt-10">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items - Left Side */}
          <div className="lg:w-2/3">
            <div className="hidden sm:grid grid-cols-12 gap-4 bg-white p-4 rounded-t-lg shadow-sm border-b">
              <div className="col-span-5 font-medium text-gray-500">
                PRODUCT
              </div>
              <div className="col-span-2 font-medium text-gray-500">PRICE</div>
              <div className="col-span-3 font-medium text-gray-500">
                QUANTITY
              </div>
              <div className="col-span-2 font-medium text-gray-500 text-right">
                TOTAL
              </div>
            </div>

            {/* Cart Items List */}
            <div className="bg-white rounded-lg shadow-md divide-y">
              {products.map((product, i) => (
                <div key={i} className="p-4">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-12 sm:col-span-5 flex items-center">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-800">
                          {product.title}
                        </h3>
                        <p className="text-sm text-gray-500">Category</p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-4 sm:col-span-2 text-gray-700">
                      ${product.price.toFixed(2)}
                    </div>

                    {/* Quantity Selector */}
                    <div className="col-span-4 sm:col-span-3">
                      <div className="flex items-center border rounded-md w-fit">
                        <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">
                          -
                        </button>
                        <span className="px-4 py-1 border-x">1</span>
                        <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">
                          +
                        </button>
                      </div>
                    </div>

                    {/* Total & Remove */}
                    <div className="col-span-4 sm:col-span-2 flex items-center justify-end space-x-4">
                      <span className="font-medium text-gray-800">
                        ${(product.price * 12).toFixed(2)}
                      </span>
                      <button className="text-red-500 hover:text-red-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-4 flex justify-between items-center">
                <Link
                  to={"/"}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <IoArrowUndoOutline />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>

          {/*  Right Side */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Order Summary
              </h2>
              <div className=" bg-amber-100 px-4 py-3 rounded-lg mb-6 flex items-center ">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="flex-1 px-4 py-1 text-md border border-amber-300 rounded-ss-lg rounded-es-lg  focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button className="text-lg bg-green-600 hover:bg-green-700 rounded-se-lg rounded-ee-lg text-white px-6 py-1 font-medium transition-colors duration-200">
                  Apply
                </button>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold text-lg text-gray-800">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Link to={"/buy"} state={products} className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition duration-200">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
