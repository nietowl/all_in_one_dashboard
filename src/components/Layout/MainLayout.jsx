import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from './Sidebar';
import { fetchOrganizationData } from '../../store/slices/organizationSlice';

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { sidebarCollapsed } = useSelector(state => state.ui);

  useEffect(() => {
    // Fetch organization data when layout mounts
    if (user?.organizationId) {
      dispatch(fetchOrganizationData());
    }
  }, [dispatch, user?.organizationId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Sidebar />
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'} p-6`}>
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;