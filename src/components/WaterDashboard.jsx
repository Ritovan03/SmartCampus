import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Droplets, Power, Thermometer, Beaker } from 'lucide-react';

const WaterDashboard = ({ filteredData = [], stormwaterData = [], waterQualityData = [] }) => {
  // Ensure data is defined before using it
  const safeFilteredData = Array.isArray(filteredData) ? filteredData : [];
  const safeStormwaterData = Array.isArray(stormwaterData) ? stormwaterData : [];
  const safeWaterQualityData = Array.isArray(waterQualityData) ? waterQualityData : [];

  // Calculate average water usage
  const averageWater =
    safeFilteredData.length > 0
      ? Math.round(safeFilteredData.reduce((sum, item) => sum + item.waterUsage, 0) / safeFilteredData.length)
      : 0;

  // Get current water usage
  const currentWater = safeFilteredData.length > 0 ? safeFilteredData[safeFilteredData.length - 1].waterUsage : 0;

  // Calculate percentage difference from average
  const percentageDiff = averageWater > 0 ? Math.round(((currentWater - averageWater) / averageWater) * 100) : 0;

  // Water usage breakdown data for pie chart
  const waterBreakdownData = [
    { name: 'BH1', value: 12 },
    { name: 'BH2', value: 18 },
    { name: 'BH3', value: 7 },
    { name: 'BH4', value: 15 },
    { name: 'Mess1', value: 10 },
    { name: 'Mess2', value: 8 },
    { name: 'Academic Block', value: 14 },
    { name: 'Garden', value: 9 },
    { name: 'Other', value: 7 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#d88484', '#8dd1e1'];

  // Get latest Stormwater Well Data
  const latestStormwater = safeStormwaterData.length > 0
    ? safeStormwaterData[safeStormwaterData.length - 1]
    : { level: 0, motorStatus: 'OFF' };

  // Get latest water quality data
  const latestQuality = safeWaterQualityData.length > 0 
    ? safeWaterQualityData[0] 
    : { dissolved_oxygen: 0, ph: 0, turbidity: 0 };

  // Calculate average water quality metrics
  const avgDissolvedOxygen = safeWaterQualityData.length > 0
    ? (safeWaterQualityData.reduce((sum, item) => sum + parseFloat(item.dissolved_oxygen), 0) / safeWaterQualityData.length).toFixed(2)
    : 0;
  
  const avgPh = safeWaterQualityData.length > 0
    ? (safeWaterQualityData.reduce((sum, item) => sum + parseFloat(item.ph), 0) / safeWaterQualityData.length).toFixed(2)
    : 0;
  
  const avgTurbidity = safeWaterQualityData.length > 0
    ? (safeWaterQualityData.reduce((sum, item) => sum + parseFloat(item.turbidity), 0) / safeWaterQualityData.length).toFixed(1)
    : 0;

  // Format time for chart display
  const formattedQualityData = safeWaterQualityData.map(item => {
    // Extract time from the datetime string
    const timePart = item.time ? item.time.split(' ')[1] : '';
    return {
      ...item,
      displayTime: timePart
    };
  }).reverse();

  return (
    <>
      {/* Water Summary Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-8">
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Current Water Usage</p>
              <p className="text-2xl font-bold">{currentWater} L</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Droplets className="h-6 w-6 text-blue-500" />
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
              <p className="text-gray-500 text-sm">Average Water Usage</p>
              <p className="text-2xl font-bold">{averageWater} L</p>
            </div>
            <div className="bg-indigo-100 p-3 rounded-full">
              <Droplets className="h-6 w-6 text-indigo-500" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-gray-600 text-sm">
              Based on {safeFilteredData.length} data points
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Projected Monthly Usage</p>
              <p className="text-2xl font-bold">{Math.round(currentWater * 30)} L</p>
            </div>
            <div className="bg-cyan-100 p-3 rounded-full">
              <Droplets className="h-6 w-6 text-cyan-500" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-gray-600 text-sm">Based on current consumption</p>
          </div>
        </div>
      </div>

      {/* Water Quality Summary Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-8">
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Dissolved Oxygen</p>
              <p className="text-2xl font-bold">{latestQuality.dissolved_oxygen} mg/L</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Droplets className="h-6 w-6 text-green-500" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-gray-600 text-sm">
              Avg: {avgDissolvedOxygen} mg/L
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">pH Level</p>
              <p className="text-2xl font-bold">{latestQuality.ph}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Beaker className="h-6 w-6 text-purple-500" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-gray-600 text-sm">
              Avg: {avgPh} (ideal: 6.5-8.5)
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Turbidity</p>
              <p className="text-2xl font-bold">{latestQuality.turbidity} NTU</p>
            </div>
            <div className="bg-amber-100 p-3 rounded-full">
              <Thermometer className="h-6 w-6 text-amber-500" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-gray-600 text-sm">
              Avg: {avgTurbidity} NTU
            </p>
          </div>
        </div>
      </div>

      {/* Water Usage Charts */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-lg font-medium mb-4">Water Consumption Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={safeFilteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="waterUsage" stroke="#3B82F6" name="Water (L)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Water Quality Charts */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-lg font-medium mb-4">Water Quality Metrics (Feb 17, 2025)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formattedQualityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="displayTime" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" domain={[6, 9]} />
            <YAxis yAxisId="right2" orientation="right" hide={true} />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="dissolved_oxygen" stroke="#00C49F" name="Dissolved Oxygen (mg/L)" />
            <Line yAxisId="right" type="monotone" dataKey="ph" stroke="#8884d8" name="pH" />
            <Line yAxisId="right2" type="monotone" dataKey="turbidity" stroke="#FF8042" name="Turbidity (NTU)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Smart Stormwater Well Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-lg font-medium mb-4">Smart Stormwater Well</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Water Level in the Well */}
          <div className="bg-gray-50 p-5 rounded-lg flex items-center">
            <Droplets className="h-6 w-6 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Water Level in Well</p>
              <p className="text-2xl font-bold">{latestStormwater.level} cm</p>
            </div>
          </div>

          {/* Motor Status */}
          <div className="bg-gray-50 p-5 rounded-lg flex items-center">
            <Power className={`h-6 w-6 mr-3 ${latestStormwater.motorStatus === "ON" ? "text-green-500" : "text-red-500"}`} />
            <div>
              <p className="text-sm text-gray-500">Motor Status</p>
              <p className={`text-2xl font-bold ${latestStormwater.motorStatus === "ON" ? "text-green-600" : "text-red-600"}`}>
                {latestStormwater.motorStatus}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Water Quality Details Table */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-lg font-medium mb-4">Water Quality Readings</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dissolved Oxygen</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">pH</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Turbidity</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Battery</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {safeWaterQualityData.slice(0, 10).map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.dissolved_oxygen} mg/L</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.ph}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.turbidity} NTU</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.batv} V</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Water Usage Breakdown */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Water Usage by Category</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={waterBreakdownData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
              {waterBreakdownData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default WaterDashboard;