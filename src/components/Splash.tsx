import React from "react";

const Splash = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full md:w-1/2 lg:w-1/3 min-h-screen bg-white relative flex flex-col items-center justify-center">
        <img
          src="/logo.svg"
          alt="Hajj travelers"
          className="w-52 h-52 object-contain mb-4"
        />
      </div>
    </div>
  );
};

export default Splash;
