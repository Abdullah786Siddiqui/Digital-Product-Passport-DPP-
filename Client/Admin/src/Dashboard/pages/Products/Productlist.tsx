import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Filter,
  MoreHorizontal,
  PlusCircle,
  FileWarningIcon,
  AwardIcon,
  PackageIcon
} from "lucide-react";
import { Link } from "react-router-dom";

// Define the type for a single product object
interface Product {
  id?: string; // Optional because the form might not provide it
  name: string;
  category: string;
  productImage?: string | null; // Optional
  materials?: { name: string; percentage: string }[];
  certifications?: string[];
  pefScore?: string;
  frenchScore?: string;
  carbonFootprint: string;
  waterUsage: string;
  energyUsage: string;
  careInstructions?: string[];
  chemicals?: { name: string; usage: string }[];
  processes?: { name: string; location: string; method: string }[];
}

export default function ProductsList() {
  // Use the 'Product' interface to type the state
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch data from local storage
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      try {
        const parsedProducts: Product[] = JSON.parse(storedProducts);
        setProducts(parsedProducts);
      } catch (e) {
        console.error("Failed to parse products from local storage", e);
        // Fallback to default if parsing fails
        setDefaultProducts();
      }
    } else {
      // If no data is in local storage, set a default array
      setDefaultProducts();
    }
  }, []); // The empty array ensures this runs only once

  const setDefaultProducts = () => {
    const defaultProducts: Product[] = [
      {
        id: "prod_001",
        name: "Eco-Friendly Water Bottle",
        category: "Household",
        productImage: "https://images.unsplash.com/photo-1591873426293-195c613c242a",
        carbonFootprint: "3535 kg CO2e",
        waterUsage: "343 liters",
        energyUsage: "353 kWh"
      },
      {
        id: "prod_002",
        name: "Organic Cotton T-Shirt",
        category: "Apparel",
        productImage: "https://images.unsplash.com/photo-1620799140408-edc6d17b87c0",
        carbonFootprint: "1500 kg CO2e",
        waterUsage: "5000 liters",
        energyUsage: "200 kWh"
      },
      {
        id: "prod_003",
        name: "Recyclable Phone Case",
        category: "Electronics",
        productImage: "https://images.unsplash.com/photo-1629837581561-12f0f4a13e2e",
        carbonFootprint: "200 kg CO2e",
        waterUsage: "20 liters",
        energyUsage: "50 kWh"
      },
    ];
    setProducts(defaultProducts);
  };

  return (
    <div className="p-3 space-y-6 bg-[whitesmoke]">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button asChild>
          <Link to={"/AddProduct"}>
              <PlusCircle className="h-4 w-4 mr-2" />

            Add Product
          </Link>
        </Button>
      </div>

   {/* Summary Cards */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <Card className="shadow-sm hover:shadow-lg transition-shadow duration-200 rounded-lg bg-blue-100">
    <CardHeader className="pb-2 flex items-center justify-between gap-2">
      <CardTitle>Total Products</CardTitle>
      <PackageIcon className="h-5 w-5 text-blue-500" />
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-bold text-gray-800">2,450</p>
      <p className="text-sm text-gray-500">Across all categories</p>
    </CardContent>
  </Card>

  <Card className="shadow-sm hover:shadow-lg transition-shadow duration-200 rounded-lg bg-yellow-100">
    <CardHeader className="pb-2 flex items-center justify-between gap-2">
      <CardTitle>Incomplete Passports</CardTitle>
      <FileWarningIcon className="h-5 w-5 text-yellow-500" />
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-bold text-gray-800">128</p>
      <p className="text-sm text-gray-500">Action required soon</p>
    </CardContent>
  </Card>

  <Card className="shadow-sm hover:shadow-lg transition-shadow duration-200 rounded-lg bg-green-100">
    <CardHeader className="pb-2 flex items-center justify-between gap-2">
      <CardTitle>Expiring Certifications</CardTitle>
      <AwardIcon className="h-5 w-5 text-green-500" />
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-bold text-gray-800">34</p>
      <p className="text-sm text-gray-500">Within 30 days</p>
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
      <Card className="shadow-sm ">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-2">Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Carbon Footprint</TableHead>
                <TableHead>Water Usage</TableHead>
                <TableHead>Energy Usage</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <span>{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.carbonFootprint}</TableCell>
                  <TableCell>{product.waterUsage}</TableCell>
                  <TableCell>{product.energyUsage}</TableCell>
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
  );
}