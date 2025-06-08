import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 overflow-hidden">
      <div className="absolute inset-0">
        <svg
          className="absolute bottom-0 left-0 right-0 text-white opacity-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,224L40,229.3C80,235,160,245,240,245.3C320,245,400,235,480,202.7C560,171,640,117,720,106.7C800,96,880,128,960,138.7C1040,149,1120,139,1200,144C1280,149,1360,171,1400,181.3L1440,192L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
        <div className="md:w-3/5">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Encontre o psicólogo ideal para você
          </h1>
          <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
            Filtre por especialidade e marque sua consulta online ou presencial
          </p>
          <div className="mt-10">
            <a
              href="#specialists"
              className="px-8 py-4 bg-white text-indigo-600 font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
            >
              Ver Especialistas
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;