import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import CampusMap from './pages/CampusMap';
import DataAnalytics from './pages/DataAnalytics';
import SmartLighting from './pages/SmartLighting';
import BuildingManagement from './pages/BuildingManagement';
import ClassSchedules from './pages/ClassSchedules';
import LibrarySystem from './pages/LibrarySystem';
import StudentPortal from './pages/StudentPortal';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-100">
        <Navbar />
        <div className="flex-1 overflow-auto lg:ml-64">
          <main className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/map" element={<CampusMap />} />
              <Route path="/analytics" element={<DataAnalytics />} />
              <Route path="/lighting" element={<SmartLighting />} />
              <Route path="/building" element={<BuildingManagement />} />
              <Route path="/schedule" element={<ClassSchedules />} />
              <Route path="/library" element={<LibrarySystem />} />
              <Route path="/students" element={<StudentPortal />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;