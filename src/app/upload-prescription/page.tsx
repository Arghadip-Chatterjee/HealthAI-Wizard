// Import necessary modules
"use client";
import UploadPrescription from './UploadPrescription';
import { useState, useEffect } from 'react';

const Page: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null); // State to store userId

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = window.localStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId); // Set userId if found in localStorage
      } else {
        console.log('User not logged in'); // Log message if userId is not found
      }
    };

    fetchUserId(); // Invoke the async function to fetch userId
  }, []);

  if (!userId) {
    return <p>User not logged in</p>; // Render message if userId is not set
  }

  return <UploadPrescription userId={userId} />; // Render UploadPrescription component with userId prop
};

export default Page;
