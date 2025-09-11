import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Package,
  CheckCircle,
  AlertTriangle,
  PlusCircle,
  List,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

// Fake data for the dashboard
const areaData = [
  { month: "Jan", created: 400, completed: 300 },
  { month: "Feb", created: 600, completed: 500 },
  { month: "Mar", created: 800, completed: 650 },
  { month: "Apr", created: 1000, completed: 900 },
  { month: "May", created: 700, completed: 600 },
  { month: "Jun", created: 950, completed: 880 },
];

const incompleteReasons = [
  { name: "Missing Data", value: 45 },
  { name: "Pending Approval", value: 30 },
  { name: "Draft", value: 20 },
];

const recentProducts = [
  {
    id: "P-001",
    name: "Recycled Hoodie",
    status: "Complete",
    date: "2025-06-15",
  },
  {
    id: "P-002",
    name: "Smart Lamp Eco",
    status: "Incomplete",
    date: "2025-06-14",
    reason: "Missing Data",
  },
  {
    id: "P-003",
    name: "Bamboo Utensil Set",
    status: "Complete",
    date: "2025-06-12",
  },
  {
    id: "P-004",
    name: "Modular Chair",
    status: "Incomplete",
    date: "2025-06-11",
    reason: "Pending Approval",
  },
  {
    id: "P-005",
    name: "Sustainable Backpack",
    status: "Complete",
    date: "2025-06-10",
  },
];

const COLORS = ["#facc15", "#f87171", "#94a3b8", "#e2e8f0"];

export default function Dashboard() {
  const totalProducts = 2450;
  const completedProducts = 1980;
  const incompleteProducts = totalProducts - completedProducts;
  const completedPercentage = (completedProducts / totalProducts) * 100;

  return (
    <div className="py-2 space-y-8   min-h-screen">
      {/* Header and Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-800 ">
        <div>
          <h1 className="text-3xl font-bold mb-1">Digital Product Passport </h1>
          <p className="text-muted-foreground text-sm">
            A complete overview of your product lifecycle and sustainability
            data.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-2 items-center">
          <Button asChild>
            <Link to={"/AddProduct"}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Passport
            </Link>
          </Button>
        </div>
      </div>

      {/* Main KPI Cards with Sparkline charts */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Total Products Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <Package className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground mt-1">
              +120 this month
            </p>
          </CardContent>
        </Card>

        {/* Complete Products Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{completedProducts}</div>
            <Progress
              value={completedPercentage}
              className="mt-2 h-2"
              // indicatorColor="bg-green-500"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {completedPercentage.toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>

        {/* Incomplete Products Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Incomplete</CardTitle>
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{incompleteProducts}</div>
            <p className="text-xs text-muted-foreground mt-1">
              128 need attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Area Chart - Creation Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Passport Creation Trend</CardTitle>
            <CardDescription>
              Number of passports created vs. completed over the last 6 months.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient
                    id="colorCompleted"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-gray-200 dark:stroke-gray-700"
                />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="created"
                  name="Created"
                  stroke="#60a5fa"
                  fillOpacity={1}
                  fill="url(#colorCreated)"
                />
                <Area
                  type="monotone"
                  dataKey="completed"
                  name="Completed"
                  stroke="#34d399"
                  fillOpacity={1}
                  fill="url(#colorCompleted)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Incomplete Reasons Donut Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Incomplete Passports</CardTitle>
            <CardDescription>
              Breakdown by reason for incomplete passports.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={incompleteReasons}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {incompleteReasons.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Product List Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Passports</CardTitle>
            <CardDescription>
              A list of recently created or updated Digital Product Passports.
            </CardDescription>
          </div>
          <Button variant="outline" className="text-sm">
            <List className="h-4 w-4 mr-2" />
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        product.status === "Complete"
                          ? "outline"
                          : "destructive"
                      }
                    >
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {product.reason ? (
                      <Badge
                        variant="secondary"
                        className="bg-gray-200 dark:bg-gray-700"
                      >
                        {product.reason}
                      </Badge>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell className="text-right">{product.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
