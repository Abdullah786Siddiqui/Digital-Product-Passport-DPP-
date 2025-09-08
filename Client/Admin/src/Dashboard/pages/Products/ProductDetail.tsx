// src/pages/Products/Detail.jsx
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Download,
  Edit,
  QrCode,
  Package,
  Factory,
  FileCheck,
  Activity,
  Leaf,
  ShieldCheck,
} from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts"

export default function ProductDetail() {
  const product = {
    id: "prod_001",
    name: "Eco-Friendly Water Bottle",
    category: "Household",
    status: "Published",
    description:
      "A reusable stainless steel water bottle with bamboo lid, designed for sustainability and long-term usage.",
    images: ["https://tecnicesports.com/4108-large_default/bootle-up.jpg", "https://media.istockphoto.com/id/1423379549/vector/blank-metal-insulated-water-bottle-vector-mockup-reusable-stainless-steel-travel-sport-flask.jpg?s=612x612&w=0&k=20&c=mXeJNB9xF7jh2Q8mGxkuenoyhEcgxdaBx9BaffVDb6k="],
    materials: [
      { name: "Stainless Steel", percentage: 70 },
      { name: "Bamboo", percentage: 30 },
    ],
    supplier: {
      name: "Green Supply Co.",
      location: "Shenzhen, China",
      certifications: ["ISO 9001", "Eco-Safe"],
    },
    certifications: [
      { name: "BPA Free", expiry: "2026-05-01" },
      { name: "Food Safe", expiry: "2025-11-15" },
    ],
    activity: [
      { action: "Created", date: "2025-01-12" },
      { action: "Updated", date: "2025-03-03" },
      { action: "Published", date: "2025-04-10" },
    ],
    stats: {
      footprint: "2.3 kg CO₂",
      stage: "Distribution",
      compliance: "92%",
    },
    lastUpdated: "2025-09-05",
  }

  const materialColors = ["#10b981", "#f59e0b"]

  return (
    <div className="p-8 space-y-8  min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Package className="w-7 h-7 text-primary" /> {product.name}
          </h1>
          <p className="text-muted-foreground">{product.category}</p>
          <p className="text-sm text-muted-foreground mt-1">
            Last updated: {product.lastUpdated}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {product.status === "Published" && (
            <Badge className="bg-green-500">Published</Badge>
          )}
          {product.status === "Draft" && (
            <Badge variant="outline">Draft</Badge>
          )}
          <Button variant="outline" size="sm">
            <QrCode className="w-4 h-4 mr-2" /> QR Code
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" /> Edit
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-md">
          <CardContent className="p-6 flex items-center gap-4">
            <Leaf className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-sm text-muted-foreground">
                Carbon Footprint
              </p>
              <h3 className="text-xl font-bold">
                {product.stats.footprint}
              </h3>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardContent className="p-6 flex items-center gap-4">
            <Package className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm text-muted-foreground">
                Current Stage
              </p>
              <h3 className="text-xl font-bold">{product.stats.stage}</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardContent className="p-6 flex items-center gap-4">
            <ShieldCheck className="w-8 h-8 text-emerald-600" />
            <div>
              <p className="text-sm text-muted-foreground">
                Compliance Score
              </p>
              <h3 className="text-xl font-bold">
                {product.stats.compliance}
              </h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side */}
        <div className="lg:col-span-2 space-y-8">
          {/* General Info */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>General Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <p className="leading-relaxed">{product.description}</p>
              <div className="flex gap-4 flex-wrap">
                {product.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={product.name}
                    className="w-40 h-40 rounded-xl object-cover border shadow-sm"
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Materials */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Factory className="w-5 h-5 text-primary" /> Materials Used
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col lg:flex-row items-center gap-10 p-6">
              <ul className="flex-1 space-y-3 w-full">
                {product.materials.map((mat, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <span>{mat.name}</span>
                    <Badge variant="secondary">
                      {mat.percentage}%
                    </Badge>
                  </li>
                ))}
              </ul>
              <div className="w-full lg:w-1/3 h-48">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={product.materials}
                      dataKey="percentage"
                      nameKey="name"
                      innerRadius={50}
                      outerRadius={80}
                      label
                    >
                      {product.materials.map((_, i) => (
                        <Cell
                          key={i}
                          fill={materialColors[i % materialColors.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Supplier */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Supplier Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-6">
              <p>
                <strong>Name:</strong> {product.supplier.name}
              </p>
              <p>
                <strong>Location:</strong> {product.supplier.location}
              </p>
              <p>
                <strong>Certifications:</strong>{" "}
                {product.supplier.certifications.join(", ")}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right Side */}
        <div className="space-y-8">
          {/* Certifications */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-primary" /> Certifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              {product.certifications.map((cert, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center border-b pb-3"
                >
                  <div>
                    <p className="font-medium">{cert.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Expiry: {cert.expiry}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4 mr-1" /> Download
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Activity */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" /> Activity Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-4">
                {product.activity.map((log, i) => (
                  <li
                    key={i}
                    className="flex justify-between text-sm border-b pb-2"
                  >
                    <span className="font-medium">{log.action}</span>
                    <span className="text-muted-foreground">{log.date}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
