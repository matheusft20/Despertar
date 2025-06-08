import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FilterSection from '../components/FilterSection';
import PsychologistList from '../components/PsychologistList';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

function Home() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    searchTerm: '',
    specialty: 'Todas especialidades',
    isOnlineOnly: false,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <FilterSection onFilterChange={setFilters} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PsychologistList filters={filters} limit={6} />
        <div className="text-center pb-16">
          <button
            onClick={() => navigate('/especialistas')}
            className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Ver Todos os Especialistas
          </button>
        </div>
      </div>
      <Testimonials />
      <HowItWorks />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default Home;