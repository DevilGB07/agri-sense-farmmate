# 🌱 AgriEnviroSense AI - Smart Farming Dashboard

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)
![Arduino](https://img.shields.io/badge/-Arduino-00979D?style=for-the-badge&logo=Arduino&logoColor=white)

**AgriEnviroSense AI** is a comprehensive, AI-assisted web application built to empower modern farmers with real-time, data-driven insights. It acts as a bridge between physical agricultural environments and intelligent software, providing instant crop recommendations, localized market prices, and visual disease detection capabilities to maximize yield and minimize loss.

🌐 **Live Production Deployment:** [https://agri-sense-47e90.web.app](https://agri-sense-47e90.web.app)

---

## ✨ Comprehensive Feature List

### 🔌 Real-Time Hardware Sync (Web Serial API)
Gone are the days of manual data entry. AgriEnviroSense AI connects directly to your farm's sensors.
*   **Plug-and-Play USB Integration:** Connect an Arduino Uno directly to your PC, Mac, or Android device using a standard USB cable.
*   **Live Sensor Feed:** The dashboard uses the native browser Web Serial API (`navigator.serial`) to read live Temperature and Humidity streams from a DHT22 sensor with zero latency.
*   **Secure & Local:** The hardware bridge operates entirely within your browser for maximum security, requiring no external drivers or local servers.

### 🧠 Smart Crop Recommendation Engine
The application doesn't just display data; it interprets it.
*   **Dynamic Decision Matrix:** As live temperature and humidity data streams in, the algorithm cross-references the environmental conditions against a built-in crop suitability database.
*   **Instant Feedback:** Instantly lists highly suitable crops (e.g., suggesting Jute and Cotton in high heat/humidity) and flags unsuitable crops to prevent poor planting decisions.

### 🦠 Visual Disease Detection Module
Early detection saves harvests.
*   **Image Analysis Simulation:** Farmers can upload photos of distressed leaves or crops.
*   **Diagnostic Reports:** Provides a confidence score, disease severity rating (e.g., Early Blight), and immediate treatment recommendations (e.g., "Apply copper-based fungicide").

### 📈 Indian Mandi Market Tracker
Make informed financial decisions.
*   **Real-time Filters:** Search and filter crop prices across major Indian markets like Nashik, Karnataka, and Punjab.
*   **Trend Indicators:** Color-coded indicators instantly show whether prices for specific crops are trending up or down.

### 🌍 Seamless Localization
*   **Bilingual Architecture:** The entire dashboard, including dynamic alerts, can be toggled instantly between **English** and **Hindi** via a robust Context API, ensuring accessibility for local farming communities.

---

## 🛠️ Technology Stack & Architecture

### Frontend
*   **Framework:** React 18 (Vite Bundler)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS, Shadcn UI Components
*   **Icons:** Lucide-React
*   **State Management:** React Hooks (useState, useEffect, useContext)

### Backend & Infrastructure
*   **Hosting:** Firebase Hosting (Optimized Global CDN)
*   **Cloud Functions:** Configured for future backend scaling (`firebase.json`).

### Hardware Integration
*   **Microcontroller:** Arduino Uno R3 (SMD/DIP)
*   **Sensors:** DHT22 / AM2302 (Temperature & Humidity)
*   **Display (Optional):** JHD162A 16x2 LCD with I2C Adapter
*   **Communication Protocol:** 9600 Baud Serial over USB -> JSON Parsing

---

## 🚀 Getting Started Locally

If you wish to run the project locally or contribute to its development, follow these steps:

### 1. Software Setup
1. Clone the repository to your local machine.
2. Install the necessary Node.js dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run start
   ```
4. Open your browser and navigate to `http://localhost:8081`.

### 2. Hardware Setup (Arduino)
To utilize the **Hardware Sync** feature, you will need a physical Arduino setup:
1. Connect a DHT22 sensor data pin to **Digital Pin 2** of your Arduino Uno.
2. Ensure the DHT22 is powered (5V) and grounded.
3. Open the Arduino IDE and upload a script that outputs data in valid JSON format:
   ```cpp
   // Example Output Format required by the Web App:
   // {"temp":24.50, "humidity":60.20}
   ```
4. **Important:** Close the Serial Monitor in the Arduino IDE. The web browser requires exclusive access to the COM port.
5. In the Web App, navigate to the **Hardware Sync** page, click **Connect Arduino**, and select your USB device from the browser prompt.

---

## 📂 Project Structure Overview

*   `src/` - The core React application logic.
    *   `components/pages/HardwareConnectPage.tsx` - Handles the USB serial connection loop and stream decoding.
    *   `contexts/LanguageContext.tsx` - Manages the global translation state for English and Hindi.
*   `functions/` - Directory for Firebase backend functions.
*   `index.html` - The Vite entry point.
*   `firebase.json` - Firebase deployment and routing configuration.
*   `static_dashboard.html` & `script.js` - A bonus, lightweight Vanilla JS/HTML version of the dashboard that runs without a build step.

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! If you'd like to help improve the recommendation algorithms or add more local languages, please feel free to fork the repository and submit a pull request.

## 📝 License
This project is licensed under the MIT License.
