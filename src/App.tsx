import React, { useState } from 'react';
import { Calendar, Clock, User, Stethoscope, Plus, Menu, X, Users, Settings, BarChart3, FileText, LogOut } from 'lucide-react';
import { AuthProvider, useAuth } from './components/AuthContext';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { DashboardView } from './components/DashboardView';
import { ScheduleAppointment } from './components/ScheduleAppointment';
import { MyAppointments } from './components/MyAppointments';
import { DoctorsList } from './components/DoctorsList';
import { AdminDashboard } from './components/dashboards/AdminDashboard';
import { DoctorDashboard } from './components/dashboards/DoctorDashboard';
import { SecretaryDashboard } from './components/dashboards/SecretaryDashboard';

function AppContent() {
  const { user, logout } = useAuth();
  const [activeView, setActiveView] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Si no hay usuario logueado, mostrar pantallas de autenticación
  if (!user) {
    return authMode === 'login' ? (
      <LoginForm onSwitchToRegister={() => setAuthMode('register')} />
    ) : (
      <RegisterForm onSwitchToLogin={() => setAuthMode('login')} />
    );
  }

  // Obtener elementos de navegación según el rol del usuario
  const getNavigationItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Inicio', icon: Calendar },
    ];

    switch (user.role) {
      case 'administrador':
        return [
          ...baseItems,
          { id: 'users', label: 'Usuarios', icon: Users },
          { id: 'reports', label: 'Reportes', icon: BarChart3 },
          { id: 'settings', label: 'Configuración', icon: Settings },
        ];
      case 'medico':
        return [
          ...baseItems,
          { id: 'patients', label: 'Pacientes', icon: Users },
          { id: 'schedule', label: 'Mi Agenda', icon: Calendar },
          { id: 'consultations', label: 'Consultas', icon: FileText },
        ];
      case 'secretaria':
        return [
          ...baseItems,
          { id: 'appointments', label: 'Citas', icon: Calendar },
          { id: 'patients', label: 'Pacientes', icon: Users },
          { id: 'doctors', label: 'Médicos', icon: Stethoscope },
        ];
      case 'paciente':
        return [
          ...baseItems,
          { id: 'schedule', label: 'Agendar Cita', icon: Plus },
          { id: 'appointments', label: 'Mis Citas', icon: Clock },
          { id: 'doctors', label: 'Médicos', icon: Stethoscope },
        ];
      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems();

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        if (user.role === 'administrador') {
          return <AdminDashboard onNavigate={setActiveView} />;
        } else if (user.role === 'medico') {
          return <DoctorDashboard onNavigate={setActiveView} />;
        } else if (user.role === 'secretaria') {
          return <SecretaryDashboard onNavigate={setActiveView} />;
        }
        return <DashboardView onNavigate={setActiveView} />;
      case 'schedule':
        return <ScheduleAppointment />;
      case 'appointments':
        return <MyAppointments />;
      case 'doctors':
        return <DoctorsList />;
      case 'users':
        return (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg text-gray-900 mb-2">Gestión de Usuarios</h3>
            <p className="text-gray-600">Esta funcionalidad estará disponible próximamente</p>
          </div>
        );
      case 'reports':
        return (
          <div className="text-center py-12">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg text-gray-900 mb-2">Reportes y Análisis</h3>
            <p className="text-gray-600">Esta funcionalidad estará disponible próximamente</p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-12">
            <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg text-gray-900 mb-2">Configuración del Sistema</h3>
            <p className="text-gray-600">Esta funcionalidad estará disponible próximamente</p>
          </div>
        );
      case 'patients':
        return (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg text-gray-900 mb-2">Gestión de Pacientes</h3>
            <p className="text-gray-600">Esta funcionalidad estará disponible próximamente</p>
          </div>
        );
      case 'consultations':
        return (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg text-gray-900 mb-2">Consultas Médicas</h3>
            <p className="text-gray-600">Esta funcionalidad estará disponible próximamente</p>
          </div>
        );
      default:
        return <DashboardView onNavigate={setActiveView} />;
    }
  };

  const getRoleColor = () => {
    switch (user.role) {
      case 'administrador':
        return 'bg-purple-100 text-purple-800';
      case 'medico':
        return 'bg-red-100 text-red-800';
      case 'secretaria':
        return 'bg-green-100 text-green-800';
      case 'paciente':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleLabel = () => {
    switch (user.role) {
      case 'administrador':
        return 'Administrador';
      case 'medico':
        return 'Médico';
      case 'secretaria':
        return 'Secretaria';
      case 'paciente':
        return 'Paciente';
      default:
        return 'Usuario';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Stethoscope className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">
                AmatiClinic-G5
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                    activeView === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            {/* User Profile */}
            <div className="hidden md:flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm text-gray-700">{user.name}</p>
                <span className={`text-xs px-2 py-1 rounded ${getRoleColor()}`}>
                  {getRoleLabel()}
                </span>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <button
                onClick={logout}
                className="text-gray-400 hover:text-gray-600 p-1"
                title="Cerrar sesión"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center w-full px-3 py-2 rounded-md text-left transition-colors ${
                    activeView === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </button>
              ))}
              <div className="border-t pt-3 mt-3">
                <div className="px-3 py-2">
                  <p className="text-sm text-gray-700">{user.name}</p>
                  <span className={`text-xs px-2 py-1 rounded ${getRoleColor()}`}>
                    {getRoleLabel()}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center w-full px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {renderView()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}