// src/pages/Products/List.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Plus, Search, Filter, MoreHorizontal 
} from "lucide-react"

export default function ProductsList() {
  const products = [
    {
      id: "prod_001",
      name: "Eco-Friendly Water Bottle",
      category: "Household",
      status: "Published",
      supplier: "Green Supply Co.",
      lastUpdated: "2h ago",
    },
    {
      id: "prod_002",
      name: "Organic Cotton T-Shirt",
      category: "Apparel",
      status: "Draft",
      supplier: "EcoWear Ltd.",
      lastUpdated: "1d ago",
    },
    {
      id: "prod_003",
      name: "Recyclable Phone Case",
      category: "Electronics",
      status: "Expiring",
      supplier: "Future Plastics",
      lastUpdated: "3d ago",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button className="w-fit">
          <Plus className="w-4 h-4 mr-2" />
          Create Passport
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle>Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">2,450</p>
            <p className="text-sm text-muted-foreground">Across all categories</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle>Incomplete Passports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">128</p>
            <p className="text-sm text-muted-foreground">Action required soon</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle>Expiring Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">34</p>
            <p className="text-sm text-muted-foreground">Within 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full md:w-1/2">
          <Search className="w-4 h-4 text-muted-foreground absolute ml-2" />
          <Input placeholder="Search products..." className="pl-8" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Status: Published</DropdownMenuItem>
            <DropdownMenuItem>Status: Draft</DropdownMenuItem>
            <DropdownMenuItem>Status: Expiring</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Products Table */}
      <Card className="shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    {product.status === "Published" && (
                      <Badge className="bg-green-500">Published</Badge>
                    )}
                    {product.status === "Draft" && (
                      <Badge variant="outline">Draft</Badge>
                    )}
                    {product.status === "Expiring" && (
                      <Badge className="bg-yellow-500 text-black">Expiring</Badge>
                    )}
                  </TableCell>
                  <TableCell>{product.supplier}</TableCell>
                  <TableCell>{product.lastUpdated}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-2">
        <Button variant="outline" size="sm">Previous</Button>
        <Button variant="outline" size="sm">Next</Button>
      </div>
    </div>
  )
}
