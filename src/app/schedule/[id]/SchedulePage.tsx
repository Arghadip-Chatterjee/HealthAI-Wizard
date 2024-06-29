// 'use client';

// import { useState } from 'react';
// import { Doctor } from './types';

// const SchedulePage: React.FC<{ doctor: Doctor }> = ({ doctor }) => {
//     const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     // const handlePayment = async () => {
//     //     try {
//     //         const response = await fetch('/api/create-order', {
//     //             method: 'POST',
//     //             headers: {
//     //                 'Content-Type': 'application/json'
//     //             },
//     //             body: JSON.stringify({ amount: doctor.fees * 100 }) // Amount in paise
//     //         });

//     //         console.log(response);

//     //         if (!response.ok) {
//     //             throw new Error(`Error: ${response.statusText}`);
//     //         }

//     //         const data = await response.json();

//     //         const options = {
//     //             key_id: 'rzp_test_otIehG46k9jDOV', // Replace with your Razorpay key
//     //             amount: doctor.fees * 100,
//     //             currency: 'INR',
//     //             name: 'Doctor Appointment',
//     //             description: `Booking with Dr. ${doctor.name}`,
//     //             order_id: data.id,
//     //             // handler: function (response: any) {
//     //             //     setIsPaymentSuccessful(true);
//     //             //     // Handle successful payment here (e.g., save booking info to the database)
//     //             // },
//     //             callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
//     //             prefill: {
//     //                 name: 'Gaurav Kumar', // Prefill customer's name
//     //                 email: 'gaurav.kumar@example.com',
//     //                 contact: '9000090000' // Prefill customer's phone number
//     //             },
//     //             notes: {
//     //                 address: 'Razorpay Corporate Office'
//     //             },
//     //             theme: {
//     //                 color: '#3399cc'
//     //             }
//     //         };

//     //         const rzp1 = new (window as any).Razorpay(options);
//     //         rzp1.open();
//     //         setIsPaymentSuccessful(true)
//     //     } catch (error: any) {
//     //         setError(error.message);
//     //     }
//     // };

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <h1 className="text-3xl font-semibold mb-4">Schedule Appointment with Dr. {doctor.name}</h1>
//             <div>
//                 <p>Specialty: {doctor.specialty}</p>
//                 <p>Experience: {doctor.yearsOfExp} years</p>
//                 <p>Fees: ${doctor.fees}</p>
//                 <button
//                     id="rzp-button1"
//                     onClick={}
//                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
//                 >
//                     Book Now
//                 </button>
//                 {/* <form><script src="https://checkout.razorpay.com/v1/payment-button.js" data-payment_button_id="pl_OSI3AYUuoO322n" async> </script> </form> */}
//                 {error && <p className="text-red-500 mt-4">{error}</p>}
//                 {isPaymentSuccessful && (
//                     <div>
//                         <p>Payment Successful!</p>
//                         <p>Your appointment is confirmed.</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };


// export default SchedulePage;
