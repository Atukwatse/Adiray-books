import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AppContext';

const Profile = () => {
  const { user, updateProfile, changePassword } = useAuth();

  useEffect(() => {
    document.title = "Customer Account Profile | Adiray Books";
  }, []);

  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: PROJECT_PHONE,
    address: '123 Book Street',
    city: 'Reading District',
    state: 'RD',
    zipCode: '12345',
    country: 'United States',
    bio: 'Passionate reader and lifelong learner. Love exploring new genres and discovering hidden gems in literature.',
    favoriteGenres: ['Fiction', 'Technology', 'Business', 'Self-Help'],
    notifications: {
      email: true,
      sms: false,
      newsletter: true,
      newBooks: true,
      recommendations: true,
      promotions: false
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempFormData, setTempFormData] = useState({});
  const [statusMessage, setStatusMessage] = useState('');
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    next: '',
    confirm: ''
  });

  useEffect(() => {
    if (!user) return;
    setFormData(prev => ({
      ...prev,
      firstName: user.firstName || prev.firstName,
      lastName: user.lastName || prev.lastName,
      email: user.email || prev.email
    }));
  }, [user]);

  const handleEdit = () => {
    setTempFormData(formData);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(tempFormData);
    setIsEditing(false);
  };

  const handleSave = async () => {
    setIsEditing(false);
    await updateProfile({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email
    });
    setStatusMessage('Profile saved successfully.');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleGenreToggle = (genre) => {
    setFormData(prev => ({
      ...prev,
      favoriteGenres: prev.favoriteGenres.includes(genre)
        ? prev.favoriteGenres.filter(g => g !== genre)
        : [...prev.favoriteGenres, genre]
    }));
  };

  const handleSavePreferences = () => {
    localStorage.setItem('adiray_profile_preferences', JSON.stringify({
      favoriteGenres: formData.favoriteGenres,
      notifications: formData.notifications
    }));
    setStatusMessage('Preferences saved.');
  };

  const handlePasswordUpdate = async () => {
    if (!passwordForm.current || !passwordForm.next || !passwordForm.confirm) {
      setStatusMessage('Complete all password fields.');
      return;
    }

    if (passwordForm.next !== passwordForm.confirm) {
      setStatusMessage('New passwords do not match.');
      return;
    }

    try {
      await changePassword(passwordForm.current, passwordForm.next);
      setPasswordForm({ current: '', next: '', confirm: '' });
      setStatusMessage('Password updated successfully.');
    } catch (error) {
      setStatusMessage(error.message || 'Password update failed.');
    }
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: 'fa-user' },
    { id: 'reading', label: 'Reading Preferences', icon: 'fa-book' },
    { id: 'notifications', label: 'Notifications', icon: 'fa-bell' },
    { id: 'security', label: 'Security', icon: 'fa-lock' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">


      {/* Profile Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {statusMessage && (
            <div className="mb-4 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg text-sm">
              {statusMessage}
            </div>
          )}

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-amber-200">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-8" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-amber-500 text-amber-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <i className={`fas ${tab.icon} mr-2`}></i>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {/* Personal Information Tab */}
              {activeTab === 'personal' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      disabled={!isEditing}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:bg-gray-50"
                    ></textarea>
                  </div>

                  {isEditing && (
                    <div className="flex space-x-4">
                      <button
                        onClick={handleSave}
                        className="bg-amber-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-amber-800 transition-colors"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Reading Preferences Tab */}
              {activeTab === 'reading' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Reading Preferences</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Favorite Genres
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {['Fiction', 'Non-Fiction', 'Technology', 'Business', 'Self-Help', 'Mystery', 'Romance', 'Science Fiction', 'Biography'].map(genre => (
                        <label key={genre} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.favoriteGenres.includes(genre)}
                            onChange={() => handleGenreToggle(genre)}
                            className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                          />
                          <span className="text-gray-700">{genre}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Reading Format
                      </label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                        <option>Physical Books</option>
                        <option>E-books</option>
                        <option>Audiobooks</option>
                        <option>No Preference</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reading Frequency
                      </label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                        <option>Occasionally</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Favorite Authors
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your favorite authors (comma separated)"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>

                  <button
                    onClick={handleSavePreferences}
                    className="bg-amber-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-amber-800 transition-colors"
                  >
                    Save Preferences
                  </button>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h3>
                  
                  <div className="space-y-4">
                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <p className="font-medium text-gray-900">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive updates via email</p>
                      </div>
                      <input
                        type="checkbox"
                        name="notifications.email"
                        checked={formData.notifications.email}
                        onChange={handleChange}
                        className="w-5 h-5 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <p className="font-medium text-gray-900">SMS Notifications</p>
                        <p className="text-sm text-gray-500">Receive text message updates</p>
                      </div>
                      <input
                        type="checkbox"
                        name="notifications.sms"
                        checked={formData.notifications.sms}
                        onChange={handleChange}
                        className="w-5 h-5 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <p className="font-medium text-gray-900">Newsletter</p>
                        <p className="text-sm text-gray-500">Weekly newsletter with recommendations</p>
                      </div>
                      <input
                        type="checkbox"
                        name="notifications.newsletter"
                        checked={formData.notifications.newsletter}
                        onChange={handleChange}
                        className="w-5 h-5 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <p className="font-medium text-gray-900">New Book Arrivals</p>
                        <p className="text-sm text-gray-500">Get notified when new books arrive</p>
                      </div>
                      <input
                        type="checkbox"
                        name="notifications.newBooks"
                        checked={formData.notifications.newBooks}
                        onChange={handleChange}
                        className="w-5 h-5 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <p className="font-medium text-gray-900">Personalized Recommendations</p>
                        <p className="text-sm text-gray-500">Book suggestions based on your preferences</p>
                      </div>
                      <input
                        type="checkbox"
                        name="notifications.recommendations"
                        checked={formData.notifications.recommendations}
                        onChange={handleChange}
                        className="w-5 h-5 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <p className="font-medium text-gray-900">Promotions & Discounts</p>
                        <p className="text-sm text-gray-500">Special offers and sales notifications</p>
                      </div>
                      <input
                        type="checkbox"
                        name="notifications.promotions"
                        checked={formData.notifications.promotions}
                        onChange={handleChange}
                        className="w-5 h-5 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                      />
                    </label>
                  </div>

                  <button
                    onClick={handleSavePreferences}
                    className="bg-amber-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-amber-800 transition-colors"
                  >
                    Update Notifications
                  </button>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Change Password</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Current Password
                          </label>
                          <input
                            type="password"
                            value={passwordForm.current}
                            onChange={(e) => setPasswordForm(prev => ({ ...prev, current: e.target.value }))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            New Password
                          </label>
                          <input
                            type="password"
                            value={passwordForm.next}
                            onChange={(e) => setPasswordForm(prev => ({ ...prev, next: e.target.value }))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            value={passwordForm.confirm}
                            onChange={(e) => setPasswordForm(prev => ({ ...prev, confirm: e.target.value }))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          />
                        </div>
                        <button
                          onClick={handlePasswordUpdate}
                          className="bg-amber-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-amber-800 transition-colors"
                        >
                          Update Password
                        </button>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Two-Factor Authentication</h4>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Enable 2FA</p>
                          <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                        </div>
                        <button
                          onClick={() => setStatusMessage('Two-factor authentication setup is not available in this backend yet.')}
                          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                        >
                          Enable
                        </button>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Login Activity</h4>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Current Session</p>
                            <p className="text-sm text-gray-500">Chrome on Windows • Last active: 2 minutes ago</p>
                          </div>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                            Active
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
