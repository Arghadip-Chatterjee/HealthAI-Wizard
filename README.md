

# HealthAI Wizard

HealthAI Wizard is an all-in-one healthcare solution developed for Hack4Bengal 3.0. This project leverages cutting-edge technologies to provide a seamless and comprehensive experience for users, offering features like doctor booking, prescription storage, personalized diet and workout plans, hospital navigation, emergency response, and a medical chatbot.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

1. **Doctor Booking for Appointments**
   - Easily find and book appointments with doctors.
   - View doctors' availability and receive booking confirmations.

2. **Prescription Storage**
   - Securely store and access your prescriptions.
   - Retrieve prescription history anytime.

3. **Diet Feature/Workout Plan/Exercises**
   - Get personalized diet plans and workout routines.
   - Access a variety of exercises to maintain a healthy lifestyle.

4. **Hospital Navigator**
   - Navigate to the nearest hospitals effortlessly.
   - Get real-time directions and information about hospital services.

5. **Emergency Response System (Ambulance)**
   - Quick access to emergency services.
   - Request an ambulance in case of medical emergencies.

6. **Medical Chatbot**
   - Interact with our AI-powered medical chatbot for instant health advice.
   - Get answers to common medical queries and concerns.

## Technologies Used

- **Frontend:**
  - NextJS 14
  - TypeScript

- **Backend:**
  - Prisma
  - PostgreSQL
  - Python
  - Flask

- **AI & Machine Learning:**
  - Own O-Llama AI Model
  - Pinecone Vector DB

- **Testing:**
  - Microsoft Playwright

## Installation

### Prerequisites

- Node.js
- PostgreSQL
- Python
- Flask

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/HealthAI-Wizard.git
   cd HealthAI-Wizard
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the PostgreSQL database and Prisma:

   ```bash
   npx prisma migrate dev
   ```

4. Set up the Python and Flask environment:

   ```bash
   cd backend
   pip install -r requirements.txt
   ```

5. Configure environment variables:

   Create a `.env` file in the root directory and add the necessary environment variables:

   ```env
   DATABASE_URL=your_postgresql_database_url
   ```

6. Run the development server:

   ```bash
   npm run dev
   ```

   For the backend:

   ```bash
   cd backend
   flask run
   ```

## Usage

1. Access the web application at `http://localhost:3000`.
2. Register or log in to access the features.
3. Navigate through the different sections to book appointments, store prescriptions, get diet and workout plans, use the hospital navigator, request emergency services, and interact with the medical chatbot.

## Contributing

We welcome contributions to HealthAI Wizard! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
