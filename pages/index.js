import React from 'react';
import { parseCookies } from '../utils/parseCookies';
import jwt from 'jsonwebtoken';

export default function HomePage({ isLoggedIn, name }) {
  if (isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
        <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
        <h1 className="text-4xl font-bold text-gray-800">Welcome!</h1>
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="p-8 max-w-md bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col items-center justify-center">
            <h2 className="mb-6 text-3xl font-bold text-center text-gray-900">Log in to your account</h2>
            <button onClick={() => window.location.href = 'http://localhost:4000/auth/google'} type="button">
                Sign in with Google
            </button>
        </div>
    </div>

    );
  }
}

export async function getServerSideProps({ req }) {
  const cookies = parseCookies(req);
  const isLoggedIn = !!cookies.jwt;

  return {
    props: { isLoggedIn, name },
  };
}
