import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Package,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Users,
  Clock,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts"
import { Progress } from "@/components/ui/progress"

export default function Analytics() {
  // Fake data
  const lineData = [
    { month: "Jan", created: 40, completed: 30 },
    { month: "Feb", created: 60, completed: 50 },
    { month: "Mar", created: 80, completed: 65 },
    { month: "Apr", created: 100, completed: 90 },
    { month: "May", created: 70, completed: 60 },
  ]

  const complianceData = [
    { name: "Compliant", value: 70 },
    { name: "Non-Compliant", value: 20 },
    { name: "Expiring Soon", value: 10 },
  ]

  const materialData = [
    { name: "Organic Cotton", usage: 120 },
    { name: "Recycled Plastic", usage: 95 },
    { name: "Aluminum", usage: 80 },
    { name: "Glass", usage: 60 },
    { name: "Bamboo", usage: 45 },
  ]

  const COLORS = ["#4ade80", "#f87171", "#facc15"]

  return (
    <div className="p-6 space-y-6">
      {/* Top Actions with filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <div className="flex gap-2">
          <Input placeholder="Search products..." className="w-56" />
          <Button variant="outline">This Month</Button>
          <Button>+ Create Passport</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Total Products</CardTitle>
            <Package className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">2,450</p>
            <p className="text-sm text-muted-foreground">+120 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Completed</CardTitle>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1,980</p>
            <Progress value={81} className="mt-2" />
            <p className="text-sm text-muted-foreground">81% done</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Incomplete</CardTitle>
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">128</p>
            <Progress value={19} className="mt-2" />
            <p className="text-sm text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Suppliers</CardTitle>
            <Users className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">85</p>
            <p className="text-sm text-muted-foreground">Trusted partners</p>
          </CardContent>
        </Card>

    
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Created vs Completed</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="created" stroke="#60a5fa" strokeWidth={2} />
                <Line type="monotone" dataKey="completed" stroke="#34d399" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compliance Status</CardTitle>
          </CardHeader>
          <CardContent className="h-72 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={complianceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  label
                >
                  {complianceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Materials Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Top Materials Used</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={materialData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="usage" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-blue-500 mt-1" />
            <div>
              <p className="font-medium">New passport created: Eco-Friendly Water Bottle</p>
              <p className="text-sm text-muted-foreground">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
            <div>
              <p className="font-medium">Smart Home Hub passport published</p>
              <p className="text-sm text-muted-foreground">Yesterday</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1" />
            <div>
              <p className="font-medium">45 products missing material composition</p>
              <p className="text-sm text-muted-foreground">3 days ago</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
