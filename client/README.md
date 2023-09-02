# LMS FRONTEND

### Setup Instructions

***********************************************************************
1. Clone the Proect from here

    git clone https://github.com/vandan501/LMS_MERNStack/tree/main

***********************************************************************    
2. Move into the Directory

    cd LMS_MERNStack 

***********************************************************************    
3. Install Dependencies

    npm install
***********************************************************************    
4. Run the Server

    npm run start

***********************************************************************    

### Setup Instructions for tailwind
***********************************************************************    
[Tailwind official instruction doc(https://tailwindcss.com/docs/installation)]

***********************************************************************    
1. Install Tailwind css--> npm install -D tailwindcss

***********************************************************************    
2. Install config file of Tailwind using -->npx tailwind init

***********************************************************************    
3. add file extensions in congif file
    /** @type {import('tailwindcss').Config} */
    module.exports = {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
     extend: {},
    },
    plugins: [],
    }
***********************************************************************    

4. add the tailwind directives in the index.css
        @tailwind base;
        @tailwind components;
        @tailwind utilities;    

***********************************************************************    

### Adding Plugins and dependencies 
 
 npm install @reduxjs/toolkit react-redux react-router-dom react-icons react-chartjs-2 chart.js daisyui axios react-hot-toast @tailwind/line-clamp

