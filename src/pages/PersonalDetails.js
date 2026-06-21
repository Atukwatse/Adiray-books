import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AppContext';

const PersonalDetails = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.phone.trim()) {
      setErrors({ phone: 'Phone number is required for verification' });
      return;
    }

    setIsLoading(true);
    try {
      await updateProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        onboardingStep: 'sms-verification'
      });
      navigate('/onboarding/verify-sms');
    } catch (error) {
      setErrors({ general: 'Failed to save details. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full bg-white p-8 sm:p-12 border border-gray-100 shadow-2xl rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gold"></div>
        
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-charcoal mb-2 font-serif uppercase tracking-tight">Personal Details</h2>
          <p className="text-gray-500 font-light">Let's get to know you better</p>
        </div>

        {errors.general && (
          <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm mb-6">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-charcoal uppercase tracking-widest mb-1.5 ml-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-gold outline-none text-sm transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-charcoal uppercase tracking-widest mb-1.5 ml-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-gold outline-none text-sm transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-charcoal uppercase tracking-widest mb-1.5 ml-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+256 700 000 000"
              className={`w-full px-5 py-3 rounded-xl border outline-none text-sm transition-all ${
                errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-gold'
              }`}
              required
            />
            {errors.phone && <p className="text-red-500 text-[10px] mt-1 ml-1 font-bold">{errors.phone}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-6 rounded-xl bg-charcoal text-white font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-lg overflow-hidden relative group"
          >
            <span className="relative z-10">{isLoading ? 'Saving...' : 'Continue'}</span>
            <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default PersonalDetails;
