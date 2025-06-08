import React from 'react';
import { Search, Calendar, Heart } from 'lucide-react';

const HowItWorks: React.FC = () => {
  return (
    <section className="py-24 bg-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800">Como Funciona</h2>
          <p className="mt-4 text-xl text-gray-600">Três passos simples para iniciar sua jornada de autoconhecimento</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mb-6">
              <Search className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Escolha o psicólogo</h3>
            <p className="text-gray-600">
              Encontre o profissional ideal com base na especialidade, avaliações e abordagem que melhor se adapta às suas necessidades.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mb-6">
              <Calendar className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Agende sua consulta</h3>
            <p className="text-gray-600">
              Escolha a data e horário disponíveis, selecione entre atendimento online ou presencial e confirme sua consulta.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mb-6">
              <Heart className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Comece sua jornada</h3>
            <p className="text-gray-600">
              Inicie seu processo de autoconhecimento e desenvolvimento pessoal com o suporte profissional adequado.
            </p>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#" 
            className="inline-block px-8 py-3 text-lg font-medium text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
          >
            Encontrar meu psicólogo
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;