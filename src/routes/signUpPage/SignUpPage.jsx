import './signUpPage.css'
import { SignUp } from '@clerk/clerk-react'

const SignUpPage = () => {
  return (
    <div className='signUpPage'>
      <SignUp path="/Machar-AI/sign-up" signInUrl="/Machar-AI/sign-in" forceRedirectUrl="/Machar-AI/dashboard/" />
    </div>
  )
}

export default SignUpPage
