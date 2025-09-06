import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Zap } from 'lucide-react';

const EnergyDashboard = ({ filteredData }) => {
  // Calculate average energy usage
  const averageEnergy = filteredData.length > 0 
    ? Math.round(filteredData.reduce((sum, item) => sum + item.energyUsage, 0) / filteredData.length) 
    : 0;
  
  // Get current energy usage
  const currentEnergy = filteredData.length > 0 ? filteredData[filteredData.length - 1].energyUsage : 0;
  
  // Calculate percentage different from average
  const percentageDiff = averageEnergy > 0 
    ? Math.round((currentEnergy - averageEnergy) / averageEnergy * 100) 
    : 0;
  
  return (
    <>
      {/* Energy Summary Card */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-8">
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Current Energy Usage</p>
              <p className="text-2xl font-bold">{currentEnergy} kWh</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Zap className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
          <div className="mt-2">
            <p className={percentageDiff <= 0 ? "text-green-600 text-sm" : "text-red-600 text-sm"}>
              {Math.abs(percentageDiff)}% {percentageDiff <= 0 ? "lower" : "higher"} than average
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Average Energy Usage</p>
              <p className="text-2xl font-bold">{averageEnergy} kWh</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Zap className="h-6 w-6 text-blue-500" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-gray-600 text-sm">
              Based on {filteredData.length} data points
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Projected Monthly Usage</p>
              <p className="text-2xl font-bold">{Math.round(currentEnergy * 30)} kWh</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Zap className="h-6 w-6 text-green-500" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-gray-600 text-sm">
              Based on current consumption
            </p>
          </div>
        </div>
      </div>
      
      {/* Energy Usage Charts */}
      <div className="grid grid-cols-1 gap-6 mb-8">
        {/* Detailed Energy Chart */}
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
      </div>
      
      {/* Energy by Temperature Correlation */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Energy and Temperature Correlation</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" orientation="left" stroke="#F59E0B" />
              <YAxis yAxisId="right" orientation="right" stroke="#EF4444" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="energyUsage" stroke="#F59E0B" name="Energy (kWh)" />
              <Line yAxisId="right" type="monotone" dataKey="temperature" stroke="#EF4444" name="Temperature (°C)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Daily Energy Consumption</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredData.slice(-7)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="energyUsage" fill="#F59E0B" name="Energy (kWh)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Energy Analysis Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Energy Usage Analysis</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Energy (kWh)</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temperature (°C)</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day/Night Ratio</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.slice(-7).map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.energyUsage}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.temperature}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{(Math.random() * 2 + 1).toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EnergyDashboard;