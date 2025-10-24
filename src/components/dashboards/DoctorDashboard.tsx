import React from 'react';
import { Calendar, Clock, Users, FileText, Stethoscope, ChevronRight } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

interface DoctorDashboardProps {
  onNavigate: (view: string) => void;
}

export function DoctorDashboard({ onNavigate }: DoctorDashboardProps) {
  const stats = [
    {
      name: 'Pacientes Hoy',
      value: '12',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      name: 'Próxima Cita',
      value: '10:30 AM',
      icon: Clock,
      color: 'bg-green-500',
    },
    {
      name: 'Consultas Semana',
      value: '48',
      icon: Calendar,
      color: 'bg-purple-500',
    },
    {
      name: 'Pendientes',
      value: '6',
      icon: FileText,
      color: 'bg-orange-500',
    },
  ];

  const todaySchedule = [
    {
      id: 1,
      time: '09:00',
      patient: 'María González',
      type: 'Consulta General',
      status: 'confirmada',
      notes: 'Control mensual',
    },
    {
      id: 2,
      time: '10:30',
      patient: 'Carlos López',
      type: 'Primera Consulta',
      status: 'en-espera',
      notes: 'Dolor de cabeza recurrente',
    },
    {
      id: 3,
      time: '11:15',
      patient: 'Ana Rodríguez',
      type: 'Consulta de Seguimiento',
      status: 'confirmada',
      notes: 'Resultados de exámenes',
    },
    {
      id: 4,
      time: '14:00',
      patient: 'Luis Herrera',
      type: 'Consulta General',
      status: 'confirmada',
      notes: 'Chequeo preventivo',
    },
    {
      id: 5,
      time: '15:30',
      patient: 'Sofia Martín',
      type: 'Consulta Especializada',
      status: 'pendiente',
      notes: 'Evaluación síntomas',
    },
  ];

  const recentPatients = [
    {
      name: 'María González',
      lastVisit: '2025-08-15',
      diagnosis: 'Hipertensión controlada',
      nextAppointment: '2025-09-15',
    },
    {
      name: 'Carlos López',
      lastVisit: '2025-08-10',
      diagnosis: 'Migraña tensional',
      nextAppointment: '2025-08-25',
    },
    {
      name: 'Ana Rodríguez',
      lastVisit: '2025-08-08',
      diagnosis: 'Diabetes tipo 2',
      nextAppointment: '2025-08-22',
    },
  ];

  const quickActions = [
    {
      title: 'Ver Pacientes',
      description: 'Revisar historial y información de pacientes',
      action: () => onNavigate('patients'),
      icon: Users,
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      title: 'Nueva Consulta',
      description: 'Registrar nueva consulta médica',
      action: () => onNavigate('new-consultation'),
      icon: FileText,
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      title: 'Mi Agenda',
      description: 'Gestionar horarios y disponibilidad',
      action: () => onNavigate('schedule'),
      icon: Calendar,
      color: 'bg-purple-600 hover:bg-purple-700',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmada':
        return 'bg-green-100 text-green-800';
      case 'en-espera':
        return 'bg-blue-100 text-blue-800';
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
        <div className="flex items-center space-x-3">
          <Stethoscope className="h-8 w-8" />
          <div>
            <h1 className="text-2xl mb-1">Panel Médico</h1>
            <p className="text-blue-100">
              Gestiona tus consultas y pacientes de manera eficiente
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-2xl text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.name}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className={`${action.color} p-6 rounded-lg text-white text-left transition-all group hover:scale-105`}
          >
            <action.icon className="h-8 w-8 mb-4" />
            <h3 className="text-lg mb-2">{action.title}</h3>
            <p className="text-sm text-white/80">{action.description}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card>
          <div className="p-6 border-b">
            <h2 className="text-lg text-gray-900">Agenda de Hoy</h2>
            <p className="text-sm text-gray-600">Miércoles, 20 de Agosto</p>
          </div>
          <div className="divide-y max-h-96 overflow-y-auto">
            {todaySchedule.map((appointment) => (
              <div key={appointment.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="text-sm text-blue-600">{appointment.time}</div>
                    <div>
                      <h3 className="text-gray-900">{appointment.patient}</h3>
                      <p className="text-sm text-gray-600">{appointment.type}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 ml-20">{appointment.notes}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Patients */}
        <Card>
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-gray-900">Pacientes Recientes</h2>
              <Button variant="outline" size="sm">
                Ver Todos
              </Button>
            </div>
          </div>
          <div className="divide-y">
            {recentPatients.map((patient, index) => (
              <div key={index} className="p-4 hover:bg-gray-50 cursor-pointer group">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-gray-900 mb-1">{patient.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">{patient.diagnosis}</p>
                    <div className="flex items-center text-xs text-gray-500 space-x-4">
                      <span>Última: {patient.lastVisit}</span>
                      <span>Próxima: {patient.nextAppointment}</span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Today's Summary */}
      <Card className="bg-blue-50 border-blue-200">
        <div className="p-6">
          <h3 className="text-lg text-gray-900 mb-4">Resumen del Día</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Consultas programadas</p>
              <p className="text-xl text-blue-600">5</p>
            </div>
            <div>
              <p className="text-gray-600">Tiempo promedio por consulta</p>
              <p className="text-xl text-blue-600">25 min</p>
            </div>
            <div>
              <p className="text-gray-600">Pacientes nuevos</p>
              <p className="text-xl text-blue-600">1</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}