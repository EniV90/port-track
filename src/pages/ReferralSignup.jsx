import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import bcrypt from 'bcryptjs'; // Import bcryptjs library
import bg from "../assets/bg.png";

const ReferralSignup = () => {
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
  const [referralCode, setReferralCode] = useState("");
  const [referralCount, setReferralCount] = useState("");
  const [referralCodeError, setReferralCodeError] = useState("");
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // First Name validation
    if (!firstName.trim()) {
      setFirstNameError("First Name is required");
      return; // Prevent form submission
    } else if (!/^[a-zA-Z]+$/.test(firstName)) {
      setFirstNameError(
        "First Name is invalid. Only alphabetic characters are allowed."
      );
      return; // Prevent form submission
    } else {
      setFirstNameError("");
    }

    // Last Name validation
    if (!lastName.trim()) {
      setLastNameError("Last Name is required");
      return; // Prevent form submission
    } else if (!/^[a-zA-Z]+$/.test(lastName)) {
      setLastNameError(
        "Last Name is invalid. Only alphabetic characters are allowed."
      );
      return; // Prevent form submission
    } else {
      setLastNameError("");
    }

    // Email validation
    if (!email.trim()) {
      setEmailError("Email is required");
      return; // Prevent form submission
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid");
      return; // Prevent form submission
    } else {
      setEmailError("");
    }

    // Password validation
    if (!password.trim()) {
      setPasswordError("Password is required");
      return; // Prevent form submission
    } else if (password.length < 8) {
      setPasswordError("Password should be at least 8 characters long");
      return; // Prevent form submission
    } else if (
      !/(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(password)
    ) {
      setPasswordError(
        "Password must contain at least one alphabetic character, one number, and one special character"
      );
      return; // Prevent form submission
    } else {
      setPasswordError("");
    }

    // Confirm Password validation
    if (!confirmPassword.trim()) {
      setConfirmPasswordError("Confirm Password is required");
      return; // Prevent form submission
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      return; // Prevent form submission
    } else {
      setConfirmPasswordError("");
    }

    // Referral Code validation
    if (!referralCode.trim()) {
      setReferralCodeError("Referral Code is required");
    } else {
      setReferralCodeError("");
    }

    const userDetails = JSON.parse(localStorage.getItem("userDetails")) || [];

    // Hash the password
    bcrypt.hash(password, 10, function(err, hashedPassword) {
      if (err) {
        console.error('Error hashing password:', err);
        return;
      }
      
      // If no error, continue with form submission
      // Check if all errors are empty and display response to the user
      if (
        firstNameError === "" &&
        lastNameError === "" &&
        emailError === "" &&
        passwordError === "" &&
        confirmPasswordError === "" &&
        referralCodeError === ""
      ) {
        const newUser = {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          password: hashedPassword, 
          code: referralCode.trim(),
          successfulReferralCount: referralCount.trim(),
        };
        userDetails.push(newUser);
        localStorage.setItem("userDetails", JSON.stringify(userDetails)); 
        alert("Signup Successful");
        navigate(`/referral?email=${encodeURIComponent(email)}`);
      }
    });
  };

  useEffect(() => {
    // Extract last 8 characters from the URL and set it as referral code
    const url = window.location.href;
    const last8Characters = url.substr(url.length - 8);
    setReferralCode(last8Characters);
  }, []);

  return (
    <div className="w-full justify-center items-center h-screen flex flex-row">
      <div className="hidden lg:block  h-screen w-[70%] bg-blue-900">
        <img
          src={bg}
          alt="login-bg"
          className="max-w-full h-full object-cover"
        />
      </div>
      <div className="w-[100%] xm:w-[70%] md:w-[60%] lg:w-[40%] flex flex-col justify-center items-center p-4 ">
        <div className="flex justify-center items-center">Logo</div>
        <form
          className="w-[90%] bg-white shadow-md rounded-md py-12 px-6 mt-8"
          onSubmit={handleSubmit}
        >
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
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-600 placeholder:text-sm"
            />
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
          <div className="w-full flex flex-col mt-4">
            <label className="text-sm text-slate-500">Referral Code</label>
            <input
              type="text"
              placeholder="Enter Your Referral Code"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              disabled
              className="mt-2 border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-600 placeholder:text-sm"
            />
            <span className="text-sm text-red-700">{referralCodeError}</span>
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

export default ReferralSignup;
