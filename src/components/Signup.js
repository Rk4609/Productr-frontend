// import React, { useState } from "react"
// import styles from "./Signup.module.css"
// import { useNavigate } from "react-router-dom"

// const Signup = () => {
//   const [fullName, setFullName] = useState("")
//   const [username, setUsername] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [errors, setErrors] = useState({})

//   const [toast, setToast] = useState({
//     show: false,
//     message: "",
//     type: "success",
//   })

//   let navigate = useNavigate()
//   const handleSignup = async () => {
    

//     let newErrors = {}

//     if (!fullName.trim()) {
//       newErrors.fullName = "Full name is required"
//     }

//     if (!username.trim()) {
//       newErrors.username = "Username is required"
//     }

//     if (!email.trim()) {
//       newErrors.email = "Email is required"
//     }

//     if (!password.trim()) {
//       newErrors.password = "Password is required"
//     }

    
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors)
//       return
//     }

    
//     setErrors({})

   
//     // fetch to  POST request send
//     try {
//       const response = await fetch(
//         `${process.env.REACT_APP_API_URL}/api/v2/admin/signup`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             fullName: fullName,
//             username: username,
//             email: email,
//             password: password,
//           }),
//         }
//       )
//       const result = await response.json()
//       if (response.ok) {
//         setFullName("")
//         setUsername("")
//         setEmail("")
//         setPassword("")
//         localStorage.setItem("admin", JSON.stringify(result.data))
//         setToast({
//           show: true,
//           message: "Signup successful ",
//           type: "success",
//         })

//         setTimeout(() => {
//           setToast({ show: false, message: "", type: "" })
//           navigate("/home/published")
//         }, 2500)
//       } else {
        
//         setErrors({ form: result.message })
//       }
//     } catch (error) {
//       setErrors({ form: "Invalid email/username or password." })
     
//     }
//   }

//   return (
//     <>
//       {toast.show && (
//         <div className={`${styles.toast} ${styles[toast.type]}`}>
//           {toast.message}
//         </div>
//       )}

//       <div className={styles.loginsignup}>
//         <div className={styles["loginsignup-container"]}>
//           <h1>Sign Up</h1>
//           {errors.form && <p className={styles.formError}>{errors.form}</p>}

//           <div className={styles["loginsignup-field"]}>
            
//             <input
//               type="text"
//               placeholder="Enter Your Full Name"
//               value={fullName}
//               className={errors.fullName ? styles.error : ""}
//               onChange={(e) => {
//                 setFullName(e.target.value)
//                 if (errors.fullName) {
//                   setErrors((prev) => ({ ...prev, fullName: "" }))
//                 }
//               }}
//             />
//             {errors.fullName && (
//               <p className={styles.errorText}>{errors.fullName}</p>
//             )}

           

//             <input
//               type="text"
//               placeholder="Enter Your Username"
//               value={username}
//               className={errors.username ? styles.error : ""}
//               onChange={(e) => {
//                 setUsername(e.target.value)
//                 if (errors.username) {
//                   setErrors((prev) => ({ ...prev, username: "" }))
//                 }
//               }}
//             />
//             {errors.username && (
//               <p className={styles.errorText}>{errors.username}</p>
//             )}

           
//             <input
//               type="email"
//               placeholder="Enter Your Email"
//               value={email}
//               className={errors.email ? styles.error : ""}
//               onChange={(e) => {
//                 setEmail(e.target.value)
//                 if (errors.email) {
//                   setErrors((prev) => ({ ...prev, email: "" }))
//                 }
//               }}
//             />
//             {errors.email && <p className={styles.errorText}>{errors.email}</p>}

            
//             <input
//               type="password"
//               placeholder="Enter Your Password"
//               value={password}
//               className={errors.password ? styles.error : ""}
//               onChange={(e) => {
//                 setPassword(e.target.value)
//                 if (errors.password) {
//                   setErrors((prev) => ({ ...prev, password: "" }))
//                 }
//               }}
//             />
//             {errors.password && (
//               <p className={styles.errorText}>{errors.password}</p>
//             )}

//             <button onClick={handleSignup}>SignUp</button>
//             <button onClick={() => navigate("/")}>Back</button>
//           </div>

//           {/* <p className={styles["loginsignup-login"]}>
//           Already have an account? <span>Login here</span>
//         </p> */}

//           {/* <div className={styles["loginsignup-agree"]}>
//           <input type='checkbox' />
//           <p>
//             By continuing, I agree to the Terms of Use & Privacy Policy.
//           </p>
//         </div> */}
//         </div>
//       </div>
//     </>
//   )
// }

// export default Signup

import React, { useState } from "react";
import "./LoginPage.css";
import {NavLink, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSignup = async () => {
    let newErrors = {};

    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    if (!username.trim()) newErrors.username = "Username is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v2/admin/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fullName, username, email, password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("admin", JSON.stringify(data.data));
        alert("Signup successful");
        navigate("/productcard");
      } else {
        setErrors({ form: data.message });
      }
    } catch (error) {
      setErrors({ form: "Something went wrong" });
    }
  };

  return (
    <div className="login-container">
      {/* LEFT IMAGE SAME AS LOGIN */}
      <div className="login-left">
        <img src="/assets/admin3.jpg" className="login-left" alt="frame" />
      </div>

      {/* RIGHT FORM */}
      <div className="login-right">
        <h2>Create AdminX Account</h2>
        {errors.form && <p className="form-error">{errors.form}</p>}

        <label>Full Name</label>
        <input
          placeholder="Enter full name"
          value={fullName}
          className={errors.fullName ? "error" : ""}
          onChange={(e) => setFullName(e.target.value)}
        />

        <label>Username</label>
        <input
          placeholder="Enter username"
          value={username}
          className={errors.username ? "error" : ""}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          className={errors.email ? "error" : ""}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          className={errors.password ? "error" : ""}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn" onClick={handleSignup}>
          Signup
        </button>

        <div className="signup-box">
          <p>Already have an account?</p>
          {/* <span onClick={() => navigate("/login")}>Login here</span> */}
          <NavLink to="/login" onClick={()=>navigate("/login")}>Login here</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Signup;
