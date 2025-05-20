import React, { useContext } from "react";
import Viewdata from "../context/Viewdata";
import { IoMdStar, IoMdStarHalf } from "react-icons/io";
import Userdata from "../context/Userdata";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Viewdetail = () => {
  const data = useContext(Viewdata);
  const products = data.viewarr;

  const calculateDiscountPrice = (price, discountPercentage) => {
    const discountAmount = (price * discountPercentage) / 100;
    return (price - discountAmount).toFixed(2);
  };
  let store = useContext(Userdata);
  const handleadd = (obj, i) => {
      let copyarr = [...store.database, obj];
      store.setdatabase(copyarr);
      console.log(copyarr);
      toast(" item added successfully");
    };
  // console.log(store);
   

  return (
    <div className="min-h-screen mt-15 bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      {products.map((product,i) => (
        <div
          key={product.id}
          className="max-w-7xl mx-auto bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-4 flex flex-col md:flex-row items-center">
              <div className="w-full md:w-3/4 mb-4 md:mb-0 md:pr-4">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-auto object-contain rounded-lg max-h-96"
                />
              </div>
              <div className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-2">
                {product.images.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`${product.title}-${index}`}
                    className="w-16 h-16 md:w-20 md:h-20 object-cover rounded cursor-pointer hover:border-2 hover:border-amber-500"
                    onClick={() => console.log("Image clicked:", url)}
                  />
                ))}
              </div>
            </div>

            {/* Right Section: Product Details */}
            <div className="md:w-1/2 p-6">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900">
                {product.title}
              </h1>
              <div className="flex items-center mb-4 flex-wrap">
                <span className="text-xl sm:text-2xl font-semibold text-gray-900 mr-2">
                  $
                  {calculateDiscountPrice(
                    product.price,
                    product.discountPercentage
                  )}
                </span>
                <span className="text-lg text-gray-500 line-through mr-2">
                  ${product.price}
                </span>
                <span className="text-sm bg-amber-100 text-amber-800 px-2 py-1 rounded">
                  {product.discountPercentage}% OFF
                </span>
              </div>
              <div className="flex items-center mb-4">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => {
                    if (i < Math.floor(product.rating)) {
                      return <IoMdStar key={i} color="gold" size={20} />;
                    } else if (
                      i === Math.floor(product.rating) &&
                      product.rating % 1 > 0
                    ) {
                      return <IoMdStarHalf key={i} color="gold" size={20} />;
                    } else {
                      return <IoMdStar key={i} color="lightgray" size={20} />;
                    }
                  })}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  ({product.rating.toFixed(2)}, {product.reviews.length}{" "}
                  Reviews)
                </span>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900">
                  Description
                </h2>
                <p className="text-gray-700">{product.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900">Category</h3>
                  <p className="text-gray-600">{product.category}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Brand</h3>
                  <p className="text-gray-600">{product.brand}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Warranty</h3>
                  <p className="text-gray-600">{product.warrantyInformation}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Return Policy</h3>
                  <p className="text-gray-600">{product.returnPolicy}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={"/buy"} state={product} className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 sm:py-2 rounded-lg font-semibold transition-colors">
                  Buy Now
                </Link>
                <button onClick={()=>handleadd(product,i)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 sm:py-2 rounded-lg font-semibold transition-colors">
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Viewdetail;
