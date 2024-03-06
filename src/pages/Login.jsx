import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import bg from '../assets/bg.png';

const Login = () => {
  const navigate = useNavigate();

  // State variables to hold email, password, and error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Email validation
    if (!email.trim()) {
      setEmailError("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid");
    } else {
      setEmailError("");
    }
  
    // Password validation
    if (!password.trim()) {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }
    const userDetails = JSON.parse(localStorage.getItem("userDetails")) || [];

    // Check if all errors are empty and proceed with login
    if (emailError === "" && passwordError === "") {
      // Check if the user input matches any stored credentials
      const matchedUser = userDetails.find(user => user.email === email && user.password === password);
      if (matchedUser) {
        alert("Login successful");
        console.log(`${email} logged in successfully.`);
        navigate(`/referral?email=${encodeURIComponent(email)}`);
      } else {
        alert("Invalid login");
      }
    } else {
      alert("Please provide valid email and password");
    }
  };
  


  if (rememberPassword) {
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
  } else {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
  }

  const RememberPassword = (e) => {
    setRememberPassword(e.target.checked);
  };

  // Effect to set email and password from local storage if available
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
    if (storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPassword(storedPassword);
      setRememberPassword(true);
    }
  }, []);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full justify-center items-center h-screen flex flex-row">
      <div className="hidden lg:block w-[70%] bg-blue-900 h-screen">
        <img src={bg} alt="login-bg" className="max-w-full h-full object-cover" />
      </div>
      <div className="w-[100%] xm:w-[70%] md:w-[60%] lg:w-[40%] flex flex-col justify-center items-center p-4 ">
        <div className="flex justify-center items-center">Logo</div>
        <form
          className="w-[90%] bg-white shadow-md rounded-md py-12 px-6 mt-8"
          onSubmit={handleSubmit}
        >
          <div className="w-full flex flex-col">
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
          <div className="w-full flex flex-col mt-8">
            <div className="flex w-full justify-between">
              <label className="text-sm text-slate-500">Password</label>
              <span className="text-sm text-red-500">
                <a href="/forgot-password">Forgot Password?</a>
              </span>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-600 placeholder:text-sm"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-[60%] right-3 transform -translate-y-1/2 focus:outline-none"
              >
                {showPassword ? (
                  <FaEye className="text-slate-800" />
                ) : (
                  <FaEyeSlash className="text-slate-800" />
                )}
              </button>
            </div>
            <span className="text-sm text-red-700">{passwordError}</span>
            <div className="flex mt-2">
              <input
                type="checkbox"
                checked={rememberPassword}
                onChange={RememberPassword}
              />
              <label className="ml-2 text-sm text-slate-500">
                Remember Password?
              </label>
            </div>
          </div>
          <input
            type="submit"
            value="Login"
            className="w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mt-8"
          />
          <div className="flex justify-center mt-4">
            <span className="text-sm text-slate-500">
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-500">
                Sign up
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const Login = () => {
//   const navigate = useNavigate();

//   // State variables to hold email, password, and error messages
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [rememberPassword, setRememberPassword] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   // Function to handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Email validation
//     if (!email.trim()) {
//       setEmailError("Email is required");
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       setEmailError("Email is invalid");
//     } else {
//       setEmailError("");
//     }

//     // Password validation
//     if (!password.trim()) {
//       setPasswordError("Password is required");
//     } else {
//       setPasswordError("");
//     }

//     // Retrieve user details array from local storage
//     const userDetailsArray = JSON.parse(localStorage.getItem("userDetails")) || [];

//     // Check if all errors are empty and proceed with login
//     if (emailError === "" && passwordError === "") {
//       // Check if the user input matches any stored user details
//       const matchedUser = userDetailsArray.find(user => user.email === email && user.password === password);
//       if (matchedUser) {
//         alert("Login successful");
//         console.log(`${matchedUser.email} logged in successfully.`);
//         navigate("/dashboard");
//       } else {
//         alert("Invalid login");
//       }
//     } else {
//       alert("Please provide valid email and password");
//     }
//   };

//   if (rememberPassword) {
//     // Append user details to the array in local storage
//     const userDetailsArray = JSON.parse(localStorage.getItem("userDetails")) || [];
//     userDetailsArray.push({ email, password });
//     localStorage.setItem("userDetails", JSON.stringify(userDetailsArray));
//   }

//   const RememberPassword = (e) => {
//     setRememberPassword(e.target.checked);
//   };

//   // Effect to set email and password from local storage if available
//   useEffect(() => {
//     const storedEmail = localStorage.getItem("email");
//     const storedPassword = localStorage.getItem("password");
//     if (storedEmail && storedPassword) {
//       setEmail(storedEmail);
//       setPassword(storedPassword);
//       setRememberPassword(true);
//     }
//   }, []);

//   // Function to toggle password visibility
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="w-full justify-center items-center h-screen flex flex-row">
//        <div className="hidden lg:block w-[70%] bg-blue-900 h-screen">
//          <img src="../assets/bg.png" alt="login-bg" />
//        </div>
//       <div className="w-[100%] xm:w-[70%] md:w-[60%] lg:w-[40%] flex flex-col justify-center items-center p-4 ">
//          <div className="flex justify-center items-center">Logo</div>
//          <form
//           className="w-[90%] bg-white shadow-md rounded-md py-12 px-6 mt-8"
//           onSubmit={handleSubmit}
//         >
//           <div className="w-full flex flex-col">
//             <label className="text-sm text-slate-500">Email</label>
//             <input
//               type="email"
//               placeholder="Enter Your Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-2 border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-600 placeholder:text-sm"
//             />
//             <span className="text-sm text-red-700">{emailError}</span>
//           </div>
//           <div className="w-full flex flex-col mt-8">
//             <div className="flex w-full justify-between">
//               <label className="text-sm text-slate-500">Password</label>
//               <span className="text-sm text-red-500">
//                 <a href="/forgot-password">Forgot Password?</a>
//               </span>
//             </div>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
//                 placeholder="Enter Your Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full mt-2 border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-600 placeholder:text-sm"
//               />
//               <button
//                 type="button"
//                 onClick={togglePasswordVisibility}
//                 className="absolute top-[60%] right-3 transform -translate-y-1/2 focus:outline-none"
//               >
//                 {showPassword ? (
//                   <FaEye className="text-slate-800" />
//                 ) : (
//                   <FaEyeSlash className="text-slate-800" />
//                 )}
//               </button>
//             </div>
//             <span className="text-sm text-red-700">{passwordError}</span>
//             <div className="flex mt-2">
//               <input
//                 type="checkbox"
//                 checked={rememberPassword}
//                 onChange={RememberPassword}
//               />
//               <label className="ml-2 text-sm text-slate-500">
//                 Remember Password?
//               </label>
//             </div>
//           </div>
//           <input
//             type="submit"
//             value="Login"
//             className="w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mt-8"
//           />
//           <div className="flex justify-center mt-4">
//             <span className="text-sm text-slate-500">
//               Don't have an account?{" "}
//               <a href="/signup" className="text-blue-500">
//                 Sign up
//               </a>
//             </span>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
