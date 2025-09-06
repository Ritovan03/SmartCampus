import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, Filter, Droplets, Zap, Thermometer, Wind, Cloud, Umbrella, MapPin, ExternalLink } from 'lucide-react';

// Sample data (In a real app, this would come from your API)
const generateSampleData = (days = 14) => {
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

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState('7d');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [location, setLocation] = useState('India, IN'); // Default location

  useEffect(() => {
    // Simulate API data fetching
    setTimeout(() => {
      const sampleData = generateSampleData(30);
      setData(sampleData);
      filterData(sampleData, dateRange);
      setLoading(false);
    }, 1000);
  }, []);

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

  const openGoogleWeather = () => {
    // URL encode the location for Google search
    const encodedLocation = encodeURIComponent(`${location} weather`);
    window.open(`https://www.google.com/search?q=${encodedLocation}`, '_blank');
  };

  const getCurrentWeatherData = () => {
    // Return the most recent weather data
    return filteredData.length > 0 ? filteredData[filteredData.length - 1] : null;
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

  const currentWeather = getCurrentWeatherData();

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
            <button 
              className={`px-3 py-2 text-sm font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`px-3 py-2 text-sm font-medium ${activeTab === 'energy' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
              onClick={() => setActiveTab('energy')}
            >
              Energy
            </button>
            <button 
              className={`px-3 py-2 text-sm font-medium ${activeTab === 'water' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
              onClick={() => setActiveTab('water')}
            >
              Water
            </button>
            <button 
              className={`px-3 py-2 text-sm font-medium ${activeTab === 'weather' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
              onClick={() => setActiveTab('weather')}
            >
              Weather
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {activeTab === 'weather' ? (
          // Weather Tab Content
          <div>
            {/* Location and External Link */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-red-500 mr-2" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="border-gray-300 border rounded-md px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your location"
                />
              </div>
              <button
                onClick={openGoogleWeather}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
              >
                Open Google Weather <ExternalLink className="h-4 w-4 ml-2" />
              </button>
            </div>

            {/* Current Weather Display */}
            {currentWeather && (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Current Weather</h2>
                    <p className="text-gray-500 flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" /> {location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-bold text-gray-900">{currentWeather.temperature}°C</p>
                    <p className="text-lg text-gray-600">{currentWeather.weatherCondition}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <Wind className="h-6 w-6 text-blue-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Wind Speed</p>
                        <p className="text-xl font-semibold">{currentWeather.windSpeed} km/h</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <Droplets className="h-6 w-6 text-blue-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Humidity</p>
                        <p className="text-xl font-semibold">{currentWeather.humidity}%</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <Umbrella className="h-6 w-6 text-blue-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Precipitation</p>
                        <p className="text-xl font-semibold">{currentWeather.precipitation}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Weather History Graph */}
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <h2 className="text-lg font-medium mb-4">Temperature History</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="temperature" stroke="#EF4444" name="Temperature (°C)" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Other Weather Metrics */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-medium mb-4">Wind Speed History</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="windSpeed" stroke="#8B5CF6" name="Wind (km/h)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-medium mb-4">Humidity History</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="humidity" stroke="#3B82F6" name="Humidity (%)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ) : (
          // Original Dashboard Content
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
              {/* Energy Card */}
              <div className="bg-white rounded-lg shadow p-5">
                <div className="flex justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Energy Consumption</p>
                    <p className="text-2xl font-bold">
                      {filteredData.length > 0 ? filteredData[filteredData.length - 1].energyUsage : 0} kWh
                    </p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <Zap className="h-6 w-6 text-yellow-500" />
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-green-600 text-sm">
                    {Math.round(Math.random() * 5 + 1)}% lower than usual
                  </p>
                </div>
              </div>

              {/* Water Card */}
              <div className="bg-white rounded-lg shadow p-5">
                <div className="flex justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Water Consumption</p>
                    <p className="text-2xl font-bold">
                      {filteredData.length > 0 ? filteredData[filteredData.length - 1].waterUsage : 0} L
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Droplets className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-red-600 text-sm">
                    {Math.round(Math.random() * 5 + 1)}% higher than usual
                  </p>
                </div>
              </div>

              {/* Temperature Card */}
              <div className="bg-white rounded-lg shadow p-5">
                <div className="flex justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Temperature</p>
                    <p className="text-2xl font-bold">
                      {filteredData.length > 0 ? filteredData[filteredData.length - 1].temperature : 0}°C
                    </p>
                  </div>
                  <div className="bg-red-100 p-3 rounded-full">
                    <Thermometer className="h-6 w-6 text-red-500" />
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-gray-600 text-sm">
                    Current conditions
                  </p>
                </div>
              </div>

              {/* Wind Speed Card */}
              <div className="bg-white rounded-lg shadow p-5">
                <div className="flex justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Wind Speed</p>
                    <p className="text-2xl font-bold">
                      {filteredData.length > 0 ? filteredData[filteredData.length - 1].windSpeed : 0} km/h
                    </p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Wind className="h-6 w-6 text-purple-500" />
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-gray-600 text-sm">
                    Current conditions
                  </p>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-8">
              {/* Energy Usage Chart */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-medium mb-4">Energy Consumption Trend</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="energyUsage" stroke="#F59E0B" name="Energy (kWh)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Water Usage Chart */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-medium mb-4">Water Consumption Trend</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="waterUsage" stroke="#3B82F6" name="Water (L)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Weather and Consumption Correlation */}
            <div className="bg-white p-6 rounded-lg shadow mb-8">
              <h2 className="text-lg font-medium mb-4">Weather and Resource Consumption Correlation</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" orientation="left" stroke="#3B82F6" />
                  <YAxis yAxisId="right" orientation="right" stroke="#F59E0B" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="waterUsage" fill="#3B82F6" name="Water (L)" />
                  <Bar yAxisId="right" dataKey="energyUsage" fill="#F59E0B" name="Energy (kWh)" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Usage Analysis */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-medium mb-4">Resource Usage Analysis</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Energy (kWh)</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Water (L)</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temperature (°C)</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wind (km/h)</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.slice(-7).map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.energyUsage}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.waterUsage}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.temperature}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.windSpeed}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;