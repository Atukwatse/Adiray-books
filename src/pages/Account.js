import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AppContext';

const Account = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 w-full overflow-x-hidden">
      <div className="max-w-md mx-auto space-y-6 w-full">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-charcoal uppercase tracking-tighter">
            My <span className="text-gold">Account</span>
          </h1>
          <p className="text-gray-500 text-sm mt-2">Manage your profile and app settings</p>
        </div>

        {/* Card 1: Auth / Profile */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition-all hover:shadow-md">
          <div className="p-4 sm:p-6">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold border-2 border-gold/20">
                  {user?.picture ? (
                    <img src={user.picture} alt="Profile" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <i className="fas fa-user text-2xl"></i>
                  )}
                </div>
                <div className="flex-grow">
                  <h2 className="text-lg font-bold text-charcoal leading-tight">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <p className="text-gray-500 text-sm">{user?.email}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mx-auto mb-4">
                  <i className="fas fa-user-circle text-4xl"></i>
                </div>
                <h2 className="text-lg font-bold text-charcoal mb-4">You are not signed in</h2>
                <button
                  onClick={() => navigate('/login')}
                  className="w-full btn-primary py-3 rounded-xl text-xs font-bold uppercase tracking-widest"
                >
                  Sign In / Register
                </button>
              </div>
            )}
          </div>

          {isAuthenticated && (
            <div className="bg-slate-50/50 p-4 border-t border-slate-100 flex justify-center">
              <button
                onClick={handleLogout}
                className="text-xs font-bold text-red-500 uppercase tracking-widest hover:text-red-600 transition-colors"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>

        {/* Card 2: App Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/30">
            <h3 className="text-xs font-black text-charcoal uppercase tracking-[0.2em]">App Settings</h3>
          </div>

          <div className="divide-y divide-slate-50">
            <Link
              to="/about"
              className="flex items-center justify-between p-4 sm:p-5 hover:bg-slate-50 transition-colors group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center">
                  <i className="fas fa-info-circle text-sm"></i>
                </div>
                <span className="text-sm font-bold text-slate-700">About Us</span>
              </div>
              <i className="fas fa-chevron-right text-slate-300 text-xs group-hover:text-gold group-hover:translate-x-1 transition-all"></i>
            </Link>

            <Link
              to="/privacy-policy"
              className="flex items-center justify-between p-4 sm:p-5 hover:bg-slate-50 transition-colors group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-lg bg-green-50 text-green-500 flex items-center justify-center">
                  <i className="fas fa-shield-alt text-sm"></i>
                </div>
                <span className="text-sm font-bold text-slate-700">Privacy Policy</span>
              </div>
              <i className="fas fa-chevron-right text-slate-300 text-xs group-hover:text-gold group-hover:translate-x-1 transition-all"></i>
            </Link>

            <Link
              to="/help"
              className="flex items-center justify-between p-4 sm:p-5 hover:bg-slate-50 transition-colors group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center">
                  <i className="fas fa-question-circle text-sm"></i>
                </div>
                <span className="text-sm font-bold text-slate-700">Help Center</span>
              </div>
              <i className="fas fa-chevron-right text-slate-300 text-xs group-hover:text-gold group-hover:translate-x-1 transition-all"></i>
            </Link>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center pt-4">
          <p className="text-[10px] text-slate-300 uppercase tracking-widest font-bold">
            Adiray Books v1.0.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default Account;
