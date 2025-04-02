
import { Bar, Line } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  AreaChart, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  Photo 
} from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import OrdersTable from '@/components/admin/OrdersTable';

// Sample data for charts
const revenueData = [
  { name: 'Jan', total: 1200 },
  { name: 'Feb', total: 1800 },
  { name: 'Mar', total: 2200 },
  { name: 'Apr', total: 2600 },
  { name: 'May', total: 3200 },
  { name: 'Jun', total: 3800 },
  { name: 'Jul', total: 4200 },
];

const ordersData = [
  { name: 'Mon', value: 12 },
  { name: 'Tue', value: 18 },
  { name: 'Wed', value: 15 },
  { name: 'Thu', value: 20 },
  { name: 'Fri', value: 24 },
  { name: 'Sat', value: 30 },
  { name: 'Sun', value: 22 },
];

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 hidden md:block">
        <AdminSidebar />
      </div>
      
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-500">Welcome back to your admin dashboard</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-gray-500">Total Revenue</div>
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <div className="text-3xl font-bold">$24,780</div>
                <div className="text-sm text-green-600 flex items-center">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  12.5%
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-1">Compared to last month</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-gray-500">Total Orders</div>
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <div className="text-3xl font-bold">492</div>
                <div className="text-sm text-green-600 flex items-center">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  8.2%
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-1">Compared to last month</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-gray-500">Total Customers</div>
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <div className="text-3xl font-bold">320</div>
                <div className="text-sm text-green-600 flex items-center">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  5.3%
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-1">Compared to last month</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-gray-500">Photos Printed</div>
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <Photo className="h-5 w-5 text-amber-600" />
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <div className="text-3xl font-bold">2,458</div>
                <div className="text-sm text-red-600 flex items-center">
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                  3.1%
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-1">Compared to last month</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs defaultValue="monthly">
                <div className="flex justify-between items-center mb-4">
                  <TabsList>
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="yearly">Yearly</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="weekly" className="h-80 mt-0">
                  {/* Recharts component would go here */}
                  <div className="h-full flex items-center justify-center bg-gray-50 rounded-md border">
                    <BarChart className="h-12 w-12 text-gray-400" />
                  </div>
                </TabsContent>
                <TabsContent value="monthly" className="h-80 mt-0">
                  {/* Recharts component would go here */}
                  <div className="h-full flex items-center justify-center bg-gray-50 rounded-md border">
                    <BarChart className="h-12 w-12 text-gray-400" />
                  </div>
                </TabsContent>
                <TabsContent value="yearly" className="h-80 mt-0">
                  {/* Recharts component would go here */}
                  <div className="h-full flex items-center justify-center bg-gray-50 rounded-md border">
                    <BarChart className="h-12 w-12 text-gray-400" />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Orders Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs defaultValue="week">
                <div className="flex justify-between items-center mb-4">
                  <TabsList>
                    <TabsTrigger value="day">Day</TabsTrigger>
                    <TabsTrigger value="week">Week</TabsTrigger>
                    <TabsTrigger value="month">Month</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="day" className="h-80 mt-0">
                  {/* Recharts component would go here */}
                  <div className="h-full flex items-center justify-center bg-gray-50 rounded-md border">
                    <AreaChart className="h-12 w-12 text-gray-400" />
                  </div>
                </TabsContent>
                <TabsContent value="week" className="h-80 mt-0">
                  {/* Recharts component would go here */}
                  <div className="h-full flex items-center justify-center bg-gray-50 rounded-md border">
                    <AreaChart className="h-12 w-12 text-gray-400" />
                  </div>
                </TabsContent>
                <TabsContent value="month" className="h-80 mt-0">
                  {/* Recharts component would go here */}
                  <div className="h-full flex items-center justify-center bg-gray-50 rounded-md border">
                    <AreaChart className="h-12 w-12 text-gray-400" />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <OrdersTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
