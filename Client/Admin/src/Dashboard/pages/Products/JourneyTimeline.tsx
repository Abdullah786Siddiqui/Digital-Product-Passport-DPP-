"use client";

import { useState, useEffect } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Plus, Save, Eraser } from "lucide-react";
import toast from "react-hot-toast";

// Type definitions for the data structures
interface StageData {
  title: string;
  description: string;
  location: string;
  date: string;
}

interface SourcingData extends StageData {
  supplierName: string;
}

interface ManufacturingData extends StageData {
  manufacturerName: string;
}

interface QualityAssuranceData extends StageData {
  inspectionResult: string;
  responsiblePerson: string;
}

interface JourneyDataType {
  sourcing: SourcingData;
  manufacturing: ManufacturingData;
  qualityAssurance: QualityAssuranceData;
}

const Icon = ({ name, className }: { name: string; className: string }) => {
  switch (name) {
    case "MapPin":
      return <MapPin className={className} />;
    case "Calendar":
      return <Calendar className={className} />;
    case "Plus":
      return <Plus className={className} />;
    case "Save":
      return <Save className={className} />;
    case "Eraser":
      return <Eraser className={className} />;
    default:
      return null;
  }
};

const locations = [
  "Lahore, Pakistan",
  "Faisalabad, Pakistan",
  "Karachi, Pakistan",
  "Islamabad, Pakistan",
  "Sialkot, Pakistan",
];

const emptyProductData: JourneyDataType = {
  sourcing: {
    title: "Sourcing",
    description: "",
    location: "",
    supplierName: "",
    date: "",
  },
  manufacturing: {
    title: "Manufacturing",
    description: "",
    location: "",
    date: "",
    manufacturerName: "",
  },
  qualityAssurance: {
    title: "Quality Assurance",
    description: "",
    location: "",
    date: "",
    inspectionResult: "",
    responsiblePerson: "",
  },
};

const JourneyTimeline = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [journeyData, setJourneyData] = useState<JourneyDataType>(emptyProductData);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const stages = ["sourcing", "manufacturing", "qualityAssurance"] as const;

  const checkFormValidity = (data: JourneyDataType): boolean => {
    if (!selectedProduct) {
      return false;
    }

    const requiredFields = {
      sourcing: ['description', 'location', 'supplierName', 'date'],
      manufacturing: ['description', 'location', 'date', 'manufacturerName'],
      qualityAssurance: ['description', 'location', 'date', 'inspectionResult', 'responsiblePerson'],
    };

    for (const stageName of stages) {
      const stage = data[stageName];
      const hasAllFields = requiredFields[stageName].every(field => {
        const value = stage[field as keyof typeof stage];
        return typeof value === 'string' && value.trim() !== '';
      });
      if (!hasAllFields) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    setIsFormValid(checkFormValidity(journeyData));
  }, [journeyData, selectedProduct]);

  const handleInputChange = (stageName: keyof JourneyDataType, fieldName: string, value: string) => {
    setJourneyData(prevData => {
      const updatedStage = { ...prevData[stageName] } as any;
      updatedStage[fieldName] = value;
      return {
        ...prevData,
        [stageName]: updatedStage
      };
    });
  };

  const handleSave = () => {
    if (isFormValid) {
      console.log(`Saving journey for product: ${selectedProduct}`);
      console.log("Journey Data:", journeyData);
      toast.success(`${selectedProduct} journey saved! ✅`);
      // Simulating API call delay
      setTimeout(() => {
        handleClear();
      }, 500);
    } else {
      toast.error("Please fill in all the required fields.");
    }
  };

  const handleClear = () => {
    setSelectedProduct("");
    setJourneyData(emptyProductData);
  };

  return (
    <div className="min-h-screen font-sans p-3 bg-[whitesmoke]">
      <div className="w-full mx-auto">
        <div className="flex items-center space-x-4 mb-8">
          <h1 className="text-3xl font-bold">
            Product Journey
          </h1>
        </div>
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:space-x-4 space-y-4 sm:space-y-0">
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Select Product
            </label>
            <Select onValueChange={setSelectedProduct} value={selectedProduct}>
              <SelectTrigger className="w-full h-12 text-md">
                <SelectValue placeholder="Choose a product to view its journey" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="shampoo">Shampoo</SelectItem>
                <SelectItem value="facewash">Face Wash</SelectItem>
                <SelectItem value="soap">Soap</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex space-x-2">
            <Button
              onClick={handleSave}
              variant="default"
              className="bg-green-600 hover:bg-green-700 text-white shadow-md transition-transform transform hover:scale-105"
              disabled={!isFormValid}
            >
              <Icon name="Save" className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button
              onClick={handleClear}
              variant="outline"
              className="border-gray-300 text-gray-600 hover:bg-gray-100 shadow-md transition-transform transform hover:scale-105"
            >
              <Icon name="Eraser" className="mr-2 h-4 w-4" />
              Clear All
            </Button>
          </div>
        </div>
        {selectedProduct ? (
          <>
            <Accordion type="multiple" defaultValue={[]} className="w-full space-y-4">
              {stages.map((stageName) => {
                const stage = journeyData[stageName];
                if (!stage) return null;
                return (
                  <AccordionItem
                    key={stageName}
                    value={stageName}
                    className="border-b-2 border-slate-200 last:border-b-0 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline px-6 py-4 bg-white hover:bg-zinc-50 transition-colors">
                      <div className="flex justify-between items-center w-full">
                        <span className="flex items-center">
                          {stage.title}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-6 bg-zinc-50 space-y-4">
                      {stageName === "sourcing" && (
                        <>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-600">Supplier Name</label>
                            <Input
                              placeholder="Supplier Name"
                              className="bg-white"
                              value={journeyData.sourcing.supplierName}
                              onChange={(e) => handleInputChange("sourcing", "supplierName", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-600">Sourcing Date</label>
                            <div className="relative">
                              <Input
                                type="date"
                                className="pr-10 bg-white"
                                value={journeyData.sourcing.date}
                                onChange={(e) => handleInputChange("sourcing", "date", e.target.value)}
                              />
                              <Icon name="Calendar" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                          </div>
                        </>
                      )}

                      {stageName === "manufacturing" && (
                        <>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-600">Manufacturer Name</label>
                            <Input
                              placeholder="Manufacturer Name"
                              className="bg-white"
                              value={journeyData.manufacturing.manufacturerName}
                              onChange={(e) => handleInputChange("manufacturing", "manufacturerName", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-600">Production Date</label>
                            <div className="relative">
                              <Input
                                type="date"
                                className="pr-10 bg-white"
                                value={journeyData.manufacturing.date}
                                onChange={(e) => handleInputChange("manufacturing", "date", e.target.value)}
                              />
                              <Icon name="Calendar" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                          </div>
                        </>
                      )}

                      {stageName === "qualityAssurance" && (
                        <>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-600">Inspection Result</label>
                            <Input
                              placeholder="Inspection Result"
                              className="bg-white"
                              value={journeyData.qualityAssurance.inspectionResult}
                              onChange={(e) => handleInputChange("qualityAssurance", "inspectionResult", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-600">Responsible Person</label>
                            <Input
                              placeholder="Responsible Person"
                              className="bg-white"
                              value={journeyData.qualityAssurance.responsiblePerson}
                              onChange={(e) => handleInputChange("qualityAssurance", "responsiblePerson", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-600">Inspection Date</label>
                            <div className="relative">
                              <Input
                                type="date"
                                className="pr-10 bg-white"
                                value={journeyData.qualityAssurance.date}
                                onChange={(e) => handleInputChange("qualityAssurance", "date", e.target.value)}
                              />
                              <Icon name="Calendar" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                          </div>
                        </>
                      )}

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-600">Description</label>
                        <Textarea
                          placeholder="Describe the process..."
                          className="bg-white"
                          value={journeyData[stageName].description}
                          onChange={(e) => handleInputChange(stageName, "description", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-600">Location</label>
                        <Select
                          onValueChange={(value) => handleInputChange(stageName, "location", value)}
                          value={journeyData[stageName].location}
                        >
                          <SelectTrigger className="w-full h-12 text-md">
                            <Icon name="MapPin" className="mr-2 h-5 w-5 text-gray-400" />
                            <SelectValue placeholder="Choose a location" />
                          </SelectTrigger>
                          <SelectContent>
                            {locations.map((loc) => (
                              <SelectItem key={loc} value={loc}>
                                {loc}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
            <div className="mt-8 flex justify-center">
              <Button variant="default" className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-transform transform hover:scale-105">
                <Icon name="Plus" className="mr-2 h-4 w-4" />
                Add New Stage
              </Button>
            </div>
          </>
        ) : (
          <div className="p-10 text-center text-gray-500 italic bg-white rounded-lg shadow-inner border border-gray-200">
            <p className="text-lg">
              <span className="block mb-2 font-bold text-gray-700">Welcome!</span>
              Please select a product from the dropdown above to view its journey details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JourneyTimeline;