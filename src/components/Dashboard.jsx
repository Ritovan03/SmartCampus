import React, { useState, useEffect } from 'react';
import { Calendar, Filter } from 'lucide-react';
import EnergyDashboard from './EnergyDashboard';
import WaterDashboard from './WaterDashboard';
import WeatherDashboard from './WeatherDashboard';
import OverviewDashboard from './OverviewDashboard';

// Sample data generator (In a real app, this would come from your API)
export const generateSampleData = (days = 14) => {
  const data = [];
  const now = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    data.unshift({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      timestamp: date.getTime(),
      waterUsage: Math.round(Math.random() * 100 + 150),
      energyUsage: Math.round(Math.random() * 50 + 20),
      temperature: Math.round((Math.random() * 15 + 15) * 10) / 10,
      humidity: Math.round(Math.random() * 30 + 40),
      windSpeed: Math.round(Math.random() * 20 + 5),
      weatherCondition: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Rainy'][Math.floor(Math.random() * 5)],
      precipitation: Math.round(Math.random() * 60)
    });
  }
  
  return data;
};

export const generateStormwaterData = (days = 14) => {
  const data = [];
  const now = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    data.unshift({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      timestamp: date.getTime(),
      level: Math.round(Math.random() * 100 + 50), // Water level in cm (range 50-150cm)
      motorStatus: Math.random() > 0.5 ? 'ON' : 'OFF' // Random ON/OFF status
    });
  }

  return data;
};

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState('7d');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [stormwaterData, setStormwaterData] = useState([]);
  const waterQualityData = [
    { serial: 1, date: '17-02-2025', time: '23:59:25', device: 'IIIT water quality', batv: 3.936, dissolved_oxygen: 8.21, ph: 7.84, turbidity: 97.9 },
    { serial: 2, date: '17-02-2025', time: '23:39:25', device: 'IIIT water quality', batv: 3.936, dissolved_oxygen: 7.88, ph: 7.84, turbidity: 97.5 },
    { serial: 3, date: '17-02-2025', time: '23:19:26', device: 'IIIT water quality', batv: 3.936, dissolved_oxygen: 7.91, ph: 7.85, turbidity: 97.2 },
    { serial: 4, date: '17-02-2025', time: '22:59:26', device: 'IIIT water quality', batv: 3.936, dissolved_oxygen: 8.05, ph: 7.83, turbidity: 95.3 },
    { serial: 5, date: '17-02-2025', time: '22:39:26', device: 'IIIT water quality', batv: 3.936, dissolved_oxygen: 7.81, ph: 7.82, turbidity: 94.3 },
    { serial: 6, date: '17-02-2025', time: '22:19:27', device: 'IIIT water quality', batv: 3.936, dissolved_oxygen: 7.73, ph: 7.83, turbidity: 94.0 },
    { serial: 7, date: '17-02-2025', time: '21:59:27', device: 'IIIT water quality', batv: 3.942, dissolved_oxygen: 7.7, ph: 7.83, turbidity: 93.0 },
    { serial: 8, date: '17-02-2025', time: '21:39:27', device: 'IIIT water quality', batv: 3.942, dissolved_oxygen: 7.64, ph: 7.83, turbidity: 92.4 },
    { serial: 9, date: '17-02-2025', time: '21:19:28', device: 'IIIT water quality', batv: 3.942, dissolved_oxygen: 7.7, ph: 7.83, turbidity: 92.4 },
    { serial: 10, date: '17-02-2025', time: '20:59:28', device: 'IIIT water quality', batv: 3.948, dissolved_oxygen: 7.74, ph: 7.82, turbidity: 99.1 },
    { serial: 11, date: '17-02-2025', time: '20:39:28', device: 'IIIT water quality', batv: 3.948, dissolved_oxygen: 7.76, ph: 7.82, turbidity: 91.1 },
    { serial: 12, date: '17-02-2025', time: '20:19:29', device: 'IIIT water quality', batv: 3.942, dissolved_oxygen: 7.76, ph: 7.82, turbidity: 94.0 },
    { serial: 13, date: '17-02-2025', time: '19:59:29', device: 'IIIT water quality', batv: 3.942, dissolved_oxygen: 7.75, ph: 7.82, turbidity: 90.2 },
    { serial: 14, date: '17-02-2025', time: '19:39:29', device: 'IIIT water quality', batv: 3.948, dissolved_oxygen: 7.79, ph: 7.81, turbidity: 90.5 },
    { serial: 15, date: '17-02-2025', time: '19:19:30', device: 'IIIT water quality', batv: 3.948, dissolved_oxygen: 7.83, ph: 7.81, turbidity: 90.8 },
    { serial: 16, date: '17-02-2025', time: '18:59:30', device: 'IIIT water quality', batv: 3.948, dissolved_oxygen: 7.81, ph: 7.8, turbidity: 88.9 },
    { serial: 17, date: '17-02-2025', time: '18:39:30', device: 'IIIT water quality', batv: 3.948, dissolved_oxygen: 7.8, ph: 7.81, turbidity: 87.9 },
    { serial: 18, date: '17-02-2025', time: '18:19:31', device: 'IIIT water quality', batv: 3.948, dissolved_oxygen: 7.76, ph: 7.8, turbidity: 88.2 },
    { serial: 19, date: '17-02-2025', time: '17:59:31', device: 'IIIT water quality', batv: 3.948, dissolved_oxygen: 7.47, ph: 7.79, turbidity: 88.2 },
    { serial: 20, date: '17-02-2025', time: '17:39:31', device: 'IIIT water quality', batv: 3.948, dissolved_oxygen: 7.65, ph: 7.79, turbidity: 87.6 },
    { serial: 21, date: '17-02-2025', time: '17:19:31', device: 'IIIT water quality', batv: 3.954, dissolved_oxygen: 7.56, ph: 7.79, turbidity: 86.9 },
    { serial: 22, date: '17-02-2025', time: '16:59:32', device: 'IIIT water quality', batv: 3.954, dissolved_oxygen: 7.48, ph: 7.8, turbidity: 86.6 },
    { serial: 23, date: '17-02-2025', time: '16:39:32', device: 'IIIT water quality', batv: 3.948, dissolved_oxygen: 7.45, ph: 7.82, turbidity: 87.9 },
    { serial: 24, date: '17-02-2025', time: '16:19:32', device: 'IIIT water quality', batv: 3.948, dissolved_oxygen: 7.4, ph: 7.78, turbidity: 87.6 },
    { serial: 25, date: '17-02-2025', time: '15:59:33', device: 'IIIT water quality', batv: 3.954, dissolved_oxygen: 7.34, ph: 7.78, turbidity: 87.6 },
    { serial: 26, date: '17-02-2025', time: '15:39:33', device: 'IIIT water quality', batv: 3.954, dissolved_oxygen: 7.31, ph: 7.78, turbidity: 88.9 }
  ];

  // ✅ **Fix: Use a Single `useEffect` to Fetch Data**
  useEffect(() => {
    setTimeout(() => {
      const sampleData = generateSampleData(30);
      const stormData = generateStormwaterData(30);
      
      setData(sampleData);
      setStormwaterData(stormData);
      filterData(sampleData, dateRange);
      setLoading(false);
    }, 1000);
  }, [dateRange]);

  const filterData = (data, range) => {
    const now = new Date().getTime();
    let filtered;
    
    switch(range) {
      case '1d':
        filtered = data.filter(item => (now - item.timestamp) < 24 * 60 * 60 * 1000);
        break;
      case '7d':
        filtered = data.filter(item => (now - item.timestamp) < 7 * 24 * 60 * 60 * 1000);
        break;
      case '14d':
        filtered = data.filter(item => (now - item.timestamp) < 14 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        filtered = data;
        break;
      default:
        filtered = data.filter(item => (now - item.timestamp) < 7 * 24 * 60 * 60 * 1000);
    }
    
    setFilteredData(filtered);
  };

  const handleRangeChange = (range) => {
    setDateRange(range);
    filterData(data, range);
  };

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-700">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* Page Header */}
      <div className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-5 w-5 mr-2" />
              <span>Last updated: {new Date().toLocaleString()}</span>
            </div>
            <div className="relative">
              <select 
                className="appearance-none bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                value={dateRange}
                onChange={(e) => handleRangeChange(e.target.value)}
              >
                <option value="1d">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="14d">Last 14 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <Filter className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-4">
            {['overview', 'energy', 'water', 'weather'].map((tab) => (
              <button
                key={tab}
                className={`px-3 py-2 text-sm font-medium ${
                  activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {activeTab === 'overview' && <OverviewDashboard filteredData={filteredData} />}
        {activeTab === 'energy' && <EnergyDashboard filteredData={filteredData} />}
        {activeTab === 'water' && <WaterDashboard filteredData={filteredData} waterQualityData={waterQualityData} stormwaterData={stormwaterData}/>}
        {activeTab === 'weather' && <WeatherDashboard filteredData={filteredData}  />}
      </div>
    </div>
  );
};

export default Dashboard;
