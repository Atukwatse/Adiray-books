import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AppContext';
import { requestGoogleProfile } from '../utils/googleAuth';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeNewsletter: false
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
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    return newErrors;
  };

  const { register, loginWithGoogle } = useAuth();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        // Register via central Auth Context
        await register({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email
        });
        
        // Redirect to home page
        navigate('/');
      } catch (error) {
        console.error('Registration failed:', error);
        setErrors({ general: 'Registration failed. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleGoogleSignUp = async () => {
    setErrors({});
    setIsGoogleLoading(true);

    try {
      const googleProfile = await requestGoogleProfile();
      await loginWithGoogle(googleProfile);
      navigate('/');
    } catch (error) {
      console.error('Google sign-up failed:', error);
      setErrors({ general: error.message || 'Google sign-up failed. Please try again.' });
    } finally {
      setIsGoogleLoading(false);
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
          <h2 className="text-2xl font-bold text-charcoal mb-2 font-serif uppercase tracking-tight">Join Adiray Books</h2>
          <p className="text-gray-500 font-light text-sm">Create your account to start shopping</p>
        </div>

        {/* General Error Message */}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-none text-xs mb-6 font-light">
            <i className="fas fa-exclamation-circle mr-2"></i>
            {errors.general}
          </div>
        )}

        {/* Registration Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-xs font-bold text-charcoal uppercase tracking-widest mb-2">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border bg-white text-charcoal placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-charcoal focus:border-charcoal rounded-none font-light text-sm transition-all duration-200 ${
                    errors.firstName ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="John"
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-600 font-light">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-xs font-bold text-charcoal uppercase tracking-widest mb-2">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border bg-white text-charcoal placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-charcoal focus:border-charcoal rounded-none font-light text-sm transition-all duration-200 ${
                    errors.lastName ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <p className="mt-1 text-xs text-red-600 font-light">{errors.lastName}</p>
                )}
              </div>
            </div>

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
                placeholder="john.doe@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600 font-light">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-xs font-bold text-charcoal uppercase tracking-widest mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 border bg-white text-charcoal placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-charcoal focus:border-charcoal rounded-none font-light text-sm transition-all duration-200 ${
                  errors.password ? 'border-red-500' : 'border-gray-200'
                }`}
                placeholder="Min. 8 characters"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-600 font-light">{errors.password}</p>
              )}
              <p className="mt-1.5 text-[10px] text-gray-400 font-light uppercase tracking-wide">
                Must contain uppercase, lowercase, and number
              </p>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-bold text-charcoal uppercase tracking-widest mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 border bg-white text-charcoal placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-charcoal focus:border-charcoal rounded-none font-light text-sm transition-all duration-200 ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                }`}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-600 font-light">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-4">
            <div>
              <div className="flex items-start">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-charcoal border-gray-300 rounded-none focus:ring-charcoal focus:ring-1 cursor-pointer mt-0.5"
                />
                <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-600 font-light cursor-pointer select-none">
                  I agree to the{' '}
                  <a href="#" className="text-charcoal hover:text-gold font-bold transition-colors">
                    Terms and Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-charcoal hover:text-gold font-bold transition-colors">
                    Privacy Policy
                  </a>
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="mt-1 text-xs text-red-600 font-light">{errors.agreeToTerms}</p>
              )}
            </div>

            <div className="flex items-start">
              <input
                id="subscribeNewsletter"
                name="subscribeNewsletter"
                type="checkbox"
                checked={formData.subscribeNewsletter}
                onChange={handleChange}
                className="h-4 w-4 text-charcoal border-gray-300 rounded-none focus:ring-charcoal focus:ring-1 cursor-pointer mt-0.5"
              />
              <label htmlFor="subscribeNewsletter" className="ml-2 block text-sm text-gray-600 font-light cursor-pointer select-none">
                Subscribe to newsletter for book recommendations and deals
              </label>
            </div>
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
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </div>

          {/* Social Registration */}
          <div>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-wider">
                <span className="px-3 bg-white text-gray-400 font-light">
                  Or sign up with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={handleGoogleSignUp}
                disabled={isGoogleLoading}
                className={`w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-200 rounded-none bg-white text-xs font-semibold uppercase tracking-wider text-charcoal transition-colors duration-200 ${
                  isGoogleLoading ? 'cursor-not-allowed opacity-60' : 'hover:bg-gray-50 hover:border-charcoal'
                }`}
              >
                <i className={`fab ${isGoogleLoading ? 'fa-spinner fa-spin' : 'fa-google'} text-red-500 mr-2.5`}></i>
                {isGoogleLoading ? 'Connecting' : 'Google'}
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

        {/* Sign In Link */}
        <div className="text-center mt-8 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500 font-light">
            Already have an account?{' '}
            <a href="/login" className="text-charcoal hover:text-gold font-bold transition-colors">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
