import React, { useEffect, useState } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import Link from 'next/link';
export default function HomePage({ initialIsLoggedIn, initialName }) {
  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);
  const [name, setName] = useState(initialName);

  useEffect(() => {
    if (typeof window !== 'undefined') { // Ensure we are on the client side
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      const name = urlParams.get('name');
      setName(name);
      if (token) {
        sessionStorage.setItem('jwt', token);
        sessionStorage.setItem('name', name);
        setIsLoggedIn(true);
        window.history.replaceState(null, '', window.location.pathname); // Clean URL
      }
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('name');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  if (!isLoggedIn) {
    return (
      <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 flex-col">
      <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-800">Welcome, {name}!</h1>
        <button 
          onClick={handleLogout} 
          className="mt-4 text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Logout
        </button>
      </div>

      <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200 mt-4 flex flex-col items-start" data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        data-aos-duration="1500">
        <h1 class="text-3xl font-bold text-gray-800 mb-4">Welcome to My Sample Google Authentication Project!</h1>
        <p class="text-lg text-gray-700 mb-4">Thank you for signing up for my sample Google authentication project.</p>
        <p class="text-lg text-gray-700 mb-4">This project was created as part of my practice to enhance my skills as a full-stack developer.</p>
        <p class="text-gray-800 font-semibold mb-2">Project Features:</p>
        <ul class="list-disc list-inside text-gray-700 mb-4">
            <li>Google OAuth integration</li>
            <li>Secure JWT authentication</li>
            <li>Automated email feature for enhanced communication</li>
            <li>User data handling with MongoDB</li>
            <li>Logout functionality</li>
        </ul>
        <p class="text-lg text-gray-700 mb-4">I am continuously working on adding more features and improving the functionality.</p>
        
        <p class="text-lg text-gray-700"> To learn more about me and explore my other projects, visit: <Link href="https://gaganjot-singh.vercel.app/" target='blank' class="text-blue-500 underline"><b>Web Portfolio</b></Link>.</p>
      </div>
     </div>
      </>
    );
  } else {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
        <div className="p-8 max-w-md bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col items-center justify-center">
          <h2 className="mb-6 text-3xl font-bold text-center text-gray-900">Log in to your account</h2>
          <button onClick={() => window.location.href = 'https://google-authentication-project-backend.onrender.com/auth/google'} type="button" className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mb-2">
            <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
              <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd"/>
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }
}

export async function getServerSideProps({ req }) {
  const isLoggedIn = false;
  let name = "";
  return {
    props: { initialIsLoggedIn: isLoggedIn, initialName: name },
  };
}
