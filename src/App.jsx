import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

import RootLayout from './layouts/rootLayout/RootLayout';
import DashboardLayout from './layouts/dashboardLayout/DashboardLayout';
import Homepage from './routes/homepage/Homepage';
import DashboardPage from './routes/dashboardPage/DashboardPage';
import ChatPage from './routes/chatPage/ChatPage';
import SignInPage from './routes/signInPage/SignInPage';
import SignUpPage from './routes/signUpPage/SignUpPage';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Homepage />}/>
        <Route path='/sign-in/*' element={<SignInPage />}/>
        <Route path='/sign-up/*' element={<SignUpPage />}/>
        <Route element={<DashboardLayout />}>
          <Route path='/dashboard' element={<DashboardPage />}/>
          <Route path='/dashboard/chats/:id' element={<ChatPage />}/>
        </Route>
      </Route>
    ),
    { basename: '/Machar-AI' } 
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App
