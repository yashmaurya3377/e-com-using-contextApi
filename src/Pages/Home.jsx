import React, { useContext, useEffect, useState } from "react";
import Userdata from "./../context/Userdata";
import { toast } from "react-toastify";
import { PiShoppingCartBold } from "react-icons/pi";
import Viewdata from "../context/Viewdata";
import { Link } from "react-router-dom";
import Filterdata from "./../context/Filterdata";

const Home = () => {
  let store = useContext(Userdata);
  let viwestore = useContext(Viewdata);
  let search = useContext(Filterdata);
  console.log(search.Filteritem);
  console.log(store);

  const [Allproducts, setAllproducts] = useState([]);
  const getData = async () => {
    let res = await fetch("https://dummyjson.com/products?limit=0");
    let data = await res.json();

    setAllproducts(data.products);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleadd = (obj, i) => {
    let copyarr = [...store.database, obj];
    store.setdatabase(copyarr);
    // console.log(copyarr);
    toast(" item added successfully");
  };
  const handleview = (obj, i) => {
    let copyarr = [obj];
    viwestore.setviewarr(copyarr);
    // console.log(copyarr);
    toast(" view product detail");
  };

  let searchProduct = Allproducts.filter((ele) =>
    ele.title.toLowerCase().includes(search.Filteritem.toLowerCase())
  );

  console.log(searchProduct);
  
  return (
    <div className=" backdrop-blur-[5px]  grid w-[100%] mx-auto mt-15  gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1  p-10  ">
      {searchProduct.map((ele, i) => (
        <div
          key={ele.id}
          className="bg-black/20 backdrop-blur-[200px]  border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
        >
          <div className="relative h-48 overflow-hidden">
            <img
              src={ele.thumbnail}
              alt={ele.title}
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
            />
            (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {Math.round(ele.discountPercentage)}% OFF
            </span>
            )
          </div>

          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-lg font-semibold text-gray-300 mb-1 line-clamp-2">
              {ele.title}
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              {ele.brand || "Generic Brand"}
            </p>
            <div className="mt-auto">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl font-bold text-gray-900">
                  $
                  {(
                    ele.price *
                    (1 - (ele.discountPercentage / 100 || 0))
                  ).toFixed(2)}
                </span>
                {ele.discountPercentage && (
                  <span className="text-sm text-gray-500 line-through">
                    ${ele.price.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Button */}
              <div className="flex gap-4">
                <button
                  onClick={() => handleadd(ele)}
                  className=" bg-green-500 hover:bg-green-600 text-white py-2 px-2 rounded-md font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <PiShoppingCartBold size={20} />
                  Add to Cart
                </button>
                <Link
                  to={"/view"}
                  onClick={() => handleview(ele, i)}
                  className=" bg-green-500 hover:bg-green-600 text-white py-2 px-2 rounded-md font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <PiShoppingCartBold size={20} />
                  view detail
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
