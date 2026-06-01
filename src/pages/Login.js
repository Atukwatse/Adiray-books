import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AppContext';
import { requestGoogleProfile } from '../utils/googleAuth';

const Login = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { loginWithGoogle } = useAuth();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setErrors({});
    setIsGoogleLoading(true);

    try {
      const googleProfile = await requestGoogleProfile();
      await loginWithGoogle(googleProfile);
      navigate('/');
    } catch (error) {
      console.error('Google sign-in failed:', error);
      setErrors({ general: error.message || 'Google sign-in failed. Please try again.' });
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
          <h2 className="text-2xl font-bold text-charcoal mb-2 font-serif uppercase tracking-tight">Welcome to Adiray Books</h2>
          <p className="text-gray-500 font-light text-sm">Sign in to your account using social authentication</p>
        </div>

        {/* General Error Message */}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-none text-xs mb-6 font-light">
            <i className="fas fa-exclamation-circle mr-2"></i>
            {errors.general}
          </div>
        )}

        {/* Social Authentication System */}
        <div className="space-y-4">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
            className={`w-full inline-flex justify-center items-center py-3.5 px-4 border border-gray-200 rounded-none bg-white text-xs font-semibold uppercase tracking-wider text-charcoal transition-all duration-200 ${
              isGoogleLoading ? 'cursor-not-allowed opacity-60' : 'hover:bg-gray-50 hover:border-charcoal'
            }`}
          >
            <i className={`fab ${isGoogleLoading ? 'fa-spinner fa-spin' : 'fa-google'} text-red-500 mr-2.5 text-base`}></i>
            {isGoogleLoading ? 'Connecting to Google' : 'Continue with Google'}
          </button>

          <button
            type="button"
            className="w-full inline-flex justify-center items-center py-3.5 px-4 border border-gray-200 rounded-none bg-white text-xs font-semibold uppercase tracking-wider text-charcoal hover:bg-gray-50 hover:border-charcoal transition-all duration-200"
          >
            <i className="fab fa-facebook text-blue-500 mr-2.5 text-base"></i>
            Continue with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
