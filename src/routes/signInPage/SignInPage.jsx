import './signInPage.css';
import { SignIn, useClerk } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const { redirectToSignIn } = useClerk();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.search.includes('__clerk_handshake')) {
      navigate('/Machar-AI/dashboard', { replace: true });
    }
  }, [navigate]);

  return (
    <div className='signInPage'>
      <SignIn
        path="/Machar-AI/sign-in"
        signUpUrl="/Machar-AI/sign-up"
        afterSignInUrl="/Machar-AI/dashboard"
      />
    </div>
  );
}

export default SignInPage;
