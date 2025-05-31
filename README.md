#🌿 Smart Agriculture Frontend

Smart Agriculture Frontend is a responsive and intuitive web application designed to manage and monitor agricultural operations. Built with **Angular 19**, this frontend seamlessly integrates with the **Smart Agriculture Backend** to visualize data, manage resources, and gain insights into soil conditions, weather patterns, and more.



## 🌐 Live Demo

Experience the live version of the application here:  
[Smart Agriculture Web App](https://smartagriculturee.netlify.app/)




## 🧠 Overview

This frontend application enables users to interact with the Smart Agriculture platform through an intuitive and user-friendly interface. It utilizes modern web development practices and cutting-edge technologies to deliver a scalable and maintainable solution.

Key highlights of the application include:

- **Component-Based Architecture:** Built using **Angular 19**, ensuring modularity and ease of maintenance.
- **TypeScript:** Provides type safety and enhances developer productivity.
- **Responsive Design:** Optimized for desktops, tablets, and mobile devices, ensuring seamless user experience across devices.
- **API Integration:** Smooth interaction with backend services to manage farms, fields, and monitor environmental factors.
- **Data Visualization:** Uses **Chart.js** for effective display of agricultural metrics and insights.




## 🚀 Features

- **🔑 User Authentication:** Secure login and registration to control user access.  
- **📊 Dashboard:** Displays key agricultural metrics and insights, including charts and graphs.  
- **🌱 Farm Management:** Create, view, update, and delete farm records.  
- **🌾 Field Management:** Manage fields associated with specific farms.  
- **🌦️ Weather Insights:** Display weather information tailored to your fields (integrated with backend).  
- **📱 Responsive UI:** Optimized for all devices, ensuring a consistent experience on desktops, tablets, and mobile devices.



## 🔗 API Integration

The frontend communicates with the **Smart Agriculture Backend API** to fetch and manipulate data. All backend interactions are encapsulated within services in the `src/app/services` directory.

- **Backend API Documentation (Swagger):** [Swagger Documentation](https://smartagriculture-api-dev-gkbkhpc9cqaretc3.israelcentral-01.azurewebsites.net/swagger/index.html)

## 🧰 Technologies

- **Angular 19:** Core frontend framework.
- **TypeScript:** Primary programming language.
- **RxJS:** For managing asynchronous data streams and reactive programming.
- **Bootstrap 5:** For responsive layout and UI components.
- **Chart.js:** For data visualization (e.g., charts, graphs).
- **FontAwesome:** For icons.
- **Angular CLI:** For development tooling, building, and testing.

## ⚙️ Getting Started

Follow these instructions to set up and run the application locally:

### 📝 Prerequisites

- **Node.js:** Version 18.x or later recommended.
- **npm:** Version 9.x or later (or **yarn**).
- **Angular CLI:** Installed globally via `npm install -g @angular/cli`.

### 🔧 Setup Instructions

1. **Clone the repository:**
    ```bash
    git clone https://github.com/X-AAA/SmartAgriculture-FrontEnd-.git
    cd SmartAgriculture-FrontEnd-
    ```

2. **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    ```

3. **Configure Environment:**
    - Update the API base URL in `src/environments/environment.ts` and `src/environments/environment.development.ts` if your backend is running on a different address.

4. **Run the application:**
    ```bash
    ng serve
    # or
    # npm start
    ```
    The app will be available at `http://localhost:4200/`.

5. **Build for production:**
    ```bash
    ng build --configuration production
    # or
    # npm run build
    ```
    The build artifacts will be stored in the `dist/` directory.

---

