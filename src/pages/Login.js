import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AppContext';
import { requestGoogleProfile } from '../utils/googleAuth';

const Login = () => {
  const navigate = useNavigate();
  const { user, loginWithGoogle, login, register, logout } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  useEffect(() => {
    document.title = isSignUp ? "Create Account | Adiray Books" : "Sign In | Adiray Books";
  }, [isSignUp]);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (isSignUp) {
      if (!formData.username.trim()) {
        newErrors.username = 'Username is required';
      } else if (formData.username.length < 3) {
        newErrors.username = 'Username must be at least 3 characters';
      }

      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters long';
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(formData.password)) {
        newErrors.password = 'Password must include uppercase, lowercase, and a number';
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    } else {
      // Login validation
      if (!formData.email.trim()) { // Use email field for both username/email in login
        newErrors.email = 'Username or Email is required';
      }
      if (!formData.password) {
        newErrors.password = 'Password is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      if (isSignUp) {
        // Map username to first/last name for backend if needed
        const nameParts = formData.username.trim().split(/\s+/);
        const firstName = nameParts[0] || formData.username;
        const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : 'User';
        
        await register({
          ...formData,
          firstName,
          lastName
        });
        
        setSuccessMessage('Account created successfully! Please sign in with your credentials.');
        setIsSignUp(false);
        setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
      } else {
        const authUser = await login(formData.email, formData.password);
        if (authUser?.role === 'Admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      setErrors({ general: error.message || 'Authentication failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrors({});
    setIsGoogleLoading(true);

    try {
      const googleProfile = await requestGoogleProfile();
      await loginWithGoogle(googleProfile);
      navigate('/');
    } catch (error) {
      if (!error.message?.includes('cancelled')) {
        setErrors({ general: 'Google sign-in failed. Please try again.' });
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      setErrors({ general: 'Logout failed.' });
    }
  };

  // If already logged in, show a profile-like card with logout
  if (user) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full bg-white p-10 border border-gray-100 shadow-2xl rounded-3xl text-center">
          <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            {user.photoURL ? (
              <img src={user.photoURL} alt={user.displayName} className="w-full h-full rounded-full object-cover" />
            ) : (
              <i className="fas fa-user text-amber-600 text-3xl"></i>
            )}
          </div>
          <h2 className="text-2xl font-black text-charcoal mb-2 font-serif">Hello, {user.displayName || user.username}</h2>
          <p className="text-gray-500 mb-8">{user.email}</p>
          <button
            onClick={handleLogout}
            className="w-full py-4 px-6 rounded-xl border-2 border-red-100 text-red-600 font-black uppercase tracking-widest hover:bg-red-50 transition-all"
          >
            <i className="fas fa-sign-out-alt mr-2"></i>
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 sm:p-12 border border-gray-100 shadow-2xl rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-mustard"></div>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="mx-auto mb-6">
            <img src="/images/web log.png" alt="Adiray Books" className="h-12 w-auto mx-auto" />
          </div>
          <h2 className="text-3xl font-black text-charcoal mb-2 font-serif uppercase tracking-tight">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-gray-500 font-light">
            {isSignUp ? 'Join the Adiray community' : 'Sign in to your account'}
          </p>
        </div>

        {/* General Error Message */}
        {errors.general && (
          <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm mb-6 flex items-center animate-shake">
            <i className="fas fa-exclamation-circle mr-2"></i>
            {errors.general}
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-50 border border-green-100 text-green-600 px-4 py-3 rounded-xl text-sm mb-6 flex items-center animate-fade-in shadow-sm">
            <i className="fas fa-check-circle mr-2"></i>
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-[10px] font-black text-charcoal uppercase tracking-widest mb-1.5 ml-1">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={`w-full px-5 py-3 rounded-xl border transition-all outline-none text-sm ${errors.username ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-mustard'
                  }`}
                placeholder="Unique username"
              />
              {errors.username && <p className="text-red-500 text-[10px] mt-1 ml-1 font-bold">{errors.username}</p>}
            </div>
          )}

          <div>
            <label className="block text-[10px] font-black text-charcoal uppercase tracking-widest mb-1.5 ml-1">
              {isSignUp ? 'Email Address' : 'Username or Email'}
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-5 py-3 rounded-xl border transition-all outline-none text-sm ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-mustard'
                }`}
              placeholder={isSignUp ? "reader@gmail.com" : "Email or Username"}
            />
            {errors.email && <p className="text-red-500 text-[10px] mt-1 ml-1 font-bold">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-[10px] font-black text-charcoal uppercase tracking-widest mb-1.5 ml-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-5 py-3 rounded-xl border transition-all outline-none text-sm pr-12 ${errors.password ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-mustard'
                  }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-charcoal transition-colors p-1"
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-[10px] mt-1 ml-1 font-bold">{errors.password}</p>}
          </div>

          {isSignUp && (
            <div>
              <label className="block text-[10px] font-black text-charcoal uppercase tracking-widest mb-1.5 ml-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-5 py-3 rounded-xl border transition-all outline-none text-sm pr-12 ${errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-mustard'
                    }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-charcoal transition-colors p-1"
                >
                  <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-[10px] mt-1 ml-1 font-bold">{errors.confirmPassword}</p>}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-6 rounded-xl bg-charcoal text-white font-black uppercase tracking-widest text-xs hover:bg-black transition-all active:scale-95 shadow-lg mt-2"
          >
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : (isSignUp ? 'Create Account' : 'Sign In')}
          </button>
        </form>

        <div className="my-8 flex items-center">
          <div className="flex-grow border-t border-gray-100"></div>
          <span className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Or</span>
          <div className="flex-grow border-t border-gray-100"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isGoogleLoading}
          className="w-full flex items-center justify-center py-4 px-6 border-2 border-gray-100 rounded-xl bg-white text-xs font-bold text-charcoal hover:bg-gray-50 transition-all shadow-sm"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4 mr-3" />
          {isGoogleLoading ? 'Connecting...' : (isSignUp ? 'Sign up with Google' : 'Sign in with Google')}
        </button>

        <p className="mt-10 text-center text-sm text-gray-500">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button
            onClick={() => { setIsSignUp(!isSignUp); setErrors({}); setSuccessMessage(''); }}
            className="ml-2 text-amber-600 font-bold hover:underline"
          >
            {isSignUp ? 'Sign In' : 'Create one'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
