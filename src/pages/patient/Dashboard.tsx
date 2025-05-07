
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/authContext';

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Sample data for the patient dashboard
  const upcomingAppointments = [
    { id: 'AP005', doctor: 'Dr. Sarah Wilson', department: 'Cardiology', date: '2023-05-10', time: '10:30 AM' }
  ];
  
  const recentPrescriptions = [
    { id: 'PR003', doctor: 'Dr. Sarah Wilson', date: '2023-05-01', medications: 3 }
  ];
  
  // Health metrics for demo
  const healthMetrics = [
    { name: 'Blood Pressure', value: '120/80', date: '2023-05-01', status: 'normal' },
    { name: 'Heart Rate', value: '72 bpm', date: '2023-05-01', status: 'normal' },
    { name: 'Temperature', value: '98.6°F', date: '2023-05-01', status: 'normal' },
    { name: 'Weight', value: '165 lbs', date: '2023-04-15', status: 'normal' },
  ];
  
  const unpaidBills = [
    { id: 'B001', description: 'Consultation', amount: 150, date: '2023-05-01', status: 'unpaid' }
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome, {user?.name}</h2>
        <p className="text-muted-foreground">
          Here's your personal health dashboard
        </p>
      </div>
      
      {/* Health Metrics */}
      <div>
        <h3 className="text-lg font-medium mb-3">Your Health Metrics</h3>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          {healthMetrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">{metric.name}</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="text-2xl font-bold">{metric.value}</div>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground">Last updated: {metric.date}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Your scheduled medical appointments</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.map((appointment, index) => (
                  <div key={index} className="p-3 border rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{appointment.doctor}</p>
                        <p className="text-sm text-muted-foreground">{appointment.department}</p>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                    <div className="flex items-center mt-2 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-medical-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                        <line x1="16" x2="16" y1="2" y2="6" />
                        <line x1="8" x2="8" y1="2" y2="6" />
                        <line x1="3" x2="21" y1="10" y2="10" />
                      </svg>
                      <span>{appointment.date} at {appointment.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-4 text-muted-foreground">No upcoming appointments</p>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate('/patient/appointments')}>View All</Button>
            <Button onClick={() => navigate('/patient/appointments')}>Book New</Button>
          </CardFooter>
        </Card>
        
        {/* Recent Prescriptions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Prescriptions</CardTitle>
            <CardDescription>Your medication prescriptions</CardDescription>
          </CardHeader>
          <CardContent>
            {recentPrescriptions.length > 0 ? (
              <div className="space-y-4">
                {recentPrescriptions.map((prescription, index) => (
                  <div key={index} className="p-3 border rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{prescription.doctor}</p>
                        <p className="text-sm text-muted-foreground">Prescribed on {prescription.date}</p>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                    <div className="flex items-center mt-2 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-medical-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m19 21-4-4m-7.8 1.8L21 5" />
                        <path d="m2 22 5-5c1.5 1 3.2 1 4.2 0v0c.9-.9.9-2.6 0-3.5v0c-1-.9-2.7-.9-3.6 0v0c-1 1-1 2.7-.2 4.2" />
                      </svg>
                      <span>{prescription.medications} medications</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-4 text-muted-foreground">No recent prescriptions</p>
            )}
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="outline" onClick={() => navigate('/patient/prescriptions')}>View All</Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Bills & Payments */}
      <Card>
        <CardHeader>
          <CardTitle>Bills & Payments</CardTitle>
          <CardDescription>Your billing information</CardDescription>
        </CardHeader>
        <CardContent>
          {unpaidBills.length > 0 ? (
            <div className="space-y-4">
              <div className="border rounded-md overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="py-2 px-3 text-left">Bill ID</th>
                      <th className="py-2 px-3 text-left">Description</th>
                      <th className="py-2 px-3 text-left">Date</th>
                      <th className="py-2 px-3 text-right">Amount</th>
                      <th className="py-2 px-3 text-center">Status</th>
                      <th className="py-2 px-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unpaidBills.map((bill, index) => (
                      <tr key={index} className="border-t">
                        <td className="py-2 px-3">{bill.id}</td>
                        <td className="py-2 px-3">{bill.description}</td>
                        <td className="py-2 px-3">{bill.date}</td>
                        <td className="py-2 px-3 text-right">${bill.amount}</td>
                        <td className="py-2 px-3 text-center">
                          <span className="inline-block px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">
                            {bill.status}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-center">
                          <Button size="sm" onClick={() => navigate('/patient/payments')}>Pay Now</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p className="text-center py-4 text-muted-foreground">No unpaid bills</p>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate('/patient/bills')}>View All Bills</Button>
          <Button onClick={() => navigate('/patient/payments')}>Payment History</Button>
        </CardFooter>
      </Card>
      
      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-medium mb-3">Quick Actions</h3>
        <div className="grid gap-4 md:grid-cols-4">
          <Button 
            className="h-20" 
            variant="outline"
            onClick={() => navigate('/patient/appointments')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
            Book Appointment
          </Button>
          
          <Button 
            className="h-20" 
            variant="outline"
            onClick={() => navigate('/patient/prescriptions')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m19 21-4-4m-7.8 1.8L21 5" />
              <path d="m2 22 5-5c1.5 1 3.2 1 4.2 0v0c.9-.9.9-2.6 0-3.5v0c-1-.9-2.7-.9-3.6 0v0c-1 1-1 2.7-.2 4.2" />
            </svg>
            View Prescriptions
          </Button>
          
          <Button 
            className="h-20" 
            variant="outline"
            onClick={() => navigate('/patient/bills')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
              <path d="M16 13H8" />
              <path d="M16 17H8" />
              <path d="M10 9H8" />
            </svg>
            View Bills
          </Button>
          
          <Button 
            className="h-20" 
            variant="outline"
            onClick={() => navigate('/patient/payments')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <line x1="2" x2="22" y1="10" y2="10" />
            </svg>
            Make Payment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
