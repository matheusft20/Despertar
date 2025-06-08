import React from 'react';
import { X, Star, MessageCircle } from 'lucide-react';

interface SpecialistModalProps {
  specialist: any;
  isOpen: boolean;
  onClose: () => void;
  onContactClick: () => void;
}

const SpecialistModal: React.FC<SpecialistModalProps> = ({
  specialist,
  isOpen,
  onClose,
  onContactClick
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75\" onClick={onClose}></div>

        <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <img
                src={specialist.image}
                alt={specialist.name}
                className="w-full h-70 md:h-64 object-cover rounded-lg"
              />
            </div>

            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold text-gray-900">{specialist.name}</h3>
              <p className="mt-1 text-lg text-indigo-600">{specialist.specialty}</p>
              
              <div className="flex items-center mt-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="ml-1 text-gray-600">{specialist.rating}</span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-gray-600">{specialist.detailedInfo.reviewCount} avaliações</span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Idade</p>
                  <p className="font-medium">{specialist.detailedInfo.age} anos</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Experiência</p>
                  <p className="font-medium">{specialist.detailedInfo.experience}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pacientes atendidos</p>
                  <p className="font-medium">{specialist.detailedInfo.patientCount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Valor da consulta</p>
                  <p className="font-medium">R$ {specialist.price}</p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-gray-900">Formação</h4>
                <p className="mt-1 text-gray-600">{specialist.detailedInfo.education}</p>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold text-gray-900">Abordagem</h4>
                <p className="mt-1 text-gray-600">{specialist.detailedInfo.approach}</p>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold text-gray-900">Especializações</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {specialist.detailedInfo.specializations.map((spec: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm bg-indigo-100 text-indigo-800 rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={onContactClick}
                className="mt-6 w-full flex items-center justify-center px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Solicitar Pacote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialistModal;