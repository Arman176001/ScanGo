import React from 'react'

function MainPage(){
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4">
          <div className="p-6 bg-white bg-opacity-80 backdrop-blur-lg rounded-2xl shadow-lg text-center max-w-sm sm:max-w-md w-full mx-auto mb-28">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
              Choose Your Delivery Service
            </h1>
            <p className="text-gray-700 mb-6 text-sm sm:text-base">
              Scan the QR code and select your favorite food delivery app!
            </p>
    
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              <a
                href="https://www.zomato.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src="zomato.svg"
                  alt="Zomato"
                  className="w-18 sm:w-21 mx-auto"
                />
              </a>
              <a
                href="https://www.swiggy.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src="swiggy.svg"
                  alt="Swiggy"
                  className="w-16 sm:w-19 mx-auto sm:mt-3 mt-2"
                />
              </a>
              <a
                href="https://www.ubereats.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src="uber-eats.svg"
                  alt="Uber Eats"
                  className="w-26 sm:w-32 mx-auto sm:mt-12 mt-8"
                />
              </a>
              <a
                href="https://www.eatsure.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src="eat-sure.svg"
                  alt="Eat Sure"
                  className="w-28 sm:w-40 mx-auto"
                />
              </a>
              <a
                href="https://www.grab.com/sg/"
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src="Grab_logo.svg"
                  alt="Grab"
                  className="w-24 sm:w-24 mx-auto sm:mt-7 mt-3"
                />
              </a>
              <a
                href="https://www.doordash.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src="DoorDash.svg"
                  alt="Door Dash"
                  className="w-26 sm:w-40 mx-auto sm:mt-10 mt-6"
                />
              </a>
            </div>
          </div>
        </div>
      );
}

export default MainPage

