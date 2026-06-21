import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AppContext';

const SmsVerification = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleInputChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      document.getElementById(`code-${index - 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join('');
    if (verificationCode.length < 6) {
      setErrors({ code: 'Please enter the full 6-digit code' });
      return;
    }

    setIsLoading(true);
    try {
      // Mock verification - in reality check against backend
      await updateProfile({
        isPhoneVerified: true,
        onboardingStep: 'completed'
      });
      navigate('/');
    } catch (error) {
      setErrors({ general: 'Verification failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    setTimer(30);
    // Logic to resend SMS...
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full bg-white p-8 sm:p-12 border border-gray-100 shadow-2xl rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-500"></div>
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-sms text-emerald-600 text-2xl"></i>
          </div>
          <h2 className="text-3xl font-black text-charcoal mb-2 font-serif uppercase tracking-tight">Verify Your Phone</h2>
          <p className="text-gray-500 font-light text-sm">
            We sent a 6-digit code to <span className="font-bold text-charcoal">{user?.phone || 'your phone'}</span>
          </p>
        </div>

        {errors.general && (
          <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm mb-6">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex justify-between gap-2">
            {code.map((digit, idx) => (
              <input
                key={idx}
                id={`code-${idx}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleInputChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-12 h-14 bg-gray-50 border border-gray-200 rounded-xl text-center text-xl font-bold focus:border-emerald-500 focus:bg-white outline-none transition-all"
                required
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-6 rounded-xl bg-charcoal text-white font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-lg overflow-hidden relative group"
          >
            <span className="relative z-10">{isLoading ? 'Verifying...' : 'Verify & Continue'}</span>
            <div className="absolute inset-0 bg-emerald-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>

          <div className="text-center">
            {timer > 0 ? (
              <p className="text-xs text-gray-400">Resend code in <span className="font-bold text-charcoal">{timer}s</span></p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-xs text-emerald-600 font-bold hover:underline uppercase tracking-widest"
              >
                Resend Code
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SmsVerification;
