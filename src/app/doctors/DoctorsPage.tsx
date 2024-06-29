'use client';

import { useState, ChangeEvent } from 'react';
import Link from 'next/link';
import { Doctor } from './types';

const DoctorsPage: React.FC<{ doctors: Doctor[] }> = ({ doctors }) => {
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [filters, setFilters] = useState({
    specialty: '',
    minExperience: 0,
    maxFees: 9999,
  });

  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleFilterClick = () => {
    filterDoctors();
  };

  const filterDoctors = () => {
    const filtered = doctors.filter(
      doctor =>
        (filters.specialty === '' || doctor.specialty === filters.specialty) &&
        doctor.yearsOfExp >= Number(filters.minExperience) &&
        doctor.fees <= Number(filters.maxFees)
    );
    setFilteredDoctors(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Doctors</h1>
      <div className="flex flex-col flex-wrap gap-4 bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)] justify-between items-center py-4">
        <div className='flex flex-1 flex-wrap items-center justify-between px-4 gap-4 w-full'>
          <div className="w-full sm:w-1/2 md:w-1/4">
            <label htmlFor="specialty" className="block mb-2">Specialty</label>
            <select
              name="specialty"
              id="specialty"
              className="w-full p-2 border rounded"
              onChange={handleFilterChange}
              value={filters.specialty}
            >
              <option value="">All Specialties</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Dermatology">Dermatology</option>
              {/* Add other specialties here */}
            </select>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4">
            <label htmlFor="minExperience" className="block mb-2">Minimum Experience (years)</label>
            <input
              type="number"
              name="minExperience"
              id="minExperience"
              className="w-full p-2 border rounded"
              onChange={handleFilterChange}
              value={filters.minExperience}
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4">
            <label htmlFor="maxFees" className="block mb-2">Maximum Fees ($)</label>
            <input
              type="number"
              name="maxFees"
              id="maxFees"
              className="w-full p-2 border rounded"
              onChange={handleFilterChange}
              value={filters.maxFees}
            />
          </div>
        </div>
        <div>
          <button onClick={handleFilterClick} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Filter
          </button>
        </div>
      </div>
      <div className='h-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]'>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 p-4">
          {filteredDoctors.map(doctor => (
            <div key={doctor.id} className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold">{doctor.name}</h2>
              <p className="text-gray-600">{doctor.specialty}</p>
              <p className="text-gray-600">Experience: {doctor.yearsOfExp} years</p>
              <p className="text-gray-600">Fees: ${doctor.fees}</p>
              <br />
              <Link href={`/schedule/${doctor.id}`}>
                <button type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                  Book Doctor
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;
