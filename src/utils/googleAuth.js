const googleClientId =
  typeof __ADIRAY_GOOGLE_CLIENT_ID__ !== 'undefined'
    ? __ADIRAY_GOOGLE_CLIENT_ID__
    : '';
const googleScriptSrc = 'https://accounts.google.com/gsi/client';

const getGoogleAccounts = () => window.google && window.google.accounts;

export const isGoogleAuthConfigured = () => Boolean(googleClientId);

const loadGoogleIdentityScript = () => new Promise((resolve, reject) => {
  if (getGoogleAccounts()) {
    resolve(getGoogleAccounts());
    return;
  }

  const existingScript = document.querySelector(`script[src="${googleScriptSrc}"]`);

  if (existingScript) {
    existingScript.addEventListener('load', () => resolve(getGoogleAccounts()), { once: true });
    existingScript.addEventListener('error', () => reject(new Error('Google sign-in could not be loaded.')), { once: true });
    return;
  }

  const script = document.createElement('script');
  script.src = googleScriptSrc;
  script.async = true;
  script.defer = true;
  script.onload = () => resolve(getGoogleAccounts());
  script.onerror = () => reject(new Error('Google sign-in could not be loaded.'));
  document.head.appendChild(script);
});

export const requestGoogleProfile = async () => {
  if (!googleClientId) {
    throw new Error('Google sign-in is not configured.');
  }

  const accounts = await loadGoogleIdentityScript();

  if (!accounts || !accounts.oauth2) {
    throw new Error('Google sign-in is unavailable right now.');
  }

  const tokenResponse = await new Promise((resolve, reject) => {
    const tokenClient = accounts.oauth2.initTokenClient({
      client_id: googleClientId,
      scope: 'openid email profile',
      callback: (response) => {
        if (response.error) {
          reject(new Error(response.error_description || 'Google sign-in was cancelled.'));
          return;
        }

        resolve(response);
      },
      error_callback: () => reject(new Error('Google sign-in was cancelled.')),
    });

    tokenClient.requestAccessToken({ prompt: 'select_account' });
  });

  const profileResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: {
      Authorization: `Bearer ${tokenResponse.access_token}`,
    },
  });

  if (!profileResponse.ok) {
    throw new Error('Google profile could not be loaded.');
  }

  const profile = await profileResponse.json();

  return {
    email: profile.email,
    firstName: profile.given_name || profile.name || profile.email.split('@')[0],
    lastName: profile.family_name || 'User',
    name: profile.name,
    picture: profile.picture,
    googleId: profile.sub,
  };
};
