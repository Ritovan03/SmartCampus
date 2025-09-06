import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Droplets, Zap, Thermometer, Wind } from 'lucide-react';

const OverviewDashboard = ({ filteredData }) => {
  return (
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
  );
};

export default OverviewDashboard;