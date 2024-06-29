"use client";
import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';

const StoreUserId: React.FC = () => {
  const { userId } = useAuth();

  useEffect(() => {
    if (userId) {
      window.localStorage.setItem('userId', userId);
    }
  }, [userId]);

  return null;
};

export default StoreUserId;
