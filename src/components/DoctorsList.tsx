import React, { useState } from 'react';
import { Search, Stethoscope, MapPin, Clock, Phone, Mail, Star, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

export function DoctorsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('todas');

  const doctors = [
    {
      id: 1,
      name: 'Dr. García López',
      specialty: 'Medicina General',
      experience: '15 años',
      rating: 4.8,
      reviews: 124,
      location: 'Consultorio 101',
      phone: '+1234567890',
      email: 'garcia@clinica.com',
      avatar: '👨‍⚕️',
      about: 'Especialista en medicina interna con amplia experiencia en diagnóstico y tratamiento de enfermedades comunes.',
      schedule: ['Lunes - Viernes: 9:00 - 17:00'],
      availableToday: true,
    },
    {
      id: 2,
      name: 'Dra. María Rodríguez',
      specialty: 'Cardiología',
      experience: '12 años',
      rating: 4.9,
      reviews: 89,
      location: 'Consultorio 205',
      phone: '+1234567891',
      email: 'rodriguez@clinica.com',
      avatar: '👩‍⚕️',
      about: 'Cardióloga especializada en prevención y tratamiento de enfermedades cardiovasculares.',
      schedule: ['Martes - Jueves: 14:00 - 18:00', 'Sábados: 9:00 - 13:00'],
      availableToday: false,
    },
    {
      id: 3,
      name: 'Dr. Carlos Mendoza',
      specialty: 'Dermatología',
      experience: '10 años',
      rating: 4.7,
      reviews: 156,
      location: 'Consultorio 150',
      phone: '+1234567892',
      email: 'mendoza@clinica.com',
      avatar: '👨‍⚕️',
      about: 'Dermatólogo con expertise en dermatología clínica, quirúrgica y cosmética.',
      schedule: ['Lunes, Miércoles, Viernes: 10:00 - 16:00'],
      availableToday: true,
    },
    {
      id: 4,
      name: 'Dra. Ana Torres',
      specialty: 'Pediatría',
      experience: '18 años',
      rating: 4.9,
      reviews: 203,
      location: 'Consultorio 301',
      phone: '+1234567893',
      email: 'torres@clinica.com',
      avatar: '👩‍⚕️',
      about: 'Pediatra dedicada al cuidado integral de niños y adolescentes desde el nacimiento.',
      schedule: ['Lunes - Viernes: 8:00 - 14:00'],
      availableToday: true,
    },
    {
      id: 5,
      name: 'Dr. Luis Herrera',
      specialty: 'Traumatología',
      experience: '14 años',
      rating: 4.6,
      reviews: 67,
      location: 'Consultorio 180',
      phone: '+1234567894',
      email: 'herrera@clinica.com',
      avatar: '👨‍⚕️',
      about: 'Traumatólogo especializado en lesiones deportivas y cirugía ortopédica.',
      schedule: ['Martes, Jueves: 15:00 - 19:00'],
      availableToday: false,
    },
    {
      id: 6,
      name: 'Dra. Carmen Silva',
      specialty: 'Ginecología',
      experience: '16 años',
      rating: 4.8,
      reviews: 91,
      location: 'Consultorio 250',
      phone: '+1234567895',
      email: 'silva@clinica.com',
      avatar: '👩‍⚕️',
      about: 'Ginecóloga especializada en salud reproductiva y cuidado integral de la mujer.',
      schedule: ['Lunes, Miércoles, Viernes: 13:00 - 17:00'],
      availableToday: true,
    },
  ];

  const specialties = [
    'todas',
    'Medicina General',
    'Cardiología',
    'Dermatología',
    'Pediatría',
    'Traumatología',
    'Ginecología',
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'todas' || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl text-gray-900 mb-2">Nuestros Médicos</h1>
        <p className="text-gray-600">
          Conoce a nuestro equipo de profesionales de la salud
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar médico o especialidad..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Specialty Filter */}
          <div className="lg:w-64">
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty === 'todas' ? 'Todas las especialidades' : specialty}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="text-4xl">{doctor.avatar}</div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl text-gray-900">{doctor.name}</h3>
                  {doctor.availableToday && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Disponible hoy
                    </span>
                  )}
                </div>

                <p className="text-blue-600 mb-1">{doctor.specialty}</p>
                <p className="text-sm text-gray-600 mb-3">{doctor.experience} de experiencia</p>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex">{renderStars(doctor.rating)}</div>
                  <span className="text-sm text-gray-600">
                    {doctor.rating} ({doctor.reviews} reseñas)
                  </span>
                </div>

                {/* About */}
                <p className="text-sm text-gray-600 mb-4">{doctor.about}</p>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    {doctor.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Phone className="h-4 w-4 mr-2" />
                    {doctor.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Mail className="h-4 w-4 mr-2" />
                    {doctor.email}
                  </div>
                </div>

                {/* Schedule */}
                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-700 mb-1">
                    <Clock className="h-4 w-4 mr-2" />
                    Horarios de atención:
                  </div>
                  {doctor.schedule.map((schedule, index) => (
                    <p key={index} className="text-sm text-gray-600 ml-6">
                      {schedule}
                    </p>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Calendar className="h-4 w-4 mr-2" />
                    Agendar Cita
                  </Button>
                  <Button variant="outline" className="text-gray-600 hover:text-gray-800">
                    Ver Perfil
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <Card className="p-12 text-center">
          <Stethoscope className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-gray-900 mb-2">No se encontraron médicos</h3>
          <p className="text-gray-600">
            Intenta ajustar los filtros de búsqueda o especialidad.
          </p>
        </Card>
      )}
    </div>
  );
}