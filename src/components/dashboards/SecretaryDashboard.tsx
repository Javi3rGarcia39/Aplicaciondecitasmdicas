import React from 'react';
import { Calendar, Clock, Phone, Users, Plus, CheckCircle, AlertCircle, ChevronRight } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

interface SecretaryDashboardProps {
  onNavigate: (view: string) => void;
}

export function SecretaryDashboard({ onNavigate }: SecretaryDashboardProps) {
  const stats = [
    {
      name: 'Citas Hoy',
      value: '28',
      icon: Calendar,
      color: 'bg-blue-500',
    },
    {
      name: 'Llamadas Pendientes',
      value: '5',
      icon: Phone,
      color: 'bg-orange-500',
    },
    {
      name: 'Confirmadas',
      value: '22',
      icon: CheckCircle,
      color: 'bg-green-500',
    },
    {
      name: 'Por Confirmar',
      value: '6',
      icon: AlertCircle,
      color: 'bg-yellow-500',
    },
  ];

  const todayAppointments = [
    {
      time: '09:00',
      patient: 'María González',
      doctor: 'Dr. García',
      type: 'Consulta General',
      status: 'confirmada',
      phone: '+1234567890',
    },
    {
      time: '09:30',
      patient: 'Carlos López',
      doctor: 'Dra. Rodríguez',
      type: 'Cardiología',
      status: 'pendiente',
      phone: '+1234567891',
    },
    {
      time: '10:00',
      patient: 'Ana Martínez',
      doctor: 'Dr. Mendoza',
      type: 'Dermatología',
      status: 'confirmada',
      phone: '+1234567892',
    },
    {
      time: '10:30',
      patient: 'Luis Herrera',
      doctor: 'Dr. García',
      type: 'Control',
      status: 'cancelada',
      phone: '+1234567893',
    },
    {
      time: '11:00',
      patient: 'Sofia Ruiz',
      doctor: 'Dra. Torres',
      type: 'Pediatría',
      status: 'confirmada',
      phone: '+1234567894',
    },
  ];

  const pendingTasks = [
    {
      task: 'Confirmar cita de Carlos López',
      priority: 'alta',
      time: '09:30',
      type: 'llamada',
    },
    {
      task: 'Reprogramar cita de Luis Herrera',
      priority: 'media',
      time: '10:30',
      type: 'reagendar',
    },
    {
      task: 'Enviar recordatorios del día siguiente',
      priority: 'baja',
      time: 'Todo el día',
      type: 'recordatorio',
    },
    {
      task: 'Actualizar información de Ana Martínez',
      priority: 'media',
      time: 'Pendiente',
      type: 'actualización',
    },
  ];

  const quickActions = [
    {
      title: 'Nueva Cita',
      description: 'Agendar cita para un paciente',
      action: () => onNavigate('schedule'),
      icon: Plus,
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      title: 'Gestionar Citas',
      description: 'Ver y modificar citas existentes',
      action: () => onNavigate('appointments'),
      icon: Calendar,
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      title: 'Directorio Médico',
      description: 'Consultar horarios de médicos',
      action: () => onNavigate('doctors'),
      icon: Users,
      color: 'bg-purple-600 hover:bg-purple-700',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmada':
        return 'bg-green-100 text-green-800';
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelada':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta':
        return 'bg-red-100 text-red-800';
      case 'media':
        return 'bg-yellow-100 text-yellow-800';
      case 'baja':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-lg p-6 text-white">
        <div className="flex items-center space-x-3">
          <Users className="h-8 w-8" />
          <div>
            <h1 className="text-2xl mb-1">Panel de Secretaría</h1>
            <p className="text-green-100">
              Gestiona citas y brinda atención excepcional a los pacientes
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
        {/* Today's Appointments */}
        <Card>
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg text-gray-900">Citas de Hoy</h2>
                <p className="text-sm text-gray-600">Miércoles, 20 de Agosto</p>
              </div>
              <Button variant="outline" size="sm">
                Ver Todas
              </Button>
            </div>
          </div>
          <div className="divide-y max-h-96 overflow-y-auto">
            {todayAppointments.map((appointment, index) => (
              <div key={index} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="text-sm text-blue-600 min-w-0">
                      {appointment.time}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-gray-900 truncate">{appointment.patient}</h3>
                      <p className="text-sm text-gray-600">
                        {appointment.doctor} • {appointment.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                    {appointment.status === 'pendiente' && (
                      <button className="text-blue-600 hover:text-blue-800 p-1">
                        <Phone className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Pending Tasks */}
        <Card>
          <div className="p-6 border-b">
            <h2 className="text-lg text-gray-900">Tareas Pendientes</h2>
          </div>
          <div className="divide-y">
            {pendingTasks.map((task, index) => (
              <div key={index} className="p-4 hover:bg-gray-50 cursor-pointer group">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1">{task.task}</h3>
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      <span>{task.time}</span>
                      <span className="capitalize">{task.type}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Stats Summary */}
      <Card className="bg-green-50 border-green-200">
        <div className="p-6">
          <h3 className="text-lg text-gray-900 mb-4">Resumen del Día</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Total citas</p>
              <p className="text-xl text-green-600">28</p>
            </div>
            <div>
              <p className="text-gray-600">Confirmadas</p>
              <p className="text-xl text-green-600">22</p>
            </div>
            <div>
              <p className="text-gray-600">Canceladas</p>
              <p className="text-xl text-red-600">1</p>
            </div>
            <div>
              <p className="text-gray-600">Pendientes</p>
              <p className="text-xl text-yellow-600">5</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}