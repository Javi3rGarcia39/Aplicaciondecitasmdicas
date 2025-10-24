import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'administrador' | 'medico' | 'secretaria' | 'paciente';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  speciality?: string; // Para médicos
  department?: string; // Para secretarias
  phone?: string;
  // Campos adicionales para pacientes
  birthDate?: string;
  documentId?: string;
  address?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  bloodType?: string;
  allergies?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone?: string;
  speciality?: string;
  department?: string;
  // Campos adicionales para pacientes
  birthDate?: string;
  documentId?: string;
  address?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  bloodType?: string;
  allergies?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Usuarios mock para demostración
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. Juan Admin',
    email: 'admin@clinica.com',
    role: 'administrador',
    phone: '+1234567890',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Dr. García López',
    email: 'garcia@clinica.com',
    role: 'medico',
    speciality: 'Medicina General',
    phone: '+1234567891',
    createdAt: '2024-02-01',
  },
  {
    id: '3',
    name: 'María Recepción',
    email: 'recepcion@clinica.com',
    role: 'secretaria',
    department: 'Recepción',
    phone: '+1234567892',
    createdAt: '2024-02-10',
  },
  {
    id: '4',
    name: 'Carlos Paciente',
    email: 'paciente@example.com',
    role: 'paciente',
    phone: '+1234567893',
    birthDate: '1985-05-15',
    documentId: '12345678',
    address: 'Calle 123 #45-67, Bogotá',
    emergencyContact: 'Ana Paciente',
    emergencyPhone: '+1234567890',
    bloodType: 'O+',
    allergies: 'Penicilina, maní',
    createdAt: '2024-03-01',
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un usuario guardado en localStorage
    const savedUser = localStorage.getItem('amaticlinic_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('amaticlinic_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simular llamada API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Buscar usuario en mock data
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser && password === '123456') { // Password simple para demo
      setUser(foundUser);
      localStorage.setItem('amaticlinic_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    
    // Simular llamada API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Verificar si el email ya existe
    const emailExists = mockUsers.some(u => u.email === userData.email);
    
    if (emailExists) {
      setIsLoading(false);
      return false;
    }
    
    // Crear nuevo usuario
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
      phone: userData.phone,
      speciality: userData.speciality,
      department: userData.department,
      birthDate: userData.birthDate,
      documentId: userData.documentId,
      address: userData.address,
      emergencyContact: userData.emergencyContact,
      emergencyPhone: userData.emergencyPhone,
      bloodType: userData.bloodType,
      allergies: userData.allergies,
      createdAt: new Date().toISOString().split('T')[0],
    };
    
    // Agregar a la lista mock (en una app real se enviaría al servidor)
    mockUsers.push(newUser);
    
    setUser(newUser);
    localStorage.setItem('amaticlinic_user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('amaticlinic_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}