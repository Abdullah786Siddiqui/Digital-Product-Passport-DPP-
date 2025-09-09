import { useState, type ChangeEvent } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Package,
  Factory,
  Users,
  FileCheck,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Leaf,
  Cloud,
  Droplet,
  Power,
  WashingMachine,
  Thermometer,
  Snowflake,
  Type,
  Award,
  Image as ImageIcon,
  Upload,
} from "lucide-react";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

// 1. Update the interface to allow `null` for the image path
interface ProductFormData {
  name: string;
  category: string;
  description: string;
  productImage: string | null; // Changed to allow null
  materials: { name: string; percentage: string }[];
  supplier: { name: string; location: string };
  certifications: string[];
  pefScore: string;
  frenchScore: string;
  productiveDate: string;
  carbonFootprint: string;
  waterUsage: string;
  energyUsage: string;
  careInstructions: string[];
}

export default function AddProduct() {
  const steps = [
    { title: "General Info", icon: <Package className="w-4 h-4" /> },
    { title: "Materials", icon: <Factory className="w-4 h-4" /> },
    { title: "Supplier", icon: <Users className="w-4 h-4" /> },
    { title: "Certifications", icon: <FileCheck className="w-4 h-4" /> },
    { title: "Sustainability", icon: <Leaf className="w-4 h-4" /> },
    { title: "Review", icon: <CheckCircle className="w-4 h-4" /> },
  ];

  const categories = ["Apparel", "Electronics", "Home Goods", "Food & Beverage", "Footwear"];
  const locations = ["Pakistan", "China", "India", "Bangladesh", "Vietnam"];
  const certifications = ["GOTS", "OEKO-TEX", "B-Corp", "Fair Trade Certified", "Global Recycle Standard"];

  const careInstructionsOptions = [
    { value: "Do Not Bleach", icon: Snowflake },
    { value: "Machine Wash Cold", icon: WashingMachine },
    { value: "Iron on Low Heat", icon: Type },
    { value: "30°C max", icon: Thermometer },
    { value: "Tumble Dry Low", icon: Droplet },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    category: "",
    description: "",
    productImage: null, // Initialized as null
    materials: [{ name: "", percentage: "" }],
    supplier: { name: "", location: "" },
    certifications: [""],
    pefScore: "",
    frenchScore: "",
    productiveDate: "",
    carbonFootprint: "",
    waterUsage: "",
    energyUsage: "",
    careInstructions: [],
  });

  const navigate = useNavigate();

  const nextStep = () => {
    if (isStepValid() && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.name.trim() !== "" && formData.category.trim() !== "" && formData.description.trim() !== "";
      case 1:
        return formData.materials.every(mat => mat.name.trim() !== "" && mat.percentage.trim() !== "" && !isNaN(parseFloat(mat.percentage)) && parseFloat(mat.percentage) >= 0);
      case 2:
        return formData.supplier.name.trim() !== "" && formData.supplier.location.trim() !== "";
      case 3:
        return formData.certifications.every(cert => cert.trim() !== "");
      case 4:
        return true;
      case 5:
        return true;
      default:
        return false;
    }
  };

  // 2. New handler function for image upload
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, productImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: keyof Omit<ProductFormData, 'productImage'>, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleMaterialChange = (index: number, field: keyof (typeof formData.materials)[0], value: string) => {
    const updatedMaterials = [...formData.materials];
    updatedMaterials[index] = {
      ...updatedMaterials[index],
      [field]: value,
    };
    setFormData({ ...formData, materials: updatedMaterials });
  };

  const addMaterial = () =>
    setFormData({
      ...formData,
      materials: [...formData.materials, { name: "", percentage: "" }],
    });

  const removeMaterial = (index: number) => {
    const updated = formData.materials.filter((_, i) => i !== index);
    setFormData({ ...formData, materials: updated.length > 0 ? updated : [{ name: "", percentage: "" }] });
  };

  const handleCertificationChange = (index: number, value: string) => {
    const updatedCerts = [...formData.certifications];
    updatedCerts[index] = value;
    setFormData({ ...formData, certifications: updatedCerts });
  };

  const addCertification = () =>
    setFormData({
      ...formData,
      certifications: [...formData.certifications, ""],
    });

  const removeCertification = (index: number) => {
    const updated = formData.certifications.filter((_, i) => i !== index);
    setFormData({ ...formData, certifications: updated.length > 0 ? updated : [""] });
  };

  const handleCareInstructionChange = (value: string) => {
    setFormData(prev => {
      const isSelected = prev.careInstructions.includes(value);
      if (isSelected) {
        return {
          ...prev,
          careInstructions: prev.careInstructions.filter(item => item !== value)
        };
      } else {
        return {
          ...prev,
          careInstructions: [...prev.careInstructions, value]
        };
      }
    });
  };

  const handleSubmit = () => {
    console.log("Submitting product:", formData);
    toast.success('Product submitted successfully!');
    setTimeout(() => {
      navigate('/ProductsList');
    }, 1500);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
  <div className="space-y-8">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
    {/* Left Column: Text Inputs and Dropdowns */}
    <div className="space-y-6">
      {/* Product Name and Category Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800 border-b-2 pb-2">Product Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="productName" className="block text-sm font-semibold text-gray-700">Product Name</label>
            <Input
              id="productName"
              placeholder="Eco-Friendly Water Bottle"
              value={formData.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("name", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="category" className="block text-sm font-semibold text-gray-700">Category</label>
            <Select onValueChange={(value) => handleInputChange("category", value)} value={formData.category}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Product Description Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800 border-b-2 pb-2">Description</h3>
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700">Product Description</label>
          <Textarea
            id="description"
            placeholder="Enter a detailed description of the product, including its key features and eco-friendly benefits."
            value={formData.description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleInputChange("description", e.target.value)}
          />
        </div>
      </div>

      {/* Scores Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800 border-b-2 pb-2">Sustainability Scores</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="pefScore" className="block text-sm font-semibold text-gray-700">PEF Score</label>
            <Input
              id="pefScore"
              type="number"
              placeholder="e.g., 1998"
              value={formData.pefScore}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("pefScore", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="frenchScore" className="block text-sm font-semibold text-gray-700">French Score</label>
            <Input
              id="frenchScore"
              type="number"
              placeholder="e.g., 100"
              value={formData.frenchScore}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("frenchScore", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>

    {/* Right Column: Image Upload Section */}
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800 border-b-2 pb-2 flex items-center gap-2">
        <ImageIcon className="w-5 h-5" /> Product Image
      </h3>
      <div className="w-full h-96 flex items-center justify-center p-6 bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl transition-colors duration-200 hover:bg-gray-200 cursor-pointer shadow-inner">
        <label htmlFor="image-upload" className="flex flex-col items-center justify-center space-y-3 cursor-pointer">
          {formData.productImage ? (
            <>
              <img src={formData.productImage} alt="Product Preview" className="w-full max-h-64 object-contain rounded-lg shadow-lg" />
              <Button variant="outline" className="flex items-center gap-2 mt-4 bg-white">
                <Upload className="w-4 h-4" /> Change Image
              </Button>
            </>
          ) : (
            <div className="flex flex-col items-center space-y-2 text-gray-500">
              <Upload className="w-12 h-12 text-gray-400" />
              <span className="font-semibold text-lg">Click to upload</span>
              <span className="text-sm">PNG, JPG, GIF up to 10MB</span>
            </div>
          )}
          <Input
            id="image-upload"
            type="file"
            className="sr-only"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>
      </div>
    </div>
  </div>
</div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <p className="text-sm italic text-gray-500">List all materials and their percentages. The total should equal 100%.</p>
            {formData.materials.map((material, idx) => (
              <div key={idx} className="flex gap-2 items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
                <Input
                  placeholder="Material Name (e.g., Recycled Plastic)"
                  value={material.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleMaterialChange(idx, "name", e.target.value)}
                  className="bg-white"
                />
                <div className="relative w-24">
                  <Input
                    type="number"
                    placeholder="%"
                    value={material.percentage}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleMaterialChange(idx, "percentage", e.target.value)}
                    className="pr-6 bg-white"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 font-medium">%</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeMaterial(idx)} disabled={formData.materials.length === 1}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}
            <Button variant="secondary" onClick={addMaterial} className="flex items-center gap-1">
              + Add Material
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="supplierName" className="block text-sm font-semibold text-gray-700">Supplier Name</label>
                <Input
                  id="supplierName"
                  placeholder="Green Supply Co."
                  value={formData.supplier.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, supplier: { ...formData.supplier, name: e.target.value } })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="supplierLocation" className="block text-sm font-semibold text-gray-700">Location</label>
                <Select onValueChange={(value) => setFormData({ ...formData, supplier: { ...formData.supplier, location: value } })} value={formData.supplier.location}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="productiveDate" className="block text-sm font-semibold text-gray-700">Productive Date</label>
                <Input
                  id="productiveDate"
                  type="date"
                  value={formData.productiveDate}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("productiveDate", e.target.value)}
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <p className="text-sm italic text-gray-500">Select all relevant certifications for the product.</p>
            {formData.certifications.map((cert, idx) => (
              <div key={idx} className="flex gap-2 items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
                <Select onValueChange={(value) => handleCertificationChange(idx, value)} value={cert}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select certification" />
                  </SelectTrigger>
                  <SelectContent>
                    {certifications.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="icon" onClick={() => removeCertification(idx)} disabled={formData.certifications.length === 1}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}
            <Button variant="secondary" onClick={addCertification} className="flex items-center gap-1">
              + Add Certification
            </Button>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label htmlFor="carbonFootprint" className=" text-sm font-semibold text-gray-700 flex items-center gap-2"><Cloud className="w-4 h-4" /> Carbon Footprint (in kg CO2e)</label>
                <Input
                  id="carbonFootprint"
                  type="number"
                  placeholder="e.g., 2.1"
                  value={formData.carbonFootprint}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("carbonFootprint", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="waterUsage" className=" text-sm font-semibold text-gray-700 flex items-center gap-2"><Droplet className="w-4 h-4" /> Water Usage (in Liters)</label>
                <Input
                  id="waterUsage"
                  type="number"
                  placeholder="e.g., 850"
                  value={formData.waterUsage}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("waterUsage", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="energyUsage" className=" text-sm font-semibold text-gray-700 flex items-center gap-2"><Power className="w-4 h-4" /> Energy Usage (in kWh)</label>
                <Input
                  id="energyUsage"
                  type="number"
                  placeholder="e.g., 1150"
                  value={formData.energyUsage}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("energyUsage", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Care Instructions</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {careInstructionsOptions.map((item, idx) => (
                  <Button
                    key={idx}
                    variant={formData.careInstructions.includes(item.value) ? "default" : "outline"}
                    className="justify-start gap-2"
                    onClick={() => handleCareInstructionChange(item.value)}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.value}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );
      case 5:
        return (
    <div className="space-y-8">
    <h3 className="text-3xl font-bold text-gray-800 border-b-2 pb-4 mb-6">Review & Confirm</h3>

    {/* Product Summary & General Information */}
    <Card className="">
        <CardHeader className="flex flex-row items-center gap-4 pb-4 border-b">
            <Package className="w-8 h-8 text-blue-600" />
            <div className="flex-1">
                <CardTitle className="text-xl md:text-2xl font-bold text-gray-800">{formData.name || 'Product Name Not Provided'}</CardTitle>
                <p className="text-sm text-gray-500 mt-1">General product details and scores</p>
            </div>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                {/* Product Image Section */}
                {formData.productImage && (
                    <div className="md:col-span-1">
                        <p className="text-sm font-medium text-gray-500 mb-2">Product Image</p>
                        <img src={formData.productImage} alt={formData.name || 'Product Image'} className="w-full h-auto max-h-56 object-cover rounded-xl shadow-md" />
                    </div>
                )}
                
                {/* General Details & Description */}
                <div className="md:col-span-2 space-y-4">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Category</p>
                        <p className="text-gray-900 font-semibold">{formData.category || 'Not provided'}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Description</p>
                        <p className="text-gray-700 leading-relaxed mt-1">{formData.description || 'Not provided'}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t mt-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500">PEF Score</p>
                            <Badge variant="outline" className="text-teal-700 border-teal-600 bg-teal-50/50 font-bold text-base mt-1">{formData.pefScore || 'N/A'} ppts</Badge>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">French Score</p>
                            <Badge variant="outline" className="text-teal-700 border-teal-600 bg-teal-50/50 font-bold text-base mt-1">{formData.frenchScore || 'N/A'} ppts</Badge>
                        </div>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>

    {/* Materials & Supplier */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="shadow-sm border-gray-200">
            <CardHeader className="flex flex-row items-center gap-2 pb-4 border-b">
                <Factory className="w-6 h-6 text-green-600" />
                <CardTitle className="text-xl font-semibold text-gray-800">Materials</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                {formData.materials.filter(mat => mat.name).length > 0 ? (
                    <div className="space-y-3">
                        {formData.materials.filter(mat => mat.name).map((mat, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                                <span className="text-gray-900 font-medium">{mat.name}</span>
                                <Badge variant="secondary" className="bg-gray-200 text-gray-800 font-medium">{mat.percentage}%</Badge>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 italic">No materials added.</p>
                )}
            </CardContent>
        </Card>

        <Card className="shadow-sm border-gray-200">
            <CardHeader className="flex flex-row items-center gap-2 pb-4 border-b">
                <Users className="w-6 h-6 text-purple-600" />
                <CardTitle className="text-xl font-semibold text-gray-800">Supplier & Origin</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Supplier Name</p>
                        <p className="text-gray-900 font-semibold">{formData.supplier.name || 'Not provided'}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Location</p>
                        <p className="text-gray-900 font-semibold">{formData.supplier.location || 'Not provided'}</p>
                    </div>
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-500">Productive Date</p>
                    <p className="text-gray-900 font-semibold">{formData.productiveDate || 'Not provided'}</p>
                </div>
            </CardContent>
        </Card>
    </div>

    {/* Sustainability & Certifications */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="shadow-sm border-gray-200">
            <CardHeader className="flex flex-row items-center gap-2 pb-4 border-b">
                <Leaf className="w-6 h-6 text-green-700" />
                <CardTitle className="text-xl font-semibold text-gray-800">Sustainability</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm font-medium text-gray-500 flex items-center gap-1"><Cloud className="w-4 h-4 text-green-700" /> Carbon Footprint</p>
                        <p className="text-gray-900 font-semibold">{formData.carbonFootprint || 'N/A'} kg CO2e</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 flex items-center gap-1"><Droplet className="w-4 h-4 text-blue-600" /> Water Usage</p>
                        <p className="text-gray-900 font-semibold">{formData.waterUsage || 'N/A'} Liters</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 flex items-center gap-1"><Power className="w-4 h-4 text-yellow-500" /> Energy Usage</p>
                        <p className="text-gray-900 font-semibold">{formData.energyUsage || 'N/A'} kWh</p>
                    </div>
                </div>
            </CardContent>
        </Card>

        <Card className="shadow-sm border-gray-200">
            <CardHeader className="flex flex-row items-center gap-2 pb-4 border-b">
                <FileCheck className="w-6 h-6 text-teal-600" />
                <CardTitle className="text-xl font-semibold text-gray-800">Certifications & Care</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
                <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">Certifications</p>
                    {formData.certifications.filter(cert => cert).length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {formData.certifications.filter(cert => cert).map((cert, idx) => (
                                <Badge key={idx} variant="outline" className="text-teal-600 border-teal-600 bg-teal-50 px-4 py-1.5 font-medium">
                                    <Award className="w-4 h-4 mr-2" />{cert}
                                </Badge>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 italic">No certifications added.</p>
                    )}
                </div>

                <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">Care Instructions</p>
                    <div className="flex flex-wrap gap-2">
                        {formData.careInstructions.length > 0 ? (
                            formData.careInstructions.map((instruction, idx) => {
                                const iconComponent = careInstructionsOptions.find(item => item.value === instruction)?.icon;
                                const Icon = iconComponent;
                                return (
                                    <Badge key={idx} variant="secondary" className="bg-gray-200 text-gray-800 font-medium flex items-center gap-1">
                                        {Icon && <Icon className="w-4 h-4" />}
                                        {instruction}
                                    </Badge>
                                );
                            })
                        ) : (
                            <span className="text-gray-500 italic text-sm">Not provided</span>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
</div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Add New Product</h1>
        <Button variant="outline" className="text-gray-700 border-gray-300">
          Cancel
        </Button>
      </div>

      {/* Stepper */}
      <div className="w-full mx-auto">
        <div className="flex items-center justify-between mb-8 relative">
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            />
          </div>

          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center z-10 relative">
              <div
                className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-colors duration-300 ${
                  i < currentStep
                    ? "bg-green-500 text-white border-green-500"
                    : i === currentStep
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-500 border-gray-300"
                }`}
              >
                <span className="flex items-center justify-center">
                  {i < currentStep ? <CheckCircle className="w-5 h-5" /> : step.icon}
                </span>
                <span className="font-medium">{step.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              {steps[currentStep].title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderStepContent()}
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex justify-between mt-4 w-full mx-auto">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex items-center gap-2 text-gray-700 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </Button>
        {currentStep < steps.length - 1 ? (
          <Button onClick={nextStep} disabled={!isStepValid()} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
            Next <ChevronRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={!isStepValid()} className="bg-green-600 hover:bg-green-700 text-white cursor-pointer">
            Submit Product
          </Button>
        )}
      </div>
    </div>
  );
}