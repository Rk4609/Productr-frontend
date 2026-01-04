import React, { useState } from "react"
import "./LoginPage.css"
import { NavLink, useNavigate } from "react-router-dom"

const LoginPage = () => {
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    let newErrors = {}

    if (!identifier.trim()) {
      newErrors.identifier = "Email or Username is required"
    }

    if (!password.trim()) {
      newErrors.password = "Password is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setErrors({})

    try {
      setLoading(true)

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v2/admin/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ identifier, password }),
        }
      )

      const data = await res.json()

      if (res.ok) {
        localStorage.setItem("accessToken", data.data.accessToken)
        localStorage.setItem("admin", JSON.stringify(data.data.admin))
        navigate("/productcard")
      } else {
        setErrors({ form: data.message })
      }
    } catch (error) {
      setErrors({ form: "Invalid email/username or password." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-left">
        <img src="/assets/admin3.jpg" className="login-left" alt="frame" />
      </div>

      <div className="login-right">
        <h2>Welcome to AdminX</h2>
        {errors.form && <p className="form-error">{errors.form}</p>}

        <label>Email or Username</label>
        <input
          className={errors.identifier ? "error" : ""}
          placeholder="Enter your email or username"
          value={identifier}
          onChange={(e) => {
            setIdentifier(e.target.value)

            // typing start then error gone
            if (errors.identifier) {
              setErrors((prev) => ({ ...prev, identifier: "" }))
            }
          }}
        />

        {errors.identifier && <p className="error-text">{errors.identifier}</p>}

        <label>Password</label>

        <input
          type="password"
          className={errors.password ? "error" : ""}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)

            if (errors.password) {
              setErrors((prev) => ({ ...prev, password: "" }))
            }
          }}
        />

        {errors.password && <p className="error-text">{errors.password}</p>}

        <button
          type="button"
          className="btn"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="signup-box">
          <p>Don’t have a Productr Account</p>
          <NavLink to="/signup">Signup here</NavLink>
        </div>
      </div>
    </div>
  )
}

export { LoginPage }
