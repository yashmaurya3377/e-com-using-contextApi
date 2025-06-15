import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

const Auth = () => {
  const [form, setForm] = useState(true);
  const [userReg, setuserReg] = useState([]);
  const [userLogin, setLogin] = useState([]);
 const navigate = useNavigate()
  const useName = useRef();
  const usePhone = useRef();
  const useEmail = useRef();
  const usePassword = useRef();

  const toggleForm = () => {
    setForm(!form);
  };

  // register section
  const handlesubmit = (e) => {
    e.preventDefault();
    if (!useName.current.value || !usePhone.current.value || !useEmail.current.value || !usePassword.current.value) {

      console.log('running');

      toast.error('Please fill all details');
      return
    }
    let newuser = [...userReg, {
      Name: useName.current.value,
      phone: usePhone.current.value,
      Email: useEmail.current.value,
      password: usePassword.current.value,
    }];

    setuserReg(newuser);
    localStorage.setItem('user', JSON.stringify(newuser));
    toast.success('Profile created!')
    setForm(!form);
  };

  // login section
  const handleLogin = (e) => {
    e.preventDefault();
    if (!useEmail.current.value || !usePassword.current.value) {
      return toast.error('Please fill all details');
    }

    const storedUsers = JSON.parse(localStorage.getItem('user') || '[]');
    // Find user 
    const user = storedUsers.find(user =>
      user.Email === useEmail.current.value &&
      user.password === usePassword.current.value
    );

       if (user) {
    toast.success('Login successful!');
     let newuser = [...userLogin, {
      Email: useEmail.current.value,
      password: usePassword.current.value,
    }];

    setLogin(newuser);
    localStorage.setItem('userLogin', JSON.stringify(newuser));
    navigate('/');
    toast.success('Profile updated!')
  } else {
    toast.error('Invalid credentials');
    console.log('Login failed');
  }


   
  };

  return (
 
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-100 mt-20">
      <div className="w-full max-w-md">
        {form ? (
          /* Signup Form - Apni Dukaan Style */
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-amber-500">
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-amber-800 font-[Poppins]">Apni Dukaan</h2>
                <p className="text-amber-600 mt-2 font-medium">Create Seller Account</p>
                <div className="w-20 h-1 bg-amber-400 mx-auto mt-2"></div>
              </div>
              <form className="space-y-4" onSubmit={handlesubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-amber-800 mb-1">Shop Name</label>
                    <input
                      type="text"
                      ref={useName}
                      className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                      placeholder="Enter shop name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-amber-800 mb-1">Mobile Number</label>
                    <input
                      maxLength={10}
                      type="tel"
                      ref={usePhone}
                      className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                      placeholder="98XXXXXX20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-amber-800 mb-1">Email</label>
                    <input
                      type="email"
                      ref={useEmail}
                      className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                      placeholder="shop@apnidukaan.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-amber-800 mb-1">Password</label>
                    <input
                      type="password"
                      ref={usePassword}
                      className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-[1.02] shadow-md"
                >
                  Register Shop
                </button>
              </form>
              <p className="text-center text-amber-700 mt-6">
                Already registered?{" "}
                <button
                  onClick={toggleForm}
                  className="text-amber-800 hover:text-amber-900 font-bold hover:underline transition"
                >
                  Login Here
                </button>
              </p>
            </div>
          </div>
        ) : (
          /* Login Form - Apni Dukaan Style */
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-amber-500">
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-amber-800 font-[Poppins]">Apni Dukaan</h2>
                <p className="text-amber-600 mt-2 font-medium">Seller Login</p>
                <div className="w-20 h-1 bg-amber-400 mx-auto mt-2"></div>
              </div>
              <form className="space-y-4" onSubmit={handleLogin}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-amber-800 mb-1">Mobile/Email</label>
                    <input
                      ref={useEmail}
                      type="text"
                      className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                      placeholder="98XXXXXX20 or email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-amber-800 mb-1">Password</label>
                    <input
                      ref={usePassword}
                      type="password"
                      className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-[1.02] shadow-md"
                >
                  Login to Dashboard
                </button>
              </form>
              <p className="text-center text-amber-700 mt-6">
                New to Apni Dukaan?{" "}
                <button
                  onClick={toggleForm}
                  className="text-amber-800 hover:text-amber-900 font-bold hover:underline transition"
                >
                  Register Your Shop
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;