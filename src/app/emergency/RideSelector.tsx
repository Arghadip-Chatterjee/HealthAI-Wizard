"use client";
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { carList } from './carList'; // Adjust the import path as necessary
import styles from './RideSelector.module.css'; // Assuming you use CSS Modules

interface Car {
  service: string;
  imgUrl: string;
}

interface RideSelectorProps {
  distance: number;
  onConfirm?: () => void;
}

const RideSelector: React.FC<RideSelectorProps> = ({ distance, onConfirm }) => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const selectedCarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    console.log('Selected Car:', selectedCar);
    // scrollToBottom();
  }, [selectedCar]);

  const handleCarSelect = (car: Car) => {
    setSelectedCar(car);
  };

  const calculatePrice = (distance: number, selectedCar: Car | null): number => {
    if (!selectedCar) {
      return 0; // Or any default value you prefer when no car is selected
    }

    const pricePerKilometer = selectedCar.service === 'ICU Ambulance' ? 20 : 10;
    return distance * pricePerKilometer;
  };

//   const scrollToBottom = () => {
//     window.scrollTo({
//       top: document.documentElement.scrollHeight,
//       behavior: 'smooth',
//     });
//   };

  const handleConfirm = () => {
    const price = calculatePrice(distance, selectedCar);
    if (price > 0) {
      if (onConfirm) {
        onConfirm();
      }
      router.push('/thanks');
    }
  };

  return (
    <div className={styles.rideSelector}>
      <h1 className={styles.rideSelectorTitle}>Choose a ride, or swipe up for more</h1>
      <div className={styles.carList}>
        {carList.map((car, index) => (
          <div className={styles.carItem} key={index} onClick={() => handleCarSelect(car)}>
            <img className={styles.carImage} src={car.imgUrl} alt="Car" />
            <div className={styles.carService}>
              <p>{car.service}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedCar && (
        <div className={styles.selectedCar} ref={selectedCarRef}>
          <h1 className={styles.selectedCarTitle}>Selected Car:</h1>
          <div className={styles.selectedCarDetails}>
            <h2>Service: {selectedCar.service}</h2>
            <h2>Price: ₹{calculatePrice(distance, selectedCar)}</h2>
          </div>
        </div>
      )}

      {/* <button className={styles.scrollButton} onClick={scrollToBottom}>
        Scroll Down
      </button> */}

      {selectedCar && (
        <button
          className={styles.confirmButton}
          onClick={handleConfirm}
          disabled={calculatePrice(distance, selectedCar) === 0}
        >
          Confirm Emergency Service
        </button>
      )}
    </div>
  );
};

export default RideSelector;
