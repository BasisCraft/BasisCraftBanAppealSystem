import React from 'react';

const AdminPanel = ({ appeals, setAppeals, t }) => {
  const processAppeal = (reportNumber, action) => {
    setAppeals(appeals.map(appeal => 
      appeal.reportNumber === reportNumber ? { ...appeal, status: action } : appeal
    ));
  };

  return (
    <div className="mt-8 bg-gray-800 bg-opacity-50 p-4 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-blue-200">{t('adminPanel')}</h2>
      {appeals.map((appeal, index) => (
        <div key={index} className="bg-gray-700 bg-opacity-50 p-4 rounded-md mb-4">
          <p>Report Number: {appeal.reportNumber}</p>
          <p>Status: {appeal.status}</p>
          <p>Category: {appeal.appealCategory}</p>
          <p>Minecraft Username: {appeal.mcName}</p>
          <p>Email: {appeal.email}</p>
          <p>Reason: {appeal.appealReason}</p>
          {appeal.banId && <p>Ban ID: {appeal.banId}</p>}
          <p>Additional Info: {appeal.additionalInfo}</p>
          <div className="mt-2">
            <button
              onClick={() => processAppeal(appeal.reportNumber, 'Approved')}
              className="bg-green-500 text-white py-1 px-2 rounded-md mr-2 hover:bg-green-600 transition duration-300"
            >
              {t('approve')}
            </button>
            <button
              onClick={() => processAppeal(appeal.reportNumber, 'Rejected')}
              className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 transition duration-300"
            >
              {t('reject')}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;