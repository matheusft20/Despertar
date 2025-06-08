import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  image: string;
  role: string;
  rating: number;
  text: string;
  specialist: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Maria Silva",
    image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    role: "Professora",
    rating: 5,
    text: "A plataforma me ajudou a encontrar a psicóloga perfeita para minhas necessidades. As sessões online têm sido transformadoras.",
    specialist: "Dra. Carolina Mendes"
  },
  {
    id: 2,
    name: "João Santos",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    role: "Desenvolvedor",
    rating: 5,
    text: "Excelente experiência! O processo de agendamento é simples e os profissionais são muito qualificados.",
    specialist: "Dr. Rafael Costa"
  },
  {
    id: 3,
    name: "Ana Oliveira",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    role: "Designer",
    rating: 5,
    text: "Encontrei uma psicóloga incrível que me ajudou a superar um momento difícil. Muito grata pela plataforma!",
    specialist: "Dra. Fernanda Almeida"
  },
  {
    id: 4,
    name: "Pedro Lima",
    image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    role: "Empresário",
    rating: 5,
    text: "A flexibilidade do atendimento online foi fundamental para manter minhas sessões mesmo com uma agenda corrida.",
    specialist: "Dra. Carolina Mendes"
  }
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);

  const updateSlide = (newIndex: number) => {
    let index = newIndex;
    if (index < 0) {
      index = testimonials.length - 1;
    } else if (index >= testimonials.length) {
      index = 0;
    }
    setActiveIndex(index);
  };

  const startAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    autoPlayRef.current = setInterval(() => {
      if (isAutoPlaying) {
        updateSlide(activeIndex + 1);
      }
    }, 5000);
  };

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [activeIndex, isAutoPlaying]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">O que dizem nossos usuários</h2>
          <p className="mt-4 text-xl text-gray-600">
            Histórias reais de pessoas que encontraram o apoio que precisavam
          </p>
        </div>

        <div 
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="overflow-hidden">
            <div 
              ref={containerRef}
              className="relative flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white rounded-2xl shadow-lg p-8 mx-auto max-w-2xl">
                    <div className="flex items-center mb-6">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="ml-4">
                        <h3 className="text-xl font-semibold text-gray-900">{testimonial.name}</h3>
                        <p className="text-gray-600">{testimonial.role}</p>
                      </div>
                      <div className="ml-auto flex items-center">
                        {[...Array(testimonial.rating)].map((_, index) => (
                          <Star
                            key={index}
                            className="w-5 h-5 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 text-lg mb-4">{testimonial.text}</p>
                    <p className="text-indigo-600 font-medium">
                      Atendimento com: {testimonial.specialist}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() => updateSlide(activeIndex - 1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-all duration-200 focus:outline-none"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <button
            onClick={() => updateSlide(activeIndex + 1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-all duration-200 focus:outline-none"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => updateSlide(index)}
                className={`h-3 rounded-full transition-all duration-200 ${
                  activeIndex === index ? 'w-8 bg-indigo-600' : 'w-3 bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;