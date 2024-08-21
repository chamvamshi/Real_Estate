import React, { useState, useEffect } from 'react';
import '../App.css';
const clientStories = [
  {
    // image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzgWicz92o8_fW_YxMlDIgX_hzYC6xz_qMdw&s",
    text: " Abhi Estates helped me find my dream home in no time! Their service is excellent and they truly care about their clients.",
    name: "Toli Sreelatha, SR nagar",
  },
  {
    // image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy4doqqpcVao4xHXIq5sHCzYbh7-twfrr9eg&s",
    text: "Thanks to Abhi Estates, I secured a great investment property. The team is professional and very knowledgeable.",
    name:  "Ramana Kumar, Kukatpally",
  },
  {
    // image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmxPNQVWAh9XsrXIQy38n9WGeh-8vcuLNikw&s",
    text: "Buying my first home was a breeze with these Estates. They provided amazing support throughout the process.",
    name: "Adhi Lakshmi, SR Nagar",
  },
  {
    // image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0S19FU9JgywqaYQqTDmnm3k_r_HbfaA1g6A&s",
    text: "The experience with Abhi Estate Properties was top-notch. They found me the perfect home and handled all the paperwork effortlessly.",
    name: "Kaushika , Kukatpally",
  },
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % clientStories.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  
  return (
   
    
    <div className="relative">
      
      <main className="container mx-auto mt-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-950 animate-fadeInDown">CLIENTS STORIES</h2>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-full max-w-xl bg-gray-800 p-8 rounded-lg shadow-lg">
           
            <p className="text-white-300 text-lg leading-relaxed mb-4">
              {clientStories[currentSlide].text}
            </p>
            <p className="text-white-400 font-semibold mb-2">
              {clientStories[currentSlide].name}
            </p>
            <div className="flex items-center justify-center space-x-2">
              {clientStories.map((_, index) => (
                <span
                  key={index}
                  className={`inline-block w-2 h-2 rounded-full ${
                    index === currentSlide ? 'bg-blue-500' : 'bg-gray-500'
                  }`}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  
  );
}

export default App;
