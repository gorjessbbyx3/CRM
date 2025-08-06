'use client'

import { useState, useEffect } from 'react'
import { 
  ChartBarIcon, 
  UsersIcon, 
  CurrencyDollarIcon, 
  CalendarIcon,
  ClockIcon,
  TrendingUpIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon as PendingIcon
} from '@heroicons/react/24/outline'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    totalDeals: 0,
    totalContacts: 0,
    conversionRate: 0,
    avgDealValue: 0,
    activeProjects: 0,
    pendingTasks: 0,
    upcomingMeetings: 0
  })

  const [chartData, setChartData] = useState([
    { name: 'Jan', revenue: 4000, deals: 24 },
    { name: 'Feb', revenue: 3000, deals: 18 },
    { name: 'Mar', revenue: 5000, deals: 32 },
    { name: 'Apr', revenue: 4500, deals: 28 },
    { name: 'May', revenue: 6000, deals: 35 },
    { name: 'Jun', revenue: 5500, deals: 30 }
  ])

  const [dealStages, setDealStages] = useState([
    { name: 'Prospecting', value: 35, color: '#3B82F6' },
    { name: 'Qualification', value: 25, color: '#8B5CF6' },
    { name: 'Proposal', value: 20, color: '#F59E0B' },
    { name: 'Negotiation', value: 15, color: '#EF4444' },
    { name: 'Closed Won', value: 5, color: '#10B981' }
  ])

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, type: 'deal', title: 'Closed deal with TechCorp', amount: '$15,000', time: '2 hours ago', icon: CheckCircleIcon, color: 'text-green-600' },
    { id: 2, type: 'meeting', title: 'Scheduled demo with StartupXYZ', time: '3 hours ago', icon: CalendarIcon, color: 'text-blue-600' },
    { id: 3, type: 'task', title: 'Follow up with 5 leads', time: '5 hours ago', icon: PendingIcon, color: 'text-yellow-600' },
    { id: 4, type: 'email', title: 'Sent proposal to MegaCorp', time: '1 day ago', icon: BriefcaseIcon, color: 'text-purple-600' }
  ])

  const [aiInsights, setAiInsights] = useState([
    { title: 'Hot Lead Alert', description: 'John Doe from TechCorp shows high engagement', confidence: 92 },
    { title: 'Deal Risk', description: 'MegaCorp deal might close late - follow up needed', confidence: 78 },
    { title: 'Upsell Opportunity', description: 'Existing client ready for premium package', confidence: 85 }
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Enterprise Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back, let's crush those targets! 🚀</p>
            </div>
            <div className="flex space-x-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                New Deal
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                Schedule Meeting
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CurrencyDollarIcon className="h-8 w-8 text-blue-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${metrics.totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-green-600">+12.5% from last month</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ChartBarIcon className="h-8 w-8 text-green-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Deals</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.totalDeals}</p>
                <p className="text-sm text-green-600">+8 new this week</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UsersIcon className="h-8 w-8 text-purple-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Contacts</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.totalContacts}</p>
                <p className="text-sm text-green-600">+23 this month</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-orange-500">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUpIcon className="h-8 w-8 text-orange-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.conversionRate}%</p>
                <p className="text-sm text-green-600">+2.3% improvement</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue & Deals Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="deals" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Deal Stages */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Deal Pipeline</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dealStages}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dealStages.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insights & Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Insights */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Insights 🤖</h3>
            <div className="space-y-4">
              {aiInsights.map((insight, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{insight.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {insight.confidence}% confidence
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 ${activity.color}`}>
                    <activity.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                    {activity.amount && (
                      <p className="text-sm font-semibold text-green-600">{activity.amount}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">Ready to boost your sales?</h3>
              <p className="text-blue-100 mt-1">Start with these quick actions</p>
            </div>
            <div className="flex space-x-3">
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
                Import Contacts
              </button>
              <button className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition">
                View Analytics
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
