import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a 
        href="#" 
        className="flex items-center bg-green-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-200 transform hover:scale-105"
      >
        <MessageCircle className="h-6 w-6 mr-2" />
        <span className="hidden md:inline">Fale com a gente</span>
      </a>
    </div>
  );
};

export default WhatsAppButton;