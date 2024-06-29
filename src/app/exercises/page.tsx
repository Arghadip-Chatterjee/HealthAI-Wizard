"use client";
import { useState } from 'react';
import axios from 'axios';
import { PinContainer } from "../components/ui/3d-pin";
import 'tailwindcss/tailwind.css';


const BodyPartSelect = () => {
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null);
  const [exerciseData, setExerciseData] = useState<any>(null); // State to store exercise data

  const options = {
    method: 'GET',
    url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${selectedBodyPart}`,
    headers: {
      'X-RapidAPI-Key': '1b43b998e8mshecf18b614780362p1be75ejsne18f9cebbd57',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };

  const handleBodyPartChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBodyPart(e.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.request(options);
      setExerciseData(response.data); // Store the response data in state
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>

      <form className="max-w-sm mx-auto">
        <label htmlFor="bodyPart" className="block mb-2 text-sm font-medium text-gray-900">Select your BodyPart : </label>
        <select id="bodyPart" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleBodyPartChange}>
          <option value="">Select Body Part</option>
          <option value="back">Back</option>
          <option value="cardio">Cardio</option>
          <option value="chest">Chest</option>
          <option value="lower arms">Lower Arms</option>
          <option value="lower legs">Lower Legs</option>
          <option value="neck">Neck</option>
          <option value="shoulders">Shoulders</option>
          <option value="upper arms">Upper Arms</option>
          <option value="upper legs">Upper Legs</option>
          <option value="waist">Waist</option>
        </select>
        <br />
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={fetchData}>Fetch Exercises</button>
      </form>

      {exerciseData && (
        <div className='bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]'>
          <h2 className='flex flex-wrap justify-center items-center font-bold text-2xl'>Exercises for {selectedBodyPart}</h2>
            {exerciseData.map((exercise: any, index: number) => (
              <div  key={index} className="h-[25rem] w-full flex items-center justify-center flex-1 flex-wrap">
                <PinContainer
                  title={exercise.instructions}
                  href="#"
                >
                  <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem]">
                    <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                      {exercise.name}
                    </h3>
                    <div className="text-base !m-0 !p-0 font-normal">
                      <span className="text-slate-500 ">
                        <ul>
                          <li>Body Parts : {exercise.bodyPart}</li>
                          <li>Reps : {exercise.equipment}</li>
                          <li>Target : {exercise.target}</li>
                          <li>Muscles: {exercise.secondaryMuscles}</li>
                        </ul>
                      </span>
                    </div>
                    <div className="flex flex-1 w-full rounded-lg mt-4 h-20 justify-center">
                      <img src={exercise.gifUrl} alt={exercise.name}/>
                    </div>
                  </div>
                </PinContainer>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default BodyPartSelect;
