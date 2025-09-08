// src/pages/Products/AddProduct.jsx
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
  Package,
  Factory,
  Users,
  FileCheck,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Trash2,
} from "lucide-react";

export default function AddProduct() {
  const steps = [
    { title: "General Info", icon: <Package className="w-4 h-4" /> },
    { title: "Materials", icon: <Factory className="w-4 h-4" /> },
    { title: "Supplier", icon: <Users className="w-4 h-4" /> },
    { title: "Certifications", icon: <FileCheck className="w-4 h-4" /> },
    { title: "Review", icon: <CheckCircle className="w-4 h-4" /> },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    materials: [{ name: "", percentage: "" }],
    supplier: { name: "", location: "" },
    certifications: [""],
  });

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  // Material handlers
const handleMaterialChange = (
  index: number, 
  field: string, 
  value: string | number | boolean
): void => {
  const updatedMaterials = [...formData.materials];
  updatedMaterials[index] = {
    ...updatedMaterials[index],
    [field]: value,
  };
  
  setFormData({ 
    ...formData, 
    materials: updatedMaterials 
  });
};

  const addMaterial = () =>
    setFormData({
      ...formData,
      materials: [...formData.materials, { name: "", percentage: "" }],
    });

  const removeMaterial = (index:number) => {
    const updated = formData.materials.filter((_, i) => i !== index);
    setFormData({ ...formData, materials: updated });
  };

  // Certification handlers
  const handleCertificationChange = (index:number, value:string) => {
    const updatedCerts = [...formData.certifications];
    updatedCerts[index] = value;
    setFormData({ ...formData, certifications: updatedCerts });
  };

  const addCertification = () =>
    setFormData({
      ...formData,
      certifications: [...formData.certifications, ""],
    });

  const removeCertification = (index:number) => {
    const updated = formData.certifications.filter((_, i) => i !== index);
    setFormData({ ...formData, certifications: updated });
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Add New Product</h1>
        <Button variant="outline" className="text-gray-700 border-gray-300">
          Cancel
        </Button>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-between mb-6">
        {steps.map((step, i) => (
          <div key={i} className="flex-1 flex flex-col items-center relative">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${
                i === currentStep
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step.icon}
              <span className="text-sm font-medium">{step.title}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="absolute top-5 left-full w-full border-t border-dashed border-gray-300"></div>
            )}
          </div>
        ))}
      </div>

      {/* Form Section */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {steps[currentStep].title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentStep === 0 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Product Name
                </label>
                <Input
                  placeholder="Eco-Friendly Water Bottle"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <Input
                  placeholder="Household / Electronics"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <Textarea
                  placeholder="Enter product description..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              {formData.materials.map((material, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <Input
                    placeholder="Material Name"
                    value={material.name}
                    onChange={(e) =>
                      handleMaterialChange(idx, "name", e.target.value)
                    }
                  />
                  <Input
                    placeholder="%"
                    value={material.percentage}
                    onChange={(e) =>
                      handleMaterialChange(idx, "percentage", e.target.value)
                    }
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeMaterial(idx)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addMaterial}>
                + Add Material
              </Button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Supplier Name
                </label>
                <Input
                  placeholder="Green Supply Co."
                  value={formData.supplier.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      supplier: { ...formData.supplier, name: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Location
                </label>
                <Input
                  placeholder="Shenzhen, China"
                  value={formData.supplier.location}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      supplier: { ...formData.supplier, location: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              {formData.certifications.map((cert, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <Input
                    placeholder="Certification Name"
                    value={cert}
                    onChange={(e) => handleCertificationChange(idx, e.target.value)}
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeCertification(idx)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addCertification}>
                + Add Certification
              </Button>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-700">Review Summary</h3>
              <p>
                <strong>Name:</strong> {formData.name}
              </p>
              <p>
                <strong>Category:</strong> {formData.category}
              </p>
              <p>
                <strong>Description:</strong> {formData.description}
              </p>
              <p>
                <strong>Supplier:</strong> {formData.supplier.name},{" "}
                {formData.supplier.location}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="secondary">
                  {formData.materials.length} Materials Added
                </Badge>
                <Badge variant="secondary">
                  {formData.certifications.length} Certifications Added
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-between mt-4">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </Button>
        {currentStep < steps.length - 1 ? (
          <Button onClick={nextStep} className="flex items-center gap-2">
            Next <ChevronRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            Submit Product
          </Button>
        )}
      </div>
    </div>
  );
}
