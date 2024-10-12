import React, { useState, useContext } from 'react';
import { WarrantyContext } from '../context/WarrantyContext';
import { AlertTriangle } from 'lucide-react';

const WarrantyClaimForm: React.FC = () => {
  // ... (previous state declarations remain the same)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitError('');
      try {
        console.log('Submitting form data:', formData);
        const number = await submitClaim(formData);
        console.log('Received claim number:', number);
        setClaimNumber(number);
      } catch (error) {
        console.error('Error in handleSubmit:', error);
        setSubmitError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // ... (rest of the component remains the same)

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* ... (form fields remain the same) ... */}
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Warranty Claim'}
        </button>
      </div>
      {submitError && (
        <div className="mt-4 p-4 bg-red-50 border border-red-400 rounded-md">
          <p className="text-red-700">Error submitting claim: {submitError}</p>
          <p className="text-sm text-red-600 mt-2">Please try again or contact support if the problem persists.</p>
        </div>
      )}
      {claimNumber && (
        <div className="mt-4 p-4 bg-green-50 border border-green-400 rounded-md">
          <p className="text-green-700">Your warranty claim has been submitted successfully.</p>
          <p className="text-green-700 font-bold">Claim Number: {claimNumber}</p>
          <p className="text-sm text-green-600 mt-2">Please keep this number for your records. You MUST provide this number when sending your item for warranty service.</p>
        </div>
      )}
    </form>
  );
};

export default WarrantyClaimForm;