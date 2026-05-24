import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AppContext';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  };

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        // Authenticate via central Auth Context
        await login(formData.email, formData.password);
        
        // Redirect to home page
        navigate('/');
      } catch (error) {
        console.error('Login failed:', error);
        setErrors({ general: 'Login failed. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 border border-gray-100 shadow-sm rounded-none">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-charcoal flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg font-serif">AB</span>
          </div>
          <h2 className="text-2xl font-bold text-charcoal mb-2 font-serif uppercase tracking-tight">Welcome Back</h2>
          <p className="text-gray-500 font-light text-sm">Sign in to your Adiray Books account</p>
        </div>

        {/* General Error Message */}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-none text-xs mb-6 font-light">
            <i className="fas fa-exclamation-circle mr-2"></i>
            {errors.general}
          </div>
        )}

        {/* Login Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-charcoal uppercase tracking-widest mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border bg-white text-charcoal placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-charcoal focus:border-charcoal rounded-none font-light text-sm transition-all duration-200 ${
                  errors.email ? 'border-red-500' : 'border-gray-200'
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600 font-light">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-xs font-bold text-charcoal uppercase tracking-widest">
                  Password
                </label>
                <a href="#" className="text-xs text-gray-500 hover:text-gold transition-colors font-light">
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 border bg-white text-charcoal placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-charcoal focus:border-charcoal rounded-none font-light text-sm transition-all duration-200 ${
                  errors.password ? 'border-red-500' : 'border-gray-200'
                }`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-600 font-light">{errors.password}</p>
              )}
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              id="remember-me"
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 text-charcoal border-gray-300 rounded-none focus:ring-charcoal focus:ring-1 cursor-pointer"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 font-light cursor-pointer select-none">
              Remember me
            </label>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 px-4 font-semibold uppercase tracking-widest text-xs border transition-all duration-300 ${
                isLoading
                  ? 'bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-charcoal border-charcoal text-white hover:bg-gold hover:text-charcoal'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </div>

          {/* Social Login */}
          <div>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-wider">
                <span className="px-3 bg-white text-gray-400 font-light">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-200 rounded-none bg-white text-xs font-semibold uppercase tracking-wider text-charcoal hover:bg-gray-50 hover:border-charcoal transition-colors duration-200"
              >
                <i className="fab fa-google text-red-500 mr-2.5"></i>
                Google
              </button>

              <button
                type="button"
                className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-200 rounded-none bg-white text-xs font-semibold uppercase tracking-wider text-charcoal hover:bg-gray-50 hover:border-charcoal transition-colors duration-200"
              >
                <i className="fab fa-facebook text-blue-500 mr-2.5"></i>
                Facebook
              </button>
            </div>
          </div>
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-8 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500 font-light">
            Don't have an account?{' '}
            <a href="/register" className="text-charcoal hover:text-gold font-bold transition-colors">
              Create Account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
