import React from 'react';
import { Calendar, Clock, Users, TrendingUp, Plus, ChevronRight } from 'lucide-react';

interface DashboardViewProps {
  onNavigate: (view: string) => void;
}

export function DashboardView({ onNavigate }: DashboardViewProps) {
  const stats = [
    {
      name: 'Citas Programadas',
      value: '12',
      icon: Calendar,
      color: 'bg-blue-500',
    },
    {
      name: 'Próxima Cita',
      value: '2 días',
      icon: Clock,
      color: 'bg-green-500',
    },
    {
      name: 'Médicos Disponibles',
      value: '8',
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      name: 'Citas este Mes',
      value: '24',
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ];

  const quickActions = [
    {
      title: 'Agendar Nueva Cita',
      description: 'Programa una cita con tu médico preferido',
      action: () => onNavigate('schedule'),
      icon: Plus,
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      title: 'Ver Mis Citas',
      description: 'Revisa tus citas programadas',
      action: () => onNavigate('appointments'),
      icon: Calendar,
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      title: 'Médicos',
      description: 'Conoce nuestro equipo médico',
      action: () => onNavigate('doctors'),
      icon: Users,
      color: 'bg-purple-600 hover:bg-purple-700',
    },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. García López',
      specialty: 'Medicina General',
      date: '2025-08-22',
      time: '10:00',
    },
    {
      id: 2,
      doctor: 'Dra. María Rodríguez',
      specialty: 'Cardiología',
      date: '2025-08-25',
      time: '14:30',
    },
    {
      id: 3,
      doctor: 'Dr. Carlos Mendoza',
      specialty: 'Dermatología',
      date: '2025-08-28',
      time: '09:15',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
        <h1 className="text-2xl mb-2">Bienvenido a AmatiClinic-G5</h1>
        <p className="text-blue-100">
          Gestiona tus citas médicas de manera fácil y eficiente
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-2xl text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className={`${action.color} p-6 rounded-lg text-white text-left transition-colors group`}
          >
            <div className="flex items-start justify-between">
              <div>
                <action.icon className="h-8 w-8 mb-4" />
                <h3 className="text-lg mb-2">{action.title}</h3>
                <p className="text-sm text-white/80">{action.description}</p>
              </div>
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        ))}
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-lg text-gray-900">Próximas Citas</h2>
        </div>
        <div className="divide-y">
          {upcomingAppointments.map((appointment) => (
            <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-900 mb-1">{appointment.doctor}</h3>
                  <p className="text-sm text-gray-600 mb-1">{appointment.specialty}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {appointment.date}
                    <Clock className="h-4 w-4 ml-4 mr-1" />
                    {appointment.time}
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-800">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}