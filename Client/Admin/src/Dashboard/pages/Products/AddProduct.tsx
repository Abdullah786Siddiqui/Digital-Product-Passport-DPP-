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
  Recycle,
  FlaskConical,
  Cog,
  Info,
} from "lucide-react";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";


// Updated interface to remove the 'productiveDate' field
interface ProductFormData {
  name: string;
  category: string;
  description: string;
  productImage: string | null;
  materials: { name: string; percentage: string }[];
  certifications: string[];
  pefScore: string;
  frenchScore: string;
  carbonFootprint: string;
  waterUsage: string;
  energyUsage: string;
  careInstructions: string[];
  chemicals: { name: string; usage: string }[];
  processes: { name: string; location: string; method: string }[];
}

export default function AddProduct() {
  const steps = [
    { title: "General Info", icon: <Package className="w-4 h-4" /> },
    { title: "Composition", icon: <Factory className="w-4 h-4" /> },
    { title: "Certifications", icon: <FileCheck className="w-4 h-4" /> },
    { title: "Sustainability", icon: <Leaf className="w-4 h-4" /> },
    { title: "Review", icon: <CheckCircle className="w-4 h-4" /> },
  ];

  const categories = ["Apparel", "Electronics", "Home Goods", "Food & Beverage", "Footwear"];
  const certifications = ["GOTS", "OEKO-TEX", "B-Corp", "Fair Trade Certified", "Global Recycle Standard"];
  
  // Predefined lists for dropdowns
  const materialOptions = ["Organic Cotton", "Recycled Polyester", "Linen", "Hemp", "Wool", "Tencel Lyocell"];
  const chemicalOptions = ["Low Impact Dyes", "Phthalate-Free Softener", "Eco-Friendly Bleach", "Water-Based Ink", "Biodegradable Detergent"];
  const processOptions = ["Spinning", "Weaving", "Knitting", "Dyeing", "Cutting", "Stitching", "Finishing"];
  const processLocations = ["Karachi", "Lahore", "Faisalabad", "Sialkot", "Multan"];

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
    productImage: null,
    materials: [{ name: "", percentage: "" }],
    certifications: [""],
    pefScore: "",
    frenchScore: "",
    carbonFootprint: "",
    waterUsage: "",
    energyUsage: "",
    careInstructions: [],
    chemicals: [{ name: "", usage: "" }],
    processes: [{ name: "", location: "", method: "" }],
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
        return (
            formData.materials.every(mat => mat.name.trim() !== "" && mat.percentage.trim() !== "") &&
            formData.chemicals.every(chem => chem.name.trim() !== "" && chem.usage.trim() !== "") &&
            formData.processes.every(proc => proc.name.trim() !== "" && proc.location.trim() !== "" && proc.method.trim() !== "")
        );
      case 2:
        return formData.certifications.every(cert => cert.trim() !== "");
      case 3:
        return true;
      case 4:
        return true;
      default:
        return false;
    }
  };

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

  const handleInputChange = (field: keyof Omit<ProductFormData, 'productImage' | 'materials' | 'certifications' | 'careInstructions' | 'chemicals' | 'processes'>, value: string) => {
    setFormData({ ...formData, [field]: value });
  };
  
  const handleMaterialChange = (index: number, field: 'name' | 'percentage', value: string) => {
    const updatedMaterials = [...formData.materials];
    updatedMaterials[index][field] = value;
    setFormData({ ...formData, materials: updatedMaterials });
  };

  const addMaterial = () => {
    setFormData(prev => ({
      ...prev,
      materials: [...prev.materials, { name: "", percentage: "" }]
    }));
  };

  const removeMaterial = (index: number) => {
    const updated = formData.materials.filter((_, i) => i !== index);
    setFormData({ ...formData, materials: updated.length > 0 ? updated : [{ name: "", percentage: "" }] });
  };

  const handleChemicalChange = (index: number, field: 'name' | 'usage', value: string) => {
    const updatedChemicals = [...formData.chemicals];
    updatedChemicals[index][field] = value;
    setFormData({ ...formData, chemicals: updatedChemicals });
  };

  const addChemical = () => {
    setFormData(prev => ({
      ...prev,
      chemicals: [...prev.chemicals, { name: "", usage: "" }]
    }));
  };

  const removeChemical = (index: number) => {
    const updated = formData.chemicals.filter((_, i) => i !== index);
    setFormData({ ...formData, chemicals: updated.length > 0 ? updated : [{ name: "", usage: "" }] });
  };

  const handleProcessChange = (index: number, field: 'name' | 'location' | 'method', value: string) => {
    const updatedProcesses = [...formData.processes];
    updatedProcesses[index][field] = value;
    setFormData({ ...formData, processes: updatedProcesses });
  };

  const addProcess = () => {
    setFormData(prev => ({
      ...prev,
      processes: [...prev.processes, { name: "", location: "", method: "" }]
    }));
  };

  const removeProcess = (index: number) => {
    const updated = formData.processes.filter((_, i) => i !== index);
    setFormData({ ...formData, processes: updated.length > 0 ? updated : [{ name: "", location: "", method: "" }] });
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

  // Get old data from localStorage safely
  const stored = localStorage.getItem("products");
  const existingProducts: typeof formData[] = stored ? JSON.parse(stored) : [];

  // Add new product
  const updatedProducts = [...existingProducts, formData];

  // Save back to localStorage
  localStorage.setItem("products", JSON.stringify(updatedProducts));

  // Success message
  toast.success("Product submitted successfully!");

  // Redirect after delay
  setTimeout(() => {
    navigate("/ProductsList");
  }, 1500);
};


  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="space-y-6">
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
          <div className="space-y-8">
            {/* Section for Materials */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3 border-b-2 pb-3">
                <Recycle className="w-6 h-6 text-green-600" />
                Material Composition
              </h3>
              {formData.materials.map((material, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-300 hover:shadow-xl">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Material Name</label>
                    <Select onValueChange={(value) => handleMaterialChange(index, 'name', value)} value={material.name}>
                      <SelectTrigger className="w-full focus-visible:ring-green-500">
                        <SelectValue placeholder="Select a material" />
                      </SelectTrigger>
                      <SelectContent>
                        {materialOptions.map((mat) => (
                          <SelectItem key={mat} value={mat}>{mat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Percentage (%)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 60"
                      value={material.percentage}
                      onChange={(e) => handleMaterialChange(index, 'percentage', e.target.value)}
                      className="focus-visible:ring-green-500"
                    />
                  </div>
                  <div className="flex items-end justify-end sm:justify-start">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeMaterial(index)}
                      disabled={formData.materials.length === 1}
                      className="text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={addMaterial}
                className="mt-4 w-full md:w-auto border-dashed border-gray-400 text-gray-600 hover:bg-gray-100 transition-colors"
              >
                + Add Another Material
              </Button>
            </div>

            {/* Section for Chemicals */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3 border-b-2 pb-3">
                <FlaskConical className="w-6 h-6 text-blue-600" />
                Chemical Usage
              </h3>
              {formData.chemicals.map((chemical, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-300 hover:shadow-xl">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Chemical Name</label>
                    <Select onValueChange={(value) => handleChemicalChange(index, 'name', value)} value={chemical.name}>
                      <SelectTrigger className="w-full focus-visible:ring-blue-500">
                        <SelectValue placeholder="Select a chemical" />
                      </SelectTrigger>
                      <SelectContent>
                        {chemicalOptions.map((chem) => (
                          <SelectItem key={chem} value={chem}>{chem}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Usage (per kg)</label>
                    <Input
                      placeholder="e.g., 50g"
                      value={chemical.usage}
                      onChange={(e) => handleChemicalChange(index, 'usage', e.target.value)}
                      className="focus-visible:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-end justify-end sm:justify-start">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeChemical(index)}
                      disabled={formData.chemicals.length === 1}
                      className="text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={addChemical}
                className="mt-4 w-full md:w-auto border-dashed border-gray-400 text-gray-600 hover:bg-gray-100 transition-colors"
              >
                + Add Another Chemical
              </Button>
            </div>

            {/* Section for Processes */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3 border-b-2 pb-3">
                <Cog className="w-6 h-6 text-purple-600" />
                Treatment Processes
              </h3>
              {formData.processes.map((process, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-4 gap-6 p-6 rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-300 hover:shadow-xl">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Process Name</label>
                    <Select onValueChange={(value) => handleProcessChange(index, 'name', value)} value={process.name}>
                      <SelectTrigger className="w-full focus-visible:ring-purple-500">
                        <SelectValue placeholder="Select a process" />
                      </SelectTrigger>
                      <SelectContent>
                        {processOptions.map((proc) => (
                          <SelectItem key={proc} value={proc}>{proc}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Location</label>
                    <Select onValueChange={(value) => handleProcessChange(index, 'location', value)} value={process.location}>
                      <SelectTrigger className="w-full focus-visible:ring-purple-500">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {processLocations.map((loc) => (
                          <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Days of Process</label>
                    <Input
                      placeholder="e.g., 7 days"
                      value={process.method}
                      onChange={(e) => handleProcessChange(index, 'method', e.target.value)}
                      className="focus-visible:ring-purple-500"
                    />
                  </div>
                  <div className="flex items-end justify-end sm:justify-start">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeProcess(index)}
                      disabled={formData.processes.length === 1}
                      className="text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={addProcess}
                className="mt-4 w-full md:w-auto border-dashed border-gray-400 text-gray-600 hover:bg-gray-100 transition-colors"
              >
                + Add Another Process
              </Button>
            </div>
          </div>
        );

      case 2:
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
      case 3:
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
      case 4:
        return (
<div className="space-y-8">
  <h3 className="text-3xl font-bold text-gray-800 border-b-2 pb-4 mb-6 text-center">Final Product Review</h3>

  {/* General Information Card with Improved Grid Layout and Reduced Image Spacing */}
<Card className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
  <div className="flex items-center space-x-4 pb-6 mb-6 border-b border-gray-100">
    <Info className="w-8 h-8 text-blue-600" />
    <CardTitle className="text-2xl font-bold text-gray-800">General Information</CardTitle>
  </div>
  
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
    {/* Product Details Section */}
    <div className={`space-y-6 ${!formData.productImage && 'lg:col-span-2'}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
        <div className="sm:col-span-2">
          <p className="text-sm font-medium text-gray-500">Product Name</p>
          <p className="text-2xl font-bold text-gray-900">{formData.name || 'Not provided'}</p>
        </div>
        
        <div className="col-span-1">
          <p className="text-sm font-medium text-gray-500">Category</p>
          <p className="text-lg font-semibold text-gray-800">{formData.category || 'Not provided'}</p>
        </div>
        
        <div className="col-span-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">PEF Score</p>
            <Badge variant="outline" className="bg-blue-100 text-blue-800 font-semibold text-base mt-1 p-1">
              <Award className="w-4 h-4 mr-2" />{formData.pefScore || 'N/A'} ppts
            </Badge>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">French Score</p>
            <Badge variant="outline" className="bg-purple-100 text-purple-800 font-semibold text-base p-1 mt-1">
              <Award className="w-4 h-4 mr-2" />{formData.frenchScore || 'N/A'} ppts
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-100">
        <p className="text-sm font-medium text-gray-500">Description</p>
        <p className="text-gray-700 leading-relaxed mt-1">{formData.description || 'Not provided'}</p>
      </div>
    </div>

    {/* Product Image Section */}
    {formData.productImage && (
      <div className="flex justify-center lg:justify-end">
        <img src={formData.productImage} alt={formData.name || 'Product Image'} className="w-full max-w-sm h-auto max-h-64 object-cover rounded-xl border border-gray-200" />
      </div>
    )}
  </div>
</Card>

  {/* Composition & Processes Grid (Same as before) */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <Card className="bg-white rounded-2xl border border-gray-100">
      <CardHeader className="p-6 border-b border-gray-100 flex items-center space-x-4">
        <Factory className="w-8 h-8 text-green-600" />
        <CardTitle className="text-2xl font-bold text-gray-800">Composition</CardTitle>
      </CardHeader>
      <CardContent className="p-6 md:p-8 space-y-6">
        <div>
          <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-green-600" /> Materials
          </h4>
          {formData.materials.filter(mat => mat.name).length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {formData.materials.filter(mat => mat.name).map((mat, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="text-gray-900 font-medium">{mat.name}</span>
                  <Badge className="bg-green-100 text-green-800 font-semibold text-sm px-3 py-1">{mat.percentage}%</Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">No materials added.</p>
          )}
        </div>
        <div>
          <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-blue-600" /> Chemicals
          </h4>
          {formData.chemicals.filter(chem => chem.name).length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {formData.chemicals.filter(chem => chem.name).map((chem, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="text-gray-900 font-medium">{chem.name}</span>
                  <Badge className="bg-blue-100 text-blue-800 font-semibold text-sm px-3 py-1">{chem.usage}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">No chemicals added.</p>
          )}
        </div>
        <div>
          <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Cog className="w-5 h-5 text-purple-600" /> Processes
          </h4>
          {formData.processes.filter(proc => proc.name).length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {formData.processes.filter(proc => proc.name).map((proc, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="text-gray-900 font-medium">{proc.name}</span>
                  <Badge className="bg-purple-100 text-purple-800 font-semibold text-sm px-3 py-1">{proc.location} ({proc.method})</Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">No processes added.</p>
          )}
        </div>
      </CardContent>
    </Card>

    {/* Sustainability & Care Grid (Same as before) */}
    <Card className="bg-white rounded-2xl border border-gray-100">
      <CardHeader className="p-6 border-b border-gray-100 flex items-center space-x-4">
        <Recycle className="w-8 h-8 text-teal-600" />
        <CardTitle className="text-2xl font-bold text-gray-800">Sustainability & Care</CardTitle>
      </CardHeader>
      <CardContent className="p-6 md:p-8 space-y-6">
        <div>
          <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Cloud className="w-5 h-5 text-yellow-600" /> Metrics
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm font-medium text-gray-500 flex items-center gap-1"><Cloud className="w-4 h-4 text-gray-600" /> Carbon Footprint</p>
              <p className="text-gray-900 font-semibold text-lg">{formData.carbonFootprint || 'N/A'} kg CO2e</p>
            </div>
            <div className="space-y-1 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm font-medium text-gray-500 flex items-center gap-1"><Droplet className="w-4 h-4 text-gray-600" /> Water Usage</p>
              <p className="text-gray-900 font-semibold text-lg">{formData.waterUsage || 'N/A'} Liters</p>
            </div>
            <div className="space-y-1 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm font-medium text-gray-500 flex items-center gap-1"><Power className="w-4 h-4 text-gray-600" /> Energy Usage</p>
              <p className="text-gray-900 font-semibold text-lg">{formData.energyUsage || 'N/A'} kWh</p>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-green-600" /> Certifications & Care
          </h4>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">Certifications</p>
              {formData.certifications.filter(cert => cert).length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {formData.certifications.filter(cert => cert).map((cert, idx) => (
                    <Badge key={idx} variant="outline" className="bg-teal-100 text-teal-800 font-semibold px-4 py-1.5">
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
                      <Badge key={idx} className="bg-gray-200 text-gray-800 font-semibold flex items-center gap-1 p-2">
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
    <div className="space-y-8 min-h-screen py-2">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Add New Product</h1>
        <Button variant="outline" className="text-gray-700 border-gray-300">
          Cancel
        </Button>
      </div>

  <div className="w-full mx-auto p-4 md:p-0">
    {/* Desktop Stepper (Hidden on mobile) */}
    <div className="hidden md:flex items-center justify-between mb-8 relative">
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

    {/* Mobile Stepper with Circular Progress (Hidden on desktop) */}
    <div className="md:hidden flex flex-col items-center justify-center space-y-4 mb-8">
        <div className="relative w-20 h-20">
            {/* SVG for Circular Progress */}
            <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                    className="text-gray-200 stroke-current"
                    strokeWidth="8"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                />
                <circle
                    className="text-blue-500 stroke-current transition-all duration-500 ease-in-out"
                    strokeWidth="8"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    strokeDasharray="251.2" // Circumference of the circle (2 * pi * 40)
                    strokeDashoffset={251.2 - (251.2 * ((currentStep + 1) / steps.length))}
                />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="text-xl font-bold text-gray-800">{currentStep + 1}</span>
                <span className="text-sm text-gray-500">/{steps.length}</span>
            </div>
        </div>
        <p className="text-lg font-semibold text-gray-700 mt-2">{steps[currentStep].title}</p>
        <div className="flex w-full justify-between items-center text-gray-500 text-xs mt-2">
            <span>{steps[0].title}</span>
            <span>{steps[steps.length - 1].title}</span>
        </div>
    </div>
</div>

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