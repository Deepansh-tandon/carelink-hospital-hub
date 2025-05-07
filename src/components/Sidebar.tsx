
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/authContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  SidebarProvider,
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarTrigger
} from '@/components/ui/sidebar';

type SidebarProps = {
  children?: React.ReactNode;
};

type SidebarItem = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

// Icons for sidebar items
const Icons = {
  Hospital: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 8.71V21H5V8.71m0 0 7-5.25 7 5.25" />
    </svg>
  ),
  Department: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9h18" />
      <path d="M3 15h18" />
      <path d="M9 3v18" />
      <path d="M15 3v18" />
    </svg>
  ),
  Staff: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Medicine: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m19 21-4-4m-7.8 1.8L21 5" />
      <path d="m2 22 5-5c1.5 1 3.2 1 4.2 0v0c.9-.9.9-2.6 0-3.5v0c-1-.9-2.7-.9-3.6 0v0c-1 1-1 2.7-.2 4.2" />
      <path d="m15.4 7.4 1.6 1.6" />
      <path d="m13 5-1 1" />
      <path d="m10 8-1.5 1.5" />
    </svg>
  ),
  Patient: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
    </svg>
  ),
  Appointment: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  ),
  Prescription: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2H4" />
      <polyline points="14 2 14 8 20 8" />
      <rect width="8" height="5" x="4" y="10" rx="1" />
      <path d="M4 15h8" />
      <path d="M4 19h8" />
    </svg>
  ),
  Bill: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
      <path d="M10 9H8" />
    </svg>
  ),
  Payment: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  ),
};

const adminItems: SidebarItem[] = [
  { name: 'Hospital Management', href: '/admin/hospital', icon: <Icons.Hospital /> },
  { name: 'Department Management', href: '/admin/department', icon: <Icons.Department /> },
  { name: 'Staff Management', href: '/admin/staff', icon: <Icons.Staff /> },
  { name: 'Medicine Management', href: '/admin/medicine', icon: <Icons.Medicine /> },
  { name: 'Patient Management', href: '/admin/patient', icon: <Icons.Patient /> },
];

const staffItems: SidebarItem[] = [
  { name: 'Appointments', href: '/staff/appointments', icon: <Icons.Appointment /> },
  { name: 'Prescriptions', href: '/staff/prescriptions', icon: <Icons.Prescription /> },
  { name: 'Prescription Medicine', href: '/staff/prescription-medicine', icon: <Icons.Medicine /> },
  { name: 'Patient Details', href: '/staff/patient', icon: <Icons.Patient /> },
];

const patientItems: SidebarItem[] = [
  { name: 'Appointments', href: '/patient/appointments', icon: <Icons.Appointment /> },
  { name: 'Prescriptions', href: '/patient/prescriptions', icon: <Icons.Prescription /> },
  { name: 'Bills', href: '/patient/bills', icon: <Icons.Bill /> },
  { name: 'Payments', href: '/patient/payments', icon: <Icons.Payment /> },
];

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const { role } = useAuth();
  const { pathname } = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Determine which items to display based on user role and current path
  const getSidebarItems = () => {
    if (pathname.startsWith('/admin')) {
      return adminItems;
    } else if (pathname.startsWith('/staff')) {
      return staffItems;
    } else if (pathname.startsWith('/patient')) {
      return patientItems;
    }
    return [];
  };
  
  const items = getSidebarItems();

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <ShadcnSidebar className="border-r border-border">
          <SidebarContent className="pt-6">
            <div className="px-3 py-2">
              <SidebarTrigger />
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                {pathname.includes('/admin') ? 'Admin Dashboard' : 
                 pathname.includes('/staff') ? 'Staff Dashboard' : 
                 pathname.includes('/patient') ? 'Patient Portal' : 'Dashboard'}
              </h2>
              
              <div className="space-y-1">
                {items.map((item, index) => (
                  <NavLink 
                    key={index} 
                    to={item.href}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-sidebar-accent group",
                        isActive ? "bg-primary text-primary-foreground" : "text-sidebar-foreground"
                      )
                    }
                  >
                    {item.icon}
                    <span className="text-sm font-medium">{item.name}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          </SidebarContent>
        </ShadcnSidebar>
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </SidebarProvider>
  );
};

export default Sidebar;
