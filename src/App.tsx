import React from 'react';
import WarrantyClaimForm from './components/WarrantyClaimForm';
import { WarrantyProvider } from './context/WarrantyContext';

function App() {
  return (
    <WarrantyProvider>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white shadow-xl rounded-lg p-8 max-w-2xl w-full">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Warranty Claim Registration</h1>
          <WarrantyClaimForm />
        </div>
      </div>
    </WarrantyProvider>
  );
}

export default App;