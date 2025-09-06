import React, { useState } from 'react';
import { Home, ArrowLeft, Lightbulb, User } from 'lucide-react';

function BuildingManagement() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  
  const floors = [
    {
      id: 'basement',
      name: 'Basement',
      rooms: [
        { id: 'B1', name: 'Room B1' },
        { id: 'B2', name: 'Room B2' },
        { id: 'B3', name: 'Room B3' },
        { id: 'B4', name: 'Room B4' },
        { id: 'B5', name: 'Room B5' }
      ]
    },
    {
      id: 'ground',
      name: 'Ground Floor',
      rooms: [
        { id: 'G1', name: 'Room G1' },
        { id: 'G2', name: 'Room G2' },
        { id: 'G3', name: 'Room G3' },
        { id: 'G4', name: 'Room G4' },
        { id: 'G5', name: 'Room G5' },
        { id: 'G6', name: 'Room G6' },
        { id: 'G7', name: 'Room G7' },
        { id: 'G8', name: 'Room G8' },
        { id: 'G9', name: 'Room G9' },
        { id: 'library', name: 'Library' },
        { id: 'academicOffice', name: 'Academic Office' }
      ]
    },
    {
      id: 'first',
      name: '1st Floor',
      rooms: [
        { id: '11', name: 'Room 11' },
        { id: '12', name: 'Room 12' },
        { id: '13', name: 'Room 13' },
        { id: '14', name: 'Room 14' },
        { id: '15', name: 'Room 15' },
        { id: '16', name: 'Room 16' },
        { id: '17', name: 'Room 17' },
        { id: '18', name: 'Room 18' },
        { id: '19', name: 'Room 19' },
        { id: '110', name: 'Room 110' },
        { id: '111', name: 'Room 111' }
      ]
    },
    {
      id: 'second',
      name: '2nd Floor (Faculty Cabins)',
      rooms: [
        { id: 'f1', name: 'Dr. Anushree' },
        { id: 'f2', name: 'Dr. Bhimappa' },
        { id: 'f3', name: 'Dr. Neha' },
        { id: 'f4', name: 'Dr. OV' },
        { id: 'f5', name: 'Dr. Rajendra' },
        { id: 'f6', name: 'Dr. Hrishikeshvar' },
        { id: 'f7', name: 'Dr. Kamalakant' },
        { id: 'f8', name: 'Dr. Piyush' },
        { id: 'director', name: 'Director\'s Office' }
      ]
    }
  ];

  // Simulated energy data for demo purposes
  const generateEnergyData = (roomId) => {
    return {
      currentUsage: Math.floor(Math.random() * 20) + 5, // kWh
      dailyUsage: Math.floor(Math.random() * 100) + 50, // kWh
      weeklyUsage: Math.floor(Math.random() * 500) + 300, // kWh
      temperature: Math.floor(Math.random() * 5) + 20, // °C
      humidity: Math.floor(Math.random() * 30) + 40, // %
      occupancy: Math.random() > 0.5 ? 'Occupied' : 'Vacant',
      lights: Math.random() > 0.5 ? 'On' : 'Off',
      ac: Math.random() > 0.5 ? 'On' : 'Off'
    };
  };

  const handleRoomClick = (room) => {
    const roomData = {
      ...room,
      energyData: generateEnergyData(room.id)
    };
    setSelectedRoom(roomData);
  };

  const goBack = () => {
    setSelectedRoom(null);
  };

  if (selectedRoom) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-6 flex items-center">
          <button 
            onClick={goBack} 
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Building Overview
          </button>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white p-4">
            <h2 className="text-2xl font-bold">{selectedRoom.name} Energy Dashboard</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Current Energy Usage */}
              <div className="bg-blue-50 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Current Usage</h3>
                <div className="flex items-center">
                  <Lightbulb className="text-yellow-500 mr-2" size={24} />
                  <span className="text-3xl font-bold">{selectedRoom.energyData.currentUsage} kWh</span>
                </div>
              </div>
              
              {/* Daily Usage */}
              <div className="bg-green-50 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Daily Usage</h3>
                <div className="text-3xl font-bold">{selectedRoom.energyData.dailyUsage} kWh</div>
              </div>
              
              {/* Weekly Usage */}
              <div className="bg-purple-50 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Weekly Usage</h3>
                <div className="text-3xl font-bold">{selectedRoom.energyData.weeklyUsage} kWh</div>
              </div>
              
              {/* Temperature */}
              <div className="bg-red-50 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Temperature</h3>
                <div className="text-3xl font-bold">{selectedRoom.energyData.temperature}°C</div>
              </div>
              
              {/* Humidity */}
              <div className="bg-blue-50 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Humidity</h3>
                <div className="text-3xl font-bold">{selectedRoom.energyData.humidity}%</div>
              </div>
              
              {/* Occupancy Status */}
              <div className="bg-yellow-50 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Occupancy</h3>
                <div className="flex items-center">
                  <User className="mr-2" size={24} />
                  <span className="text-3xl font-bold">{selectedRoom.energyData.occupancy}</span>
                </div>
              </div>
            </div>
            
            {/* Status Section */}
            <div className="mt-8 bg-gray-50 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Room Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full mr-2 ${selectedRoom.energyData.lights === 'On' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span>Lights: {selectedRoom.energyData.lights}</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full mr-2 ${selectedRoom.energyData.ac === 'On' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span>AC: {selectedRoom.energyData.ac}</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full mr-2 ${selectedRoom.energyData.occupancy === 'Occupied' ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                  <span>Room: {selectedRoom.energyData.occupancy}</span>
                </div>
              </div>
            </div>
            
            {/* Energy Saving Tips */}
            <div className="mt-8 bg-green-50 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Energy Saving Tips</h3>
              <ul className="list-disc pl-5">
                <li>Turn off lights when not in use</li>
                <li>Maintain temperature between 21-24°C</li>
                <li>Close windows when AC is running</li>
                <li>Unplug electronic devices when not in use</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-blue-800">Building Management System</h1>
        <p className="text-gray-600 mt-2">Click on a room to view its energy dashboard</p>
      </header>
      
      <div className="space-y-8">
        {floors.map((floor) => (
          <div key={floor.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-blue-600 text-white p-4">
              <h2 className="text-xl font-bold">{floor.name}</h2>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {floor.rooms.map((room) => (
                  <button
                    key={room.id}
                    onClick={() => handleRoomClick(room)}
                    className="bg-blue-50 hover:bg-blue-100 transition-colors p-4 rounded-lg text-center shadow hover:shadow-md"
                  >
                    <Home className="mx-auto mb-2" size={24} />
                    <span className="font-medium">{room.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BuildingManagement;