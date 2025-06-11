import React, { useState } from 'react';
import { X, Calendar, MapPin, CreditCard, Clock } from 'lucide-react';

interface BookingModalProps {
  specialist: any;
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  phone: string;
  appointmentType: string;
  date: string;
  time: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  paymentMethod: string;
}

const BookingModal: React.FC<BookingModalProps> = ({
  specialist,
  isOpen,
  onClose
}) => {
  const [formData, setFormData] = useState<FormData>({
    phone: '',
    appointmentType: '',
    date: '',
    time: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    paymentMethod: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const appointmentTypes = [
    { value: 'consulta-individual', label: 'Consulta Individual - R$ 120', price: 120 },
    { value: 'terapia-casal', label: 'Terapia de Casal - R$ 180', price: 180 },
    { value: 'sessao-grupo', label: 'Sessão em Grupo - R$ 80', price: 80 },
    { value: 'avaliacao-psicologica', label: 'Avaliação Psicológica - R$ 200', price: 200 }
  ];

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const states = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
    'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const fetchAddressByCep = async (cep: string) => {
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        
        if (!data.erro) {
          setFormData(prev => ({
            ...prev,
            street: data.logradouro || '',
            neighborhood: data.bairro || '',
            city: data.localidade || '',
            state: data.uf || ''
          }));
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      }
    }
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, '');
    setFormData(prev => ({ ...prev, cep }));
    
    if (cep.length === 8) {
      fetchAddressByCep(cep);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.phone) newErrors.phone = 'Telefone é obrigatório';
    if (!formData.appointmentType) newErrors.appointmentType = 'Tipo de atendimento é obrigatório';
    if (!formData.date) newErrors.date = 'Data é obrigatória';
    if (!formData.time) newErrors.time = 'Horário é obrigatório';
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Forma de pagamento é obrigatória';

    // Validate address only if it's not online consultation
    if (formData.appointmentType !== 'online') {
      if (!formData.cep) newErrors.cep = 'CEP é obrigatório';
      if (!formData.street) newErrors.street = 'Logradouro é obrigatório';
      if (!formData.number) newErrors.number = 'Número é obrigatório';
      if (!formData.neighborhood) newErrors.neighborhood = 'Bairro é obrigatório';
      if (!formData.city) newErrors.city = 'Cidade é obrigatória';
      if (!formData.state) newErrors.state = 'Estado é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const selectedType = appointmentTypes.find(type => type.value === formData.appointmentType);
    const isNow = formData.date === new Date().toISOString().split('T')[0] && formData.time === 'agora';
    
    let message = `🌟 *AGENDAMENTO DE CONSULTA* 🌟\n\n`;
    message += `👨‍⚕️ *Especialista:* ${specialist.name}\n`;
    message += `🎯 *Especialidade:* ${specialist.specialty}\n\n`;
    message += `📋 *DADOS DO AGENDAMENTO:*\n`;
    message += `📞 *Telefone:* ${formData.phone}\n`;
    message += `💼 *Tipo:* ${selectedType?.label}\n`;
    
    if (isNow) {
      message += `⚡ *Atendimento:* AGORA (Imediato)\n`;
    } else {
      message += `📅 *Data:* ${new Date(formData.date).toLocaleDateString('pt-BR')}\n`;
      message += `🕐 *Horário:* ${formData.time}\n`;
    }
    
    message += `💳 *Pagamento:* ${formData.paymentMethod === 'credit' ? 'Cartão de Crédito' : 'PIX'}\n\n`;
    
    if (formData.appointmentType !== 'online') {
      message += `📍 *ENDEREÇO:*\n`;
      message += `${formData.street}, ${formData.number}`;
      if (formData.complement) message += ` - ${formData.complement}`;
      message += `\n${formData.neighborhood}, ${formData.city} - ${formData.state}\n`;
      message += `CEP: ${formData.cep}\n\n`;
    }
    
    message += `✨ *Valor promocional aplicado!*\n`;
    message += `🎉 Aguardo confirmação do agendamento!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5511999999999?text=${encodedMessage}`, '_blank');
    
    onClose();
  };

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>

        <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Agendar Consulta</h3>
            <p className="mt-2 text-lg text-indigo-600">
              {specialist?.name} - {specialist?.specialty}
            </p>
            <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-semibold">🎉 Oferta especial! Valores promocionais aplicados</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de Celular *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(11) 99999-9999"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>

              {/* Appointment Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Atendimento *
                </label>
                <select
                  name="appointmentType"
                  value={formData.appointmentType}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.appointmentType ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Selecione o tipo</option>
                  {appointmentTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.appointmentType && <p className="mt-1 text-sm text-red-600">{errors.appointmentType}</p>}
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data da Consulta *
                </label>
                <input type="date"
                  value={formData.date}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.appointmentType ? 'border-red-500' : 'border-gray-300'
                  }`}
                  ></input>
                {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Horário *
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.time ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Selecione o horário</option>
                  {formData.date === getTodayDate() && (
                    <option value="agora">🚀 Agora (Atendimento Imediato)</option>
                  )}
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
              </div>
            </div>

            {/* Address Section - Only show if not online */}
            {formData.appointmentType && formData.appointmentType !== 'online' && (
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Endereço para Atendimento
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CEP *</label>
                    <input
                      type="text"
                      name="cep"
                      value={formData.cep}
                      onChange={handleCepChange}
                      placeholder="00000-000"
                      maxLength={8}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 ${
                        errors.cep ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.cep && <p className="mt-1 text-sm text-red-600">{errors.cep}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Logradouro *</label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      placeholder="Rua, Avenida, etc."
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 ${
                        errors.street ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.street && <p className="mt-1 text-sm text-red-600">{errors.street}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Número *</label>
                    <input
                      type="text"
                      name="number"
                      value={formData.number}
                      onChange={handleInputChange}
                      placeholder="123"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 ${
                        errors.number ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.number && <p className="mt-1 text-sm text-red-600">{errors.number}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Complemento</label>
                    <input
                      type="text"
                      name="complement"
                      value={formData.complement}
                      onChange={handleInputChange}
                      placeholder="Apto, Bloco, etc."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bairro *</label>
                    <input
                      type="text"
                      name="neighborhood"
                      value={formData.neighborhood}
                      onChange={handleInputChange}
                      placeholder="Bairro"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 ${
                        errors.neighborhood ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.neighborhood && <p className="mt-1 text-sm text-red-600">{errors.neighborhood}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cidade *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Cidade"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 ${
                        errors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Estado *</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 ${
                        errors.state ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Selecione</option>
                      {states.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Payment Method */}
            <div className="border-t pt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Forma de Pagamento
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit"
                    checked={formData.paymentMethod === 'credit'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <div>
                    <p className="font-medium">Cartão de Crédito</p>
                    <p className="text-sm text-gray-500">Pagamento seguro</p>
                  </div>
                </label>
                <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="pix"
                    checked={formData.paymentMethod === 'pix'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <div>
                    <p className="font-medium">PIX</p>
                    <p className="text-sm text-gray-500">Instantâneo</p>
                  </div>
                </label>
              </div>
              {errors.paymentMethod && <p className="mt-2 text-sm text-red-600">{errors.paymentMethod}</p>}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Enviar Agendamento
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;