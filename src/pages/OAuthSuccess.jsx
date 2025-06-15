import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const OAuthSuccess = ({ onLogin }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      onLogin(token);
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [searchParams, onLogin, navigate]);

  return <p>Logging you in...</p>;
};

export default OAuthSuccess;
