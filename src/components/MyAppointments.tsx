import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Phone, Mail, Edit, Trash2, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

export function MyAppointments() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: 'Dr. García López',
      specialty: 'Medicina General',
      date: '2025-08-22',
      time: '10:00',
      status: 'confirmada',
      reason: 'Consulta de rutina',
      location: 'Consultorio 101',
      avatar: '👨‍⚕️',
    },
    {
      id: 2,
      doctor: 'Dra. María Rodríguez',
      specialty: 'Cardiología',
      date: '2025-08-25',
      time: '14:30',
      status: 'pendiente',
      reason: 'Control cardiovascular',
      location: 'Consultorio 205',
      avatar: '👩‍⚕️',
    },
    {
      id: 3,
      doctor: 'Dr. Carlos Mendoza',
      specialty: 'Dermatología',
      date: '2025-08-28',
      time: '09:15',
      status: 'confirmada',
      reason: 'Revisión lunar',
      location: 'Consultorio 150',
      avatar: '👨‍⚕️',
    },
    {
      id: 4,
      doctor: 'Dr. García López',
      specialty: 'Medicina General',
      date: '2025-08-15',
      time: '11:00',
      status: 'completada',
      reason: 'Chequeo general',
      location: 'Consultorio 101',
      avatar: '👨‍⚕️',
    },
  ]);

  const [filter, setFilter] = useState('todas');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmada':
        return 'bg-green-100 text-green-800';
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'completada':
        return 'bg-gray-100 text-gray-800';
      case 'cancelada':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmada':
        return <CheckCircle className="h-4 w-4" />;
      case 'pendiente':
        return <Clock className="h-4 w-4" />;
      case 'completada':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
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

  const isUpcoming = (dateString: string, timeString: string) => {
    const appointmentDate = new Date(`${dateString}T${timeString}`);
    return appointmentDate > new Date();
  };

  const filteredAppointments = appointments.filter(appointment => {
    if (filter === 'todas') return true;
    if (filter === 'proximas') return isUpcoming(appointment.date, appointment.time);
    if (filter === 'pasadas') return !isUpcoming(appointment.date, appointment.time);
    return appointment.status === filter;
  });

  const handleCancelAppointment = (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas cancelar esta cita?')) {
      setAppointments(prev => 
        prev.map(app => 
          app.id === id ? { ...app, status: 'cancelada' } : app
        )
      );
    }
  };

  const upcomingCount = appointments.filter(app => isUpcoming(app.date, app.time)).length;
  const confirmedCount = appointments.filter(app => app.status === 'confirmada').length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl text-gray-900 mb-2">Mis Citas</h1>
        <p className="text-gray-600">
          Gestiona y revisa todas tus citas médicas
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="bg-blue-500 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-2xl text-gray-900">{upcomingCount}</p>
              <p className="text-sm text-gray-600">Próximas Citas</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="bg-green-500 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-2xl text-gray-900">{confirmedCount}</p>
              <p className="text-sm text-gray-600">Confirmadas</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="bg-purple-500 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-2xl text-gray-900">{appointments.length}</p>
              <p className="text-sm text-gray-600">Total de Citas</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'todas', label: 'Todas' },
            { key: 'proximas', label: 'Próximas' },
            { key: 'confirmada', label: 'Confirmadas' },
            { key: 'pendiente', label: 'Pendientes' },
            { key: 'pasadas', label: 'Pasadas' },
          ].map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                filter === filterOption.key
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filterOption.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.map((appointment) => (
          <Card key={appointment.id} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{appointment.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg text-gray-900">{appointment.doctor}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${getStatusColor(appointment.status)}`}>
                      {getStatusIcon(appointment.status)}
                      <span className="ml-1 capitalize">{appointment.status}</span>
                    </span>
                  </div>
                  <p className="text-gray-600 mb-1">{appointment.specialty}</p>
                  <p className="text-sm text-gray-500 mb-2">{appointment.reason}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(appointment.date)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {appointment.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {appointment.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {isUpcoming(appointment.date, appointment.time) && appointment.status !== 'cancelada' && (
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Modificar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCancelAppointment(appointment.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Cancelar
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}

        {filteredAppointments.length === 0 && (
          <Card className="p-12 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">No hay citas</h3>
            <p className="text-gray-600">
              No se encontraron citas con los filtros seleccionados.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}