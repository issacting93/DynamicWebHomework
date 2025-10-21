import React from "react";
import Canvas from "../assets/Canvas.png";

export default function DropdownPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black p-10">
      <div className="text-white text-center mb-8">
        <h1 className="text-2xl font-bold mb-4">Application Setup</h1>
        <p className="mb-4">This page shows the application architecture and component connections.</p>
      </div>
      
      <div className="w-full  ">
        <img 
          src={Canvas} 
          alt="Application Architecture Canvas" 
          className="w-full rounded-lg shadow-lg" 
        />
      </div>
    </div>
  );
}
