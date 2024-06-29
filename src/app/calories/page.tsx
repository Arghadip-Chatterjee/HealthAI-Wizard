"use client";
import { useState } from 'react';
import axios from 'axios';
import {
    TextRevealCard,
    TextRevealCardDescription,
    TextRevealCardTitle,
} from "../components/ui/text-reveal-card";
import 'tailwindcss/tailwind.css';


const CaloriesBurnedCalculator = () => {
    const [activity, setActivity] = useState<string>('');
    const [weight, setWeight] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [caloriesBurnedData, setCaloriesBurnedData] = useState<any[]>([]);

    const options = {
        method: 'GET',
        url: 'https://calories-burned-by-api-ninjas.p.rapidapi.com/v1/caloriesburned',
        params: {
            activity: activity,
            weight: weight * 2.20462, // Convert kg to pounds
            duration: duration
        },
        headers: {
            'X-RapidAPI-Key': '1b43b998e8mshecf18b614780362p1be75ejsne18f9cebbd57',
            'X-RapidAPI-Host': 'calories-burned-by-api-ninjas.p.rapidapi.com'
        }
    };

    const handleActivityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setActivity(e.target.value);
    };

    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWeight(parseFloat(e.target.value));
    };

    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDuration(parseInt(e.target.value));
    };

    const fetchData = async () => {
        try {
            const response = await axios.request(options);
            setCaloriesBurnedData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className='my-3 bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]'>
                <form className="max-w-sm mx-auto">
                    <div className="mb-5">
                        <label htmlFor="activity" className="block mb-2 text-sm font-medium text-gray-900">Your Activity :</label>
                        <input type="text" id="activity" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" value={activity} onChange={handleActivityChange} />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="weight" className="block mb-2 text-sm font-medium text-gray-900">Weight (kg):</label>
                        <input type="number" id="weight" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" value={weight} onChange={handleWeightChange} />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="duration" className="block mb-2 text-sm font-medium text-gray-900">Duration (minutes):</label>
                        <input type="number" id="duration" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" value={duration} onChange={handleDurationChange} />
                    </div>
                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={fetchData}>Calculate Calories Burned</button>
                </form>
            </div>

            <div className="flex flex-col justify-between bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] w-full py-3 md:py-6 lg:py-8 xl:py-10">
                <div className="overflow-hidden">
                    {caloriesBurnedData.length > 0 && (
                        caloriesBurnedData.map((activityData, index) => (
                            <div className='my-3' key={index}>
                                <h2 className='flex justify-center flex-wrap text-3xl font-bold text-white'>Calories Burned</h2>
                                <TextRevealCard
                                    text="Hover to Reveal"
                                    revealText={'Calories Burned : ' + activityData.total_calories}
                                >
                                    <TextRevealCardTitle>
                                        {activityData.name}
                                    </TextRevealCardTitle>
                                    <TextRevealCardDescription>
                                        Calories per Hour: {activityData.calories_per_hour}
                                        <br />
                                        Duration (minutes): {activityData.duration_minutes}
                                    </TextRevealCardDescription>
                                </TextRevealCard>
                            </div>
                        ))
                    )}
                </div>
            </div>

        </div>
    );
};

export default CaloriesBurnedCalculator;
