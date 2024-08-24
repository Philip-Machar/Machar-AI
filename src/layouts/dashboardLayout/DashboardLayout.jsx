import { Outlet } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboardLayout.css';

const DashboardLayout = () => {
  
  const {userId, isLoaded} = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !userId){
      navigate('/sign-in')
    }
  }, [userId, isLoaded, navigate]);

  if (!isLoaded) return "loading...";

  return (
    <div className="dashboardLayout">
      <div className="menu">MENU</div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout;
