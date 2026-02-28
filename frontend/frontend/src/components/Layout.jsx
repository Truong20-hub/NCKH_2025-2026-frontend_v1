import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import React, {useState} from 'react';

const Layout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  return (
    <div className="flex h-screen bg-[#F8FAFC]"> 
      <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 no-scrollbar">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};
export default Layout;