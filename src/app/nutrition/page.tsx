"use client";
import { useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';


const NutritionCalculator = () => {
    const [nutritionData, setNutritionData] = useState<any>(null);
    const [formData, setFormData] = useState({
        sex: '',
        age_value: '',
        age_type: '',
        feet: '',
        inches: '',
        lbs: '',
        pregnancy_lactating: '',
        activity_level: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.get('https://nutrition-calculator.p.rapidapi.com/api/nutrition-info', {
                params: {
                    measurement_units: 'std',
                    ...formData
                },
                headers: {
                    'X-RapidAPI-Key': '1b43b998e8mshecf18b614780362p1be75ejsne18f9cebbd57',
                    'X-RapidAPI-Host': 'nutrition-calculator.p.rapidapi.com'
                }
            });
            setNutritionData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className='bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)] pb-3'>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    {/* Add input fields and select options for user input */}
                    {/* For example: */}
                    <div className="mb-4">
                        <label htmlFor="sex" className="block mb-1 text-sm font-medium text-gray-900">Sex:</label>
                        <select id="sex" name="sex" value={formData.sex} onChange={handleChange} className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Select...</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    {/* Repeat this for other input fields */}
                    <div className="mb-4">
                        <label htmlFor="age_value" className="block mb-1 text-sm font-medium text-gray-900">Age:</label>
                        <input type="number" id="age_value" name="age_value" value={formData.age_value} onChange={handleChange} className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="age_type" className="block mb-1 text-sm font-medium text-gray-900">Age Type:</label>
                        <select id="age_type" name="age_type" value={formData.age_type} onChange={handleChange} className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Select...</option>
                            <option value="yrs">Years</option>
                            <option value="mos">Months</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="feet" className="block mb-1 text-sm font-medium text-gray-900">Height (Feet):</label>
                        <input type="number" id="feet" name="feet" value={formData.feet} onChange={handleChange} className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="inches" className="block mb-1 text-sm font-medium text-gray-900">Height (Inches):</label>
                        <input type="number" id="inches" name="inches" value={formData.inches} onChange={handleChange} className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lbs" className="block mb-1 text-sm font-medium text-gray-900">Weight (lbs):</label>
                        <input type="number" id="lbs" name="lbs" value={formData.lbs} onChange={handleChange} className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="pregnancy_lactating" className="block mb-1 text-sm font-medium text-gray-900">Pregnancy/Lactating:</label>
                        <select id="pregnancy_lactating" name="pregnancy_lactating" value={formData.pregnancy_lactating} onChange={handleChange} className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Select...</option>
                            <option value="none">None</option>
                            <option value="pregnant">Pregnant</option>
                            <option value="lactating1st">Lactating (1st)</option>
                            <option value="lactating2nd">Lactating (2nd)</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="activity_level" className="block mb-1 text-sm font-medium text-gray-900">Activity Level:</label>
                        <select id="activity_level" name="activity_level" value={formData.activity_level} onChange={handleChange} className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Select...</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Low Active">Low Active</option>
                            <option value="Active">Active</option>
                            <option value="Very Active">Very Active</option>
                        </select>
                    </div>


                    <button type="submit" className="block w-full py-2 px-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Calculate Nutrition</button>
                </form>
            </div>
            {/* Display nutrition data in a table */}
            {nutritionData && (
                <div className="mt-8">
                    <div className='flex justify-between flex-col items-center text-wrap flex-wrap bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] text-gray-200'>
                        <h2 className="text-xl font-semibold mb-4 underline">Nutrition Information</h2>
                        <h3 className="text-lg my-2 font-bold">BMI: {nutritionData.BMI_EER.BMI}</h3>
                        <h3 className="text-lg my-2 font-bold">Estimated Daily Caloric Needs: {nutritionData.BMI_EER['Estimated Daily Caloric Needs']}</h3>
                    </div>
                    <br />
                    {/* Render table for each section of nutrition data */}
                    {/* For example, macronutrients_table */}
                    <div className='macronutrients my-4 py-3 px-2 mx-2'>
                        <h3 className="text-xl font-bold mb-2">Macronutrients</h3>
                        <table className="w-full border-collapse border border-gray-200">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-200 px-4 py-2">Macronutrient</th>
                                    <th className="border border-gray-200 px-4 py-2">Recommended Intake Per Day</th>
                                </tr>
                            </thead>
                            <tbody>
                                {nutritionData.macronutrients_table['macronutrients-table'].map((row: string[], index: number) => (
                                    <tr key={index}>
                                        <td className="border border-gray-200 px-4 py-2">{row[0]}</td>
                                        <td className="border border-gray-200 px-4 py-2">{row[1]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Render other sections similarly */}
                    {/* For example, minerals_table */}
                    <div className='minerals my-4 py-3 px-2 mx-2'>
                        <h3 className="text-xl font-bold mb-2">Minerals</h3>
                        <table className="w-full border-collapse border border-gray-200">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-200 px-4 py-2">Mineral</th>
                                    <th className="border border-gray-200 px-4 py-2">Recommended Intake Per Day</th>
                                    <th className="border border-gray-200 px-4 py-2">Tolerable UL Intake Per Day</th>
                                </tr>
                            </thead>
                            <tbody>
                                {nutritionData.minerals_table['essential-minerals-table'].map((row: string[], index: number) => (
                                    <tr key={index}>
                                        <td className="border border-gray-200 px-4 py-2">{row[0]}</td>
                                        <td className="border border-gray-200 px-4 py-2">{row[1]}</td>
                                        <td className="border border-gray-200 px-4 py-2">{row[2]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* For example, non_essential_minerals_table */}
                    <div className='n-minerals my-4 py-3 px-2 mx-2'>
                        <h3 className="text-xl font-bold mb-2">Non Essential Minerals</h3>
                        <table className="w-full border-collapse border border-gray-200">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-200 px-4 py-2">Mineral</th>
                                    <th className="border border-gray-200 px-4 py-2">Recommended Intake Per Day</th>
                                    <th className="border border-gray-200 px-4 py-2">Tolerable UL Intake Per Day</th>
                                </tr>
                            </thead>
                            <tbody>
                                {nutritionData.non_essential_minerals_table['non-essential-minerals-table'].map((row: string[], index: number) => (
                                    <tr key={index}>
                                        <td className="border border-gray-200 px-4 py-2">{row[0]}</td>
                                        <td className="border border-gray-200 px-4 py-2">{row[1]}</td>
                                        <td className="border border-gray-200 px-4 py-2">{row[2]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* For example, vitamins_table */}
                    <div className='vitamins my-4 py-3 px-2 mx-2'>
                        <h3 className="text-xl font-bold mb-2">Vitamins</h3>
                        <table className="w-full border-collapse border border-gray-200">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-200 px-4 py-2">Vitamin</th>
                                    <th className="border border-gray-200 px-4 py-2">Recommended Intake Per Day</th>
                                    <th className="border border-gray-200 px-4 py-2">Tolerable UL Intake Per Day</th>
                                </tr>
                            </thead>
                            <tbody>
                                {nutritionData.vitamins_table['vitamins-table'].map((row: string[], index: number) => (
                                    <tr key={index}>
                                        <td className="border border-gray-200 px-4 py-2">{row[0]}</td>
                                        <td className="border border-gray-200 px-4 py-2">{row[1]}</td>
                                        <td className="border border-gray-200 px-4 py-2">{row[2]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NutritionCalculator;
