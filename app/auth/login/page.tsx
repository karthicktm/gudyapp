'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login submitted:', formData)
    // Future API integration would go here
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      minHeight: '100vh', 
      background: 'white',
      padding: '0 20px'
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '380px',
        position: 'relative',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#e5e7eb'
      }}>
        {/* Clickable Logo at top-right */}
        <Link href="/" style={{ 
          position: 'absolute',
          top: '16px',
          right: '16px',
          textDecoration: 'none',
          cursor: 'pointer',
          display: 'block',
          width: '50px',
          height: '50px'
        }}>
          <div style={{ 
            width: '50px',
            height: '50px',
            borderRadius: '50%', 
            backgroundColor: '#FFC0CB', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
          }}>
            <Image 
              src="/images/icon.svg"
              alt="Gudy Logo"
              width={70}
              height={70}
              style={{ objectFit: 'contain' }}
            />
          </div>
        </Link>

        {/* Login Heading */}
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: 'bold', 
          marginTop: '45px',
          marginBottom: '24px',
          fontFamily: 'sans-serif'
        }}>
          Log in
        </h1>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email field */}
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="email" style={{ 
              display: 'block', 
              fontWeight: '500', 
              marginBottom: '6px',
              fontSize: '16px'
            }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              style={{ 
                width: '100%', 
                padding: '12px 16px', 
                border: '1px solid #D1D5DB', 
                borderRadius: '8px', 
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>

          {/* Password field */}
          <div style={{ marginBottom: '24px' }}>
            <label htmlFor="password" style={{ 
              display: 'block', 
              fontWeight: '500', 
              marginBottom: '6px',
              fontSize: '16px'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Your password"
                style={{ 
                  width: '100%', 
                  padding: '12px 16px', 
                  paddingRight: '48px', // Space for the eye icon
                  border: '1px solid #D1D5DB', 
                  borderRadius: '8px', 
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
                required
              />
              <button 
                type="button" 
                onClick={togglePasswordVisibility}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#6B7280'
                }}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{ 
              width: '100%', 
              backgroundColor: '#FF69B1', 
              color: 'white', 
              fontWeight: '500', 
              padding: '12px 16px',
              borderRadius: '9999px', 
              border: 'none',
              fontSize: '16px',
              cursor: 'pointer',
              marginBottom: '24px'
            }}
          >
            LOG IN
          </button>
        </form>

        {/* Social Login Options */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            marginBottom: '16px',
            gap: '8px'
          }}>
            <div style={{ 
              flex: 1, 
              height: '1px', 
              backgroundColor: '#D1D5DB' 
            }}></div>
            <span style={{ 
              color: '#6B7280',
              fontSize: '14px',
              whiteSpace: 'nowrap'
            }}>
              Or Log in with
            </span>
            <div style={{ 
              flex: 1, 
              height: '1px', 
              backgroundColor: '#D1D5DB' 
            }}></div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between'
          }}>
            <button style={{ 
              width: '31%', 
              height: '48px', 
              border: '1px solid #D1D5DB', 
              borderRadius: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: 'white',
              cursor: 'pointer'
            }}>
              <span style={{ color: '#4267B2', fontWeight: 'bold', fontSize: '20px' }}>f</span>
            </button>
            <button style={{ 
              width: '31%', 
              height: '48px', 
              border: '1px solid #D1D5DB', 
              borderRadius: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: 'white',
              cursor: 'pointer'
            }}>
              <span style={{ color: '#DB4437', fontWeight: 'bold', fontSize: '20px' }}>G</span>
            </button>
            <button style={{ 
              width: '31%', 
              height: '48px', 
              border: '1px solid #D1D5DB', 
              borderRadius: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: 'white',
              cursor: 'pointer'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Forgot Password and Sign Up Link */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            marginBottom: '16px', 
            fontSize: '14px',
            color: '#6B7280'
          }}>
            <a href="#" style={{ 
              color: '#6B7280',
              textDecoration: 'none'
            }}>
              Forgot password?
            </a>
          </div>
          <div style={{ 
            fontSize: '14px',
            color: '#6B7280'
          }}>
            Don't have an account?{' '}
            <Link href="/auth/signup" style={{ 
              color: 'black', 
              fontWeight: '600',
              textDecoration: 'none'
            }}>
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}