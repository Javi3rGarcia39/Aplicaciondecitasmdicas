import React, { useState } from 'react';
import { Users, Calendar, TrendingUp, Settings, UserPlus, Activity, AlertCircle, BarChart3 } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

interface AdminDashboardProps {
  onNavigate: (view: string) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const stats = [
    {
      name: 'Total Usuarios',
      value: '156',
      change: '+12%',
      changeType: 'positive' as const,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      name: 'Citas Hoy',
      value: '48',
      change: '+8%',
      changeType: 'positive' as const,
      icon: Calendar,
      color: 'bg-green-500',
    },
    {
      name: 'Ingresos Mensual',
      value: '$24,580',
      change: '+15%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
    {
      name: 'Eficiencia Sistema',
      value: '97.2%',
      change: '-0.3%',
      changeType: 'negative' as const,
      icon: Activity,
      color: 'bg-orange-500',
    },
  ];

  const recentUsers = [
    { name: 'Dr. Ana Ruiz', role: 'Médico', specialty: 'Cardiología', status: 'Activo', date: '2025-08-20' },
    { name: 'María Recepción', role: 'Secretaria', specialty: 'Recepción', status: 'Activo', date: '2025-08-19' },
    { name: 'Carlos López', role: 'Paciente', specialty: '-', status: 'Pendiente', date: '2025-08-18' },
    { name: 'Dra. Sofia Vega', role: 'Médico', specialty: 'Pediatría', status: 'Activo', date: '2025-08-17' },
  ];

  const systemAlerts = [
    { type: 'warning', message: 'Sistema de backup programado para esta noche', time: '2 horas' },
    { type: 'info', message: '3 usuarios nuevos requieren aprobación', time: '4 horas' },
    { type: 'success', message: 'Actualización del sistema completada', time: '1 día' },
  ];

  const quickActions = [
    {
      title: 'Gestionar Usuarios',
      description: 'Crear, editar y gestionar usuarios del sistema',
      action: () => onNavigate('users'),
      icon: Users,
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      title: 'Reportes y Análisis',
      description: 'Ver estadísticas y reportes del sistema',
      action: () => onNavigate('reports'),
      icon: BarChart3,
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      title: 'Configuración',
      description: 'Configurar parámetros del sistema',
      action: () => onNavigate('settings'),
      icon: Settings,
      color: 'bg-purple-600 hover:bg-purple-700',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg p-6 text-white">
        <h1 className="text-2xl mb-2">Panel de Administración</h1>
        <p className="text-purple-100">
          Gestiona y supervisa todas las operaciones del sistema AmatiClinic-G5
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.name}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    stat.changeType === 'positive' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">vs mes anterior</span>
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
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
        {/* Recent Users */}
        <Card>
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-gray-900">Usuarios Recientes</h2>
              <Button variant="outline" size="sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Nuevo Usuario
              </Button>
            </div>
          </div>
          <div className="divide-y">
            {recentUsers.map((user, index) => (
              <div key={index} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-gray-900 mb-1">{user.name}</h3>
                    <p className="text-sm text-gray-600">
                      {user.role} {user.specialty !== '-' && `• ${user.specialty}`}
                    </p>
                    <p className="text-xs text-gray-500">Registrado: {user.date}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded ${
                    user.status === 'Activo' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* System Alerts */}
        <Card>
          <div className="p-6 border-b">
            <h2 className="text-lg text-gray-900">Alertas del Sistema</h2>
          </div>
          <div className="divide-y">
            {systemAlerts.map((alert, index) => (
              <div key={index} className="p-4 hover:bg-gray-50">
                <div className="flex items-start space-x-3">
                  <div className={`p-1 rounded ${
                    alert.type === 'warning' ? 'bg-yellow-100' :
                    alert.type === 'info' ? 'bg-blue-100' : 'bg-green-100'
                  }`}>
                    <AlertCircle className={`h-4 w-4 ${
                      alert.type === 'warning' ? 'text-yellow-600' :
                      alert.type === 'info' ? 'text-blue-600' : 'text-green-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{alert.message}</p>
                    <p className="text-xs text-gray-500">Hace {alert.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}