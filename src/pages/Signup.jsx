import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import bcrypt from 'bcryptjs'; // Import bcryptjs library
import bg from '../assets/bg.png';

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false); 

  const navigate = useNavigate(); 

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // First Name validation
    if (!firstName.trim()) {
      setFirstNameError("First Name is required");
      return; 
    } else if (!/^[a-zA-Z]+$/.test(firstName)) {
      setFirstNameError("First Name is invalid. Only alphabetic characters are allowed.");
      return; 
    } else {
      setFirstNameError("");
    }

    // Last Name validation
    if (!lastName.trim()) {
      setLastNameError("Last Name is required");
      return;
    } else if (!/^[a-zA-Z]+$/.test(lastName)) {
      setLastNameError("Last Name is invalid. Only alphabetic characters are allowed.");
      return;
    } else {
      setLastNameError("");
    }

    // Email validation
    if (!email.trim()) {
      setEmailError("Email is required");
      return; 
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid");
      return; 
    } else {
      setEmailError("");
    }

    // Password validation
    if (!password.trim()) {
      setPasswordError("Password is required");
      return; 
    } else if (password.length < 8) {
      setPasswordError("Password should be at least 8 characters long");
      return; 
    } else if (!/(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(password)) {
      setPasswordError("Password must contain at least one alphabetic character, one number, and one special character");
      return;
    } else {
      setPasswordError("");
    }

    // Confirm Password validation
    if (!confirmPassword.trim()) {
      setConfirmPasswordError("Confirm Password is required");
      return; 
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      return; 
    } else {
      setConfirmPasswordError("");
    }
    
    // Hash the password
    bcrypt.hash(password, 10, function(err, hashedPassword) {
      if (err) {
        console.error('Error hashing password:', err);
        return;
      }
      
      // If no error, store the hashed password in local storage
      const userDetails = {
        fullName: firstName + " " + lastName,
        email,
        password: hashedPassword, 
        code: "",
        successfulReferralCount: 0,
      };

      // Retrieve existing user details array from local storage, push to the array and update the local storage
      const existingUserDetails = JSON.parse(localStorage.getItem("userDetails")) || [];
      existingUserDetails.push(userDetails);
      localStorage.setItem("userDetails", JSON.stringify(existingUserDetails));

      alert("Signup Successful, kindly check your mail to verify email address");
      navigate('/email-verification');
    });
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full justify-center items-center h-screen flex flex-row">
      <div className="hidden lg:block h-screen w-[70%] bg-blue-900">
        <img src={bg} alt="login-bg" className="max-w-full h-full object-cover" />
      </div>
      <div className="w-[100%] xm:w-[70%] md:w-[60%] lg:w-[40%] flex flex-col justify-center items-center p-4 ">
        <div className="flex justify-center items-center">Logo</div>
        <form className="w-[90%] bg-white shadow-md rounded-md py-12 px-6 mt-8" onSubmit={handleSubmit}>
          <div className="w-full flex flex-col">
            <label className="text-sm text-slate-500">First Name</label>
            <input
              type="text"
              placeholder="Enter Your First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-2 border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-600 placeholder:text-sm"
            />
            <span className="text-sm text-red-700">{firstNameError}</span>
          </div>
          <div className="w-full flex flex-col mt-4">
            <label className="text-sm text-slate-500">Last Name</label>
            <input
              type="text"
              placeholder="Enter Your Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-2 border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-600 placeholder:text-sm"
            />
            <span className="text-sm text-red-700">{lastNameError}</span>
          </div>
          <div className="w-full flex flex-col mt-4">
            <label className="text-sm text-slate-500">Email</label>
            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-600 placeholder:text-sm"
            />
            <span className="text-sm text-red-700">{emailError}</span>
          </div>
          <div className="relative mt-4">
            <label className="text-sm text-slate-500">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-600 placeholder:text-sm"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-[70%] right-3 transform -translate-y-1/2 focus:outline-none"
            >
              {showPassword ? (
                <FaEye className="text-slate-800" />
              ) : (
                <FaEyeSlash className="text-slate-800" />
              )}
            </button>
          </div>
          <div className="w-full flex flex-col mt-4">
            <label className="text-sm text-slate-500">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Your Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-2 border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-600 placeholder:text-sm"
            />
            <span className="text-sm text-red-700">{confirmPasswordError}</span>
          </div>
          <input
            type="submit"
            value="Sign up"
            className="w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mt-4"
          />
          <div className="flex justify-center mt-4">
            <span className="text-sm text-slate-500">
              Already have an account?{" "}
              <a href="/" className="text-blue-500">
                Login
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
