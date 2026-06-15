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
      if ((error.message || '').toLowerCase().includes('cancelled')) {
        return;
      }
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
          <div className="mx-auto mb-4">
            <img src="/images/web log.png" alt="Adiray Books" className="h-10 w-auto mx-auto block" />
          </div>
          <h2 className="text-2xl font-bold text-charcoal mb-2 font-serif uppercase tracking-tight">Welcome to Adiray Books</h2>
        </div>

        {/* General Error Message */}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-none text-xs mb-6 font-light">
            <i className="fas fa-exclamation-circle mr-2"></i>
            {errors.general}
          </div>
        )}

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
        </div>
      </div>
    </div>
  );
};

export default Login;
