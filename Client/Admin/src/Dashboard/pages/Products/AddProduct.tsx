import { useState } from "react";
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
import toast from 'react-hot-toast';
import {
  Package,
  Factory,
  Users,
  FileCheck,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AddProduct () {
  const steps = [
    { title: "General Info", icon: <Package className="w-4 h-4" /> },
    { title: "Materials", icon: <Factory className="w-4 h-4" /> },
    { title: "Supplier", icon: <Users className="w-4 h-4" /> },
    { title: "Certifications", icon: <FileCheck className="w-4 h-4" /> },
    { title: "Review", icon: <CheckCircle className="w-4 h-4" /> },
  ];

  const categories = ["Apparel", "Electronics", "Home Goods", "Food & Beverage", "Footwear"];
  const locations = ["Pakistan", "China", "India", "Bangladesh", "Vietnam"];
  const certifications = ["GOTS", "OEKO-TEX", "B-Corp", "Fair Trade Certified", "Global Recycle Standard"];

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    materials: [{ name: "", percentage: "" }],
    supplier: { name: "", location: "" },
    certifications: [""]
  });

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
      default:
        return false;
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleMaterialChange = (index: number, field: string, value: string) => {
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
  const navigate = useNavigate();
  const handleSubmit = () => {


    console.log("Submitting product:", formData);
    toast.success('Product submitted successfully!');
    setTimeout(() => {
      navigate('/ProductsList'); // replace with your route
    }, 1500);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="productName" className="block text-sm font-semibold text-gray-700">Product Name</label>
                <Input
                  id="productName"
                  placeholder="Eco-Friendly Water Bottle"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
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
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700">Product Description</label>
              <Textarea
                id="description"
                placeholder="Enter a detailed description of the product, including its key features and eco-friendly benefits."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
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
                  onChange={(e) => handleMaterialChange(idx, "name", e.target.value)}
                  className="bg-white"
                />
                <div className="relative w-24">
                  <Input
                    type="number"
                    placeholder="%"
                    value={material.percentage}
                    onChange={(e) => handleMaterialChange(idx, "percentage", e.target.value)}
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
                  onChange={(e) => setFormData({ ...formData, supplier: { ...formData.supplier, name: e.target.value } })}
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
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-gray-800 border-b-2 pb-4 mb-6">Review & Confirm</h3>

            {/* General Information Card */}
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center gap-2">
                <Package className="w-6 h-6 text-blue-600" />
                <CardTitle className="text-xl font-semibold text-gray-800">General Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Product Name</p>
                    <p className="text-gray-900 font-semibold">{formData.name || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Category</p>
                    <p className="text-gray-900 font-semibold">{formData.category || 'Not provided'}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm font-medium text-gray-500">Description</p>
                    <p className="text-gray-900">{formData.description || 'Not provided'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Materials and Supplier Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Materials Card */}
              <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center gap-2">
                  <Factory className="w-6 h-6 text-green-600" />
                  <CardTitle className="text-xl font-semibold text-gray-800">Materials</CardTitle>
                </CardHeader>
                <CardContent>
                  {formData.materials.filter(mat => mat.name).length > 0 ? (
                    <div className="space-y-3">
                      {formData.materials.filter(mat => mat.name).map((mat, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-900">{mat.name}</span>
                          <Badge variant="secondary" className="bg-gray-200 text-gray-800 font-medium">{mat.percentage}%</Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">No materials added.</p>
                  )}
                </CardContent>
              </Card>

              {/* Supplier Card */}
              <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center gap-2">
                  <Users className="w-6 h-6 text-purple-600" />
                  <CardTitle className="text-xl font-semibold text-gray-800">Supplier & Origin</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Supplier Name</p>
                    <p className="text-gray-900 font-semibold">{formData.supplier.name || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Location</p>
                    <p className="text-gray-900 font-semibold">{formData.supplier.location || 'Not provided'}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Certifications Card */}
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center gap-2">
                <FileCheck className="w-6 h-6 text-teal-600" />
                <CardTitle className="text-xl font-semibold text-gray-800">Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                {formData.certifications.filter(cert => cert).length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {formData.certifications.filter(cert => cert).map((cert, idx) => (
                      <Badge key={idx} variant="outline" className="text-teal-600 border-teal-600 bg-teal-50 px-4 py-1.5 font-medium">
                        <CheckCircle className="w-4 h-4 mr-2" />{cert}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">No certifications added.</p>
                )}
              </CardContent>
            </Card>
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
          {/* Progress Bar */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            />
          </div>

          {/* Steps */}
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center z-10 relative">
              {/* Step Pill */}
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