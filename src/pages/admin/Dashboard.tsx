
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/authContext';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Sample stats for the admin dashboard
  const stats = [
    { title: 'Total Staff', value: '48', change: '+4', changeType: 'increase' },
    { title: 'Active Patients', value: '237', change: '+21', changeType: 'increase' },
    { title: 'Departments', value: '8', change: '0', changeType: 'neutral' },
    { title: 'Medicine Stock', value: '1,253', change: '-5', changeType: 'decrease' },
  ];
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}</h2>
        <p className="text-muted-foreground">
          Here's an overview of your hospital management system
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-4 w-4 ${
                  stat.changeType === 'increase' 
                    ? 'text-medical-green' 
                    : stat.changeType === 'decrease' 
                    ? 'text-medical-red' 
                    : 'text-medical-gray'
                }`}
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                {stat.changeType === 'increase' ? (
                  <path d="m18 15-6-6-6 6"/>
                ) : stat.changeType === 'decrease' ? (
                  <path d="m6 9 6 6 6-6"/>
                ) : (
                  <path d="M8 12h8"/>
                )}
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change === '0' ? 'No change' : `${stat.change} from last month`}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Admin Actions */}
      <div>
        <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Hospital Management */}
          <Card>
            <CardHeader>
              <CardTitle>Hospital Management</CardTitle>
              <CardDescription>
                Manage hospital branches, facilities and resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Configure hospital settings, operating hours, and contact information.
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => navigate('/admin/hospital')}>
                Manage Hospital
              </Button>
            </CardFooter>
          </Card>
          
          {/* Department Management */}
          <Card>
            <CardHeader>
              <CardTitle>Department Management</CardTitle>
              <CardDescription>
                Organize and structure hospital departments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Add new departments, manage existing ones, and assign department heads.
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => navigate('/admin/department')}>
                Manage Departments
              </Button>
            </CardFooter>
          </Card>
          
          {/* Staff Management */}
          <Card>
            <CardHeader>
              <CardTitle>Staff Management</CardTitle>
              <CardDescription>
                Add, update, or remove hospital staff
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Manage doctors, nurses, and other hospital staff, including credentials and specialties.
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => navigate('/admin/staff')}>
                Manage Staff
              </Button>
            </CardFooter>
          </Card>
          
          {/* Medicine Management */}
          <Card>
            <CardHeader>
              <CardTitle>Medicine Management</CardTitle>
              <CardDescription>
                Track and manage hospital medicines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Add new medications, update inventory, and monitor expiration dates.
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => navigate('/admin/medicine')}>
                Manage Medicines
              </Button>
            </CardFooter>
          </Card>
          
          {/* Patient Management */}
          <Card>
            <CardHeader>
              <CardTitle>Patient Management</CardTitle>
              <CardDescription>
                View and manage patient information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Access patient records, update information, and manage patient accounts.
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => navigate('/admin/patient')}>
                Manage Patients
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
