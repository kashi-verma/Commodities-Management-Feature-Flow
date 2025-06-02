import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Package, 
  DollarSign, 
  Users, 
  AlertTriangle 
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  
  // Mock data for charts
  const monthlyRevenue = [
    { month: 'Jan', revenue: 45000, profit: 12000 },
    { month: 'Feb', revenue: 52000, profit: 15000 },
    { month: 'Mar', revenue: 48000, profit: 11000 },
    { month: 'Apr', revenue: 61000, profit: 18000 },
    { month: 'May', revenue: 55000, profit: 16000 },
    { month: 'Jun', revenue: 67000, profit: 21000 },
  ];

  const commodityDistribution = [
    { name: 'Grains', value: 35, color: '#3B82F6' },
    { name: 'Metals', value: 25, color: '#10B981' },
    { name: 'Energy', value: 20, color: '#F59E0B' },
    { name: 'Livestock', value: 12, color: '#EF4444' },
    { name: 'Others', value: 8, color: '#8B5CF6' },
  ];

  const topCommodities = [
    { name: 'Wheat', volume: 1250, change: 5.2 },
    { name: 'Copper', volume: 980, change: -2.1 },
    { name: 'Crude Oil', volume: 856, change: 8.7 },
    { name: 'Corn', volume: 742, change: 3.4 },
    { name: 'Gold', volume: 623, change: -1.8 },
  ];

  const stats = [
    {
      title: 'Total Revenue',
      value: '$328,000',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600 dark:text-green-400'
    },
    {
      title: 'Active Products',
      value: '1,247',
      change: '+8.2%',
      trend: 'up',
      icon: Package,
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      title: 'Total Clients',
      value: '86',
      change: '+4.1%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      title: 'Low Stock Items',
      value: '23',
      change: '-5.3%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'text-red-600 dark:text-red-400'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('dashboard.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {t('dashboard.subtitle')}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.trend === 'up';
          return (
            <Card key={stat.title} className="bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                      {stat.value}
                    </p>
                    <div className={`flex items-center mt-2 text-sm ${stat.color}`}>
                      {isPositive ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-gray-50 dark:bg-gray-700`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <Card className="bg-white dark:bg-gray-800 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Monthly Revenue & Profit</CardTitle>
            <CardDescription>Revenue and profit trends over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
                <Bar dataKey="revenue" fill="#3B82F6" radius={4} />
                <Bar dataKey="profit" fill="#10B981" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Commodity Distribution */}
        <Card className="bg-white dark:bg-gray-800 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Commodity Distribution</CardTitle>
            <CardDescription>Breakdown of commodities by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={commodityDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {commodityDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {commodityDistribution.map((item) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {item.name} ({item.value}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Commodities Table */}
      <Card className="bg-white dark:bg-gray-800 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Top Performing Commodities</CardTitle>
          <CardDescription>Most traded commodities this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Commodity</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Volume (tons)</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Change</th>
                </tr>
              </thead>
              <tbody>
                {topCommodities.map((commodity, index) => (
                  <tr key={commodity.name} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium">
                          {commodity.name.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{commodity.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      {commodity.volume.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`flex items-center ${
                        commodity.change > 0 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {commodity.change > 0 ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        {Math.abs(commodity.change)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
