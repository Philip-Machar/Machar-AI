import './signInPage.css';
import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => {
  return (
    <div className='signInPage'>
      <SignIn path="/Machar-AI/sign-in" signUpUrl="/Machar-AI/sign-up" />
    </div>
  )
}

export default SignInPage;
