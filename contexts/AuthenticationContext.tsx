import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useSignMessage, useAccount, ConnectorData } from 'wagmi';
// import { useSnackbar } from '@/contexts/SnackbarContext';

interface AuthenticationContextValue {
  accessToken?: string;
  accessTokenExpireTime?: string;
  refreshToken?: string;
  refreshTokenExpireTime?: string;
  isRefreshTokenValid?: boolean;
  isAccessTokenValid?: () => boolean;
  clearCredentials?: () => void;
  setTokens?: (tokens: any) => void;
  isTokenExpired?: (t: string) => boolean;
  checkIsLoggedIn?: () => void;
}

const AuthenticationContext = createContext<AuthenticationContextValue>({});

export const AuthenticationProvider = ({ children }: any) => {
  const [message, setMessage] = useState('');
  const [isRefreshTokenValid, setIsRefreshTokenValid] = useState(false);

  const [accessToken, setAccessToken] = useState('');
  const [accessTokenExpireTime, setAccessTokenExpireTime] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [refreshTokenExpireTime, setRefreshTokenExpireTime] = useState('');

  const { address, isDisconnected, connector: activeConnector } = useAccount();
  const { data: sig, signMessage } = useSignMessage({ message });
  // const { openSnackbar: openErrorSnackbar } = useSnackbar();

  // This is to overcome the rendering time conflict between sever-side and client-side with localstorage
  useEffect(() => {
    if (typeof window !== 'undefined') { // This runs after the component has mounted, on the client side
      const at = localStorage.getItem('accessToken') || '';
      const atet = localStorage.getItem('accessTokenExpireTime') || '';
      const rt = localStorage.getItem('refreshToken') || '';
      const rtet = localStorage.getItem('refreshTokenExpireTime') || '';

      console.log("Using localStorage values ...");
      setAccessToken(at);
      setAccessTokenExpireTime(atet);
      setRefreshToken(rt);
      setRefreshTokenExpireTime(rtet);
    }
  }, []);  // Empty dependency array means this useEffect runs once, similar to componentDidMount

  useEffect(() => {
    const handleConnectorUpdate = ({ account, chain }: ConnectorData) => {
      if (account) {
        console.log('New account detected: ', account);

        // Reset local storage and try to retrieve wallet and webhook data again.
        setMessage('');
        setAccessToken('');
        setRefreshToken('');
      } else if (chain) {
        console.log('New chain detected: ', chain);
      }
    };

    // Set up the event listener
    if (activeConnector) {
      activeConnector.on('change', handleConnectorUpdate);
    }

    // Clean up the event listener
    return () => {
      if (activeConnector) {
        activeConnector.off('change', handleConnectorUpdate);
      }
    };
  }, [activeConnector]); // Dependency array, effect will re-run if activeConnector changes


  const getLoginMessage = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST || ''}/api/auth/login-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);  // Set the fetched message
        // console.log("setMessage = " + data.message);
      } else {
        throw new Error(data.error || 'Failed to fetch login message');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, [address]);

  const getTokens = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST || ''}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sig, address }),
      });
      const data = await response.json();
      if (response.ok) {
        setTokens(data.tokens);
      } else {
        // clearCredentials();
        throw new Error(data.error || 'Failed to fetch login message');
        // openErrorSnackbar('Failed to log in ..');
      }
    } catch (error) {
      console.error('Error:', error);
      // clearCredentials();
      // openErrorSnackbar('Failed to log in ...');
    }
  }, [address, sig]);

  const setTokens = (tokens: any) => {
    const accessToken = tokens.access.token;
    const accessTokenExpireTime = tokens.access.expires;
    const refreshToken = tokens.refresh.token;
    const refreshTokenExpireTime = tokens.refresh.expires;

    console.log("accessToken: " + accessToken);
    console.log("accessTokenExpireTime: " + accessTokenExpireTime);
    console.log("refreshToken: " + refreshToken);
    console.log("refreshTokenExpireTime: " + refreshTokenExpireTime);

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('accessTokenExpireTime', accessTokenExpireTime);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('refreshTokenExpireTime', refreshTokenExpireTime);

    setAccessToken(accessToken);
    setAccessTokenExpireTime(accessTokenExpireTime);
    setRefreshToken(refreshToken);
    setRefreshTokenExpireTime(refreshTokenExpireTime);
  }

  const clearCredentials = () => {
    console.log("Clearing credentials ...");
    // Reset the localStorage and AuthenticationContext
    localStorage.removeItem('accessToken');
    localStorage.removeItem('accessTokenExpireTime');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('refreshTokenExpireTime');

    setMessage('');
    setAccessToken('');
    setAccessTokenExpireTime('');
    setRefreshToken('');
    setRefreshTokenExpireTime('');
  }

  useEffect(() => {
    if (!accessToken) { //  || localStorage.getItem('accessToken') === ''
      if (!message && address) {
        // console.log("getLoginMessage, message = " +message+ ", address = " + address + ", sig = " + sig + "; accessToken: " + accessToken);
        getLoginMessage()
      } else if (sig && address && accessToken === '') {
        // console.log("getAccessToken, message = " +message+ ", address = " + address + ", sig = " + sig);
        getTokens();  // Get the access token once the signature is available
      }
    }

    if (address) {
      // console.log('Connected account:', address);
      localStorage.setItem('userWalletAddress', address);
    }

    if (isDisconnected) {
      console.log("wallet has been disconnected");
      clearCredentials();
    }

  }, [isDisconnected, message, sig, address, accessToken]);

  useEffect(() => {
    if (message && !isRefreshTokenValid) {
      // console.log("signMessage, message = " +message+ ", address = " + address + ", sig = " + sig);
      signMessage();  // Sign the message once it's updated
    }
  }, [message]);

  const isTokenExpired = (t: any) => {
    if (!t) return true;
    const now = new Date();
    const expireationDate = new Date(t);

    // console.log("Checking refreshToken: Current time: " + now + "  expiration time: " + expireationDate);
    return now > expireationDate;
  };

  const isAccessTokenValid = () => {
    const accessTokenExpired = isTokenExpired(accessTokenExpireTime || localStorage.getItem('accessTokenExpireTime'));

    return !!accessToken && !accessTokenExpired;
  }

  useEffect(() => {
    // console.log("*** accessToken: " + accessToken);
    // console.log("*** accessTokenExpireTime: " + accessTokenExpireTime);
    // console.log("*** refreshToken: " + refreshToken);
    // console.log("*** refreshTokenExpireTime: " + refreshTokenExpireTime);
    checkIsLoggedIn();
  }, [refreshToken]);

  // Determine whether user is logged in or not
  const checkIsLoggedIn = () => {
    const isExpired = isTokenExpired(refreshTokenExpireTime);

    console.log("checkIsLoggedIn refreshToken: " + refreshToken);
    if (refreshToken !== '' && !isExpired) {
      console.log("checkIsLoggedIn: " + true);
      setIsRefreshTokenValid(true);
    } else {
      console.log("checkIsLoggedIn: " + false);
      setIsRefreshTokenValid(false);
    }
  };

  const contextValue = {
    accessToken,
    accessTokenExpireTime,
    refreshToken,
    refreshTokenExpireTime,
    isRefreshTokenValid,
    isAccessTokenValid,
    clearCredentials,
    setTokens,
    checkIsLoggedIn,
    isTokenExpired,
  };

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);
  if (context === undefined) {
    throw new Error('useAuthentication must be used within an AuthenticationProvider');
  }
  return context;
};
