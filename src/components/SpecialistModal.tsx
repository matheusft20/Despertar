import React, { useState, useEffect } from 'react';
import { X, Star, Calendar } from 'lucide-react';
import BookingModal from './BookingModal';

interface SpecialistModalProps {
  specialist: any;
  isOpen: boolean;
  onClose: () => void;
  onContactClick?: () => void;
}

const SpecialistModal: React.FC<SpecialistModalProps> = ({
  specialist,
  isOpen,
  onClose,
  onContactClick
}) => {
  // Timer de 5 minutos
  const [secondsLeft, setSecondsLeft] = useState(5 * 60);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsLeft]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
            onClick={onClose}
          ></div>

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
              {/* Substitui imagem por vídeo */}
              <div className="md:w-1/3">
                <video
                  src={psychologists.video}
                  className="w-full h-70 md:h-64 object-cover rounded-lg"
                  autoPlay
                  muted
                  loop
                  playsInline
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

                {/* Promotional Price Display */}
                <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-500 line-through">De R$ {specialist.price}</p>
                      <p className="text-2xl font-bold text-green-600">Por R$ 110</p>
                      <p className="text-sm text-green-700 font-medium">🎉 Oferta especial!</p>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className="inline-block px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full animate-pulse">
                        32% OFF
                      </span>
                      <span className="text-lg font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-lg animate-pulse">
                        Expira em {formatTime(secondsLeft)}
                      </span>
                    </div>
                  </div>
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
                    <p className="text-sm text-gray-500">CRP</p>
                    <p className="font-medium">{specialist.detailedInfo.crp}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pacientes atendidos</p>
                    <p className="font-medium">{specialist.detailedInfo.patientCount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Modalidade</p>
                    <p className="font-medium">Online e Presencial</p>
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

                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => setIsBookingModalOpen(true)}
                    className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Agende sua primeira sessão
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        specialist={specialist}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
};

export default SpecialistModal;
