import React, { useState } from 'react';
import { Calendar, Clock, User, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

export function ScheduleAppointment() {
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [patientData, setPatientData] = useState({
    name: '',
    phone: '',
    email: '',
    reason: '',
  });

  const doctors = [
    {
      id: '1',
      name: 'Dr. García López',
      specialty: 'Medicina General',
      avatar: '👨‍⚕️',
    },
    {
      id: '2',
      name: 'Dra. María Rodríguez',
      specialty: 'Cardiología',
      avatar: '👩‍⚕️',
    },
    {
      id: '3',
      name: 'Dr. Carlos Mendoza',
      specialty: 'Dermatología',
      avatar: '👨‍⚕️',
    },
    {
      id: '4',
      name: 'Dra. Ana Torres',
      specialty: 'Pediatría',
      avatar: '👩‍⚕️',
    },
  ];

  const availableTimes = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar la cita a la base de datos
    alert('Cita agendada exitosamente!');
    console.log({
      doctor: selectedDoctor,
      date: selectedDate,
      time: selectedTime,
      patient: patientData,
    });
  };

  // Generar fechas disponibles (próximos 30 días, excluyendo domingos)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Excluir domingos (día 0)
      if (date.getDay() !== 0) {
        dates.push(date.toISOString().split('T')[0]);
      }
    }
    
    return dates.slice(0, 20);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl text-gray-900 mb-2">Agendar Nueva Cita</h1>
        <p className="text-gray-600">
          Completa la información para programar tu cita médica
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Seleccionar Médico */}
        <Card className="p-6">
          <h2 className="text-lg text-gray-900 mb-4 flex items-center">
            <User className="h-5 w-5 mr-2" />
            Seleccionar Médico
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {doctors.map((doctor) => (
              <button
                key={doctor.id}
                type="button"
                onClick={() => setSelectedDoctor(doctor.id)}
                className={`p-4 border rounded-lg text-left transition-colors ${
                  selectedDoctor === doctor.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{doctor.avatar}</span>
                  <div>
                    <h3 className="text-gray-900">{doctor.name}</h3>
                    <p className="text-sm text-gray-600">{doctor.specialty}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Seleccionar Fecha */}
        <Card className="p-6">
          <h2 className="text-lg text-gray-900 mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Seleccionar Fecha
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {getAvailableDates().map((date) => (
              <button
                key={date}
                type="button"
                onClick={() => setSelectedDate(date)}
                className={`p-3 border rounded-lg text-left transition-colors ${
                  selectedDate === date
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="text-sm text-gray-900">
                  {formatDate(date)}
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Seleccionar Horario */}
        {selectedDate && (
          <Card className="p-6">
            <h2 className="text-lg text-gray-900 mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Seleccionar Horario
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 border rounded-lg text-center transition-colors ${
                    selectedTime === time
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </Card>
        )}

        {/* Datos del Paciente */}
        <Card className="p-6">
          <h2 className="text-lg text-gray-900 mb-4 flex items-center">
            <User className="h-5 w-5 mr-2" />
            Información del Paciente
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Nombre Completo *
              </label>
              <input
                type="text"
                required
                value={patientData.name}
                onChange={(e) =>
                  setPatientData({ ...patientData, name: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ingresa tu nombre completo"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Teléfono *
              </label>
              <input
                type="tel"
                required
                value={patientData.phone}
                onChange={(e) =>
                  setPatientData({ ...patientData, phone: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ingresa tu teléfono"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={patientData.email}
                onChange={(e) =>
                  setPatientData({ ...patientData, email: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Motivo de la Consulta *
              </label>
              <textarea
                required
                value={patientData.reason}
                onChange={(e) =>
                  setPatientData({ ...patientData, reason: e.target.value })
                }
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe brevemente el motivo de tu consulta"
              />
            </div>
          </div>
        </Card>

        {/* Resumen y Confirmación */}
        {selectedDoctor && selectedDate && selectedTime && (
          <Card className="p-6 bg-blue-50 border-blue-200">
            <h2 className="text-lg text-gray-900 mb-4">Resumen de la Cita</h2>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-gray-600">Médico:</span>{' '}
                {doctors.find((d) => d.id === selectedDoctor)?.name}
              </p>
              <p>
                <span className="text-gray-600">Especialidad:</span>{' '}
                {doctors.find((d) => d.id === selectedDoctor)?.specialty}
              </p>
              <p>
                <span className="text-gray-600">Fecha:</span>{' '}
                {formatDate(selectedDate)}
              </p>
              <p>
                <span className="text-gray-600">Hora:</span> {selectedTime}
              </p>
            </div>
          </Card>
        )}

        {/* Botón de Envío */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={!selectedDoctor || !selectedDate || !selectedTime || !patientData.name || !patientData.phone || !patientData.reason}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          >
            Confirmar Cita
          </Button>
        </div>
      </form>
    </div>
  );
}