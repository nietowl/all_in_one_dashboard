import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from './Sidebar';
import GlassPanel from '../UI/GlassPanel';
import { fetchOrganizationData } from '../../store/slices/organizationSlice';

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [sidebarWidth, setSidebarWidth] = useState(320); // Default width for new sidebar

  useEffect(() => {
    // Fetch organization data when layout mounts
    if (user?.organizationId) {
      dispatch(fetchOrganizationData());
    }
  }, [dispatch, user?.organizationId]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full z-50">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div
        className="transition-all duration-300 relative z-10"
        style={{ marginLeft: sidebarWidth }}
      >
        <div className="min-h-screen p-6">

          {/* Main Content Area */}
          <div className="relative">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;