import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MapPin, ExternalLink, Wind, Droplets, Umbrella, Thermometer } from 'lucide-react';

const WeatherDashboard = ({ filteredData = [], stormwaterData = [] }) => {
  const [location, setLocation] = useState('India, IN'); // Default location

  const openGoogleWeather = () => {
    const encodedLocation = encodeURIComponent(`${location} weather`);
    window.open(`https://www.google.com/search?q=${encodedLocation}`, '_blank');
  };

  const currentWeather = filteredData.length > 0 ? filteredData[filteredData.length - 1] : null;

  return (
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

      {/* Temperature History Chart */}
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
  );
};

export default WeatherDashboard;
