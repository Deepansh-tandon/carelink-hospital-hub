
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/authContext';

const StaffDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Sample data for the staff dashboard
  const todayAppointments = [
    { id: 'AP001', patient: 'John Smith', time: '09:30 AM', status: 'Scheduled' },
    { id: 'AP002', patient: 'Sarah Johnson', time: '10:15 AM', status: 'In Progress' },
    { id: 'AP003', patient: 'Michael Brown', time: '11:00 AM', status: 'Scheduled' },
    { id: 'AP004', patient: 'Emily Davis', time: '01:30 PM', status: 'Scheduled' },
  ];
  
  const stats = [
    { title: 'Today\'s Appointments', value: '12', change: '+3', changeType: 'increase' },
    { title: 'Pending Prescriptions', value: '7', change: '-2', changeType: 'decrease' },
    { title: 'Patients Attended', value: '5', change: '+5', changeType: 'increase' },
  ];
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome, Dr. {user?.name.split(' ')[1]}</h2>
        <p className="text-muted-foreground">
          Here's your medical staff dashboard for today, {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
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
                {stat.change === '0' ? 'No change' : `${stat.change} from yesterday`}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Today's Appointments */}
      <div>
        <h3 className="text-lg font-medium mb-4">Today's Appointments</h3>
        <Card>
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">ID</th>
                  <th className="text-left py-3 px-4 font-medium">Patient</th>
                  <th className="text-left py-3 px-4 font-medium">Time</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {todayAppointments.map((appointment, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4">{appointment.id}</td>
                    <td className="py-3 px-4">{appointment.patient}</td>
                    <td className="py-3 px-4">{appointment.time}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        appointment.status === 'Scheduled' 
                          ? 'bg-blue-100 text-blue-700' 
                          : appointment.status === 'In Progress'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-4">
            <Button variant="outline" size="sm">View All Appointments</Button>
            <Button size="sm">Add New Appointment</Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Staff Actions */}
      <div>
        <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Appointments */}
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-base">Appointments</CardTitle>
              <CardDescription className="text-xs">
                Manage patient appointments
              </CardDescription>
            </CardHeader>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full" onClick={() => navigate('/staff/appointments')}>
                Manage
              </Button>
            </CardFooter>
          </Card>
          
          {/* Prescriptions */}
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-base">Prescriptions</CardTitle>
              <CardDescription className="text-xs">
                Issue and view prescriptions
              </CardDescription>
            </CardHeader>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full" onClick={() => navigate('/staff/prescriptions')}>
                Manage
              </Button>
            </CardFooter>
          </Card>
          
          {/* Prescription Medicine */}
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-base">Prescription Medicine</CardTitle>
              <CardDescription className="text-xs">
                Add medicines to prescriptions
              </CardDescription>
            </CardHeader>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full" onClick={() => navigate('/staff/prescription-medicine')}>
                Manage
              </Button>
            </CardFooter>
          </Card>
          
          {/* Patient Details */}
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-base">Patient Details</CardTitle>
              <CardDescription className="text-xs">
                View patient information
              </CardDescription>
            </CardHeader>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full" onClick={() => navigate('/staff/patient')}>
                Manage
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
