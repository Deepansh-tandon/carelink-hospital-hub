
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/lib/authContext";

// Pages
import Login from "./pages/Login";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";

// Staff pages
import StaffDashboard from "./pages/staff/Dashboard";

// Patient pages
import PatientDashboard from "./pages/patient/Dashboard";

// Layout
import DashboardLayout from "./components/DashboardLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            
            {/* Admin routes */}
            <Route element={<DashboardLayout requiredRole="admin" />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/hospital" element={<AdminDashboard />} />
              <Route path="/admin/department" element={<AdminDashboard />} />
              <Route path="/admin/staff" element={<AdminDashboard />} />
              <Route path="/admin/medicine" element={<AdminDashboard />} />
              <Route path="/admin/patient" element={<AdminDashboard />} />
            </Route>
            
            {/* Staff routes */}
            <Route element={<DashboardLayout requiredRole="staff" />}>
              <Route path="/staff" element={<StaffDashboard />} />
              <Route path="/staff/appointments" element={<StaffDashboard />} />
              <Route path="/staff/prescriptions" element={<StaffDashboard />} />
              <Route path="/staff/prescription-medicine" element={<StaffDashboard />} />
              <Route path="/staff/patient" element={<StaffDashboard />} />
            </Route>
            
            {/* Patient routes */}
            <Route element={<DashboardLayout requiredRole="patient" />}>
              <Route path="/patient" element={<PatientDashboard />} />
              <Route path="/patient/appointments" element={<PatientDashboard />} />
              <Route path="/patient/prescriptions" element={<PatientDashboard />} />
              <Route path="/patient/bills" element={<PatientDashboard />} />
              <Route path="/patient/payments" element={<PatientDashboard />} />
            </Route>
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
