"use client";

import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Save, Eraser } from "lucide-react";
import toast from "react-hot-toast";

// Type definitions for the data structures
interface Certification {
  name: string;
}

interface EnvironmentalImpactData {
  certifications: Certification[];
}

interface SocialImpactData {
  certifications: Certification[];
  workerPolicies: Certification[];
}

interface AnimalImpactData {
  certifications: Certification[];
}

interface HealthImpactData {
  certifications: Certification[];
}

interface ProductImpactDataType {
  environmental: EnvironmentalImpactData;
  social: SocialImpactData;
  animal: AnimalImpactData;
  health: HealthImpactData;
}

interface ProductData {
  id: string;
  name: string;
  impact: ProductImpactDataType;
}

const Icon = ({ name, className }: { name: string; className: string }) => {
  switch (name) {
    case "Save":
      return <Save className={className} />;
    case "Eraser":
      return <Eraser className={className} />;
    default:
      return null;
  }
};

const emptyImpactData: ProductImpactDataType = {
  environmental: {
    certifications: [],
  },
  social: {
    certifications: [],
    workerPolicies: [],
  },
  animal: {
    certifications: [],
  },
  health: {
    certifications: [],
  },
};

const initialProducts: ProductData[] = [
  {
    id: "dual-tone-hoodie",
    name: "Dual Tone Cotton Hoodie",
    impact: {
      environmental: {
        certifications: [
          { name: "Global Organic Textile Standard" },
          { name: "OEKO-TEX®" },
        ],
      },
      social: {
        certifications: [
          { name: "Fair Trade" },
          { name: "SAI" },
        ],
        workerPolicies: [
          { name: "Fair Wages" },
          { name: "Safe Conditions" },
        ],
      },
      animal: {
        certifications: [
          { name: "Leaping Bunny" },
          { name: "PETA-Approved Vegan" },
        ],
      },
      health: {
        certifications: [
          { name: "REACH Compliance (EU)" },
          { name: "OEKO-TEX® STANDARD 100" },
        ],
      },
    },
  },
  {
    id: "recycled-t-shirt",
    name: "Recycled Polyester T-Shirt",
    impact: {
      environmental: {
        certifications: [
          { name: "GRS - Global Recycle Standard" },
        ],
      },
      social: {
        certifications: [
          { name: "SAI" },
          { name: "BSCI" },
        ],
        workerPolicies: [
          { name: "Fair Wages" },
          { name: "No Child Labor" },
        ],
      },
      animal: {
        certifications: [],
      },
      health: {
        certifications: [
          { name: "REACH Compliance (EU)" },
        ],
      },
    },
  },
  {
    id: "eco-friendly-jeans",
    name: "Eco-friendly Denim Jeans",
    impact: {
      environmental: {
        certifications: [
          { name: "Bluesign®" },
        ],
      },
      social: {
        certifications: [
          { name: "SAI" },
          { name: "WRAP" },
        ],
        workerPolicies: [
          { name: "Fair Wages" },
          { name: "Safe Conditions" },
        ],
      },
      animal: {
        certifications: [
          { name: "Leaping Bunny" },
        ],
      },
      health: {
        certifications: [
          { name: "REACH Compliance (EU)" },
          { name: "OEKO-TEX® STANDARD 100" },
        ],
      },
    },
  },
];

const environmentalCertificationOptions = ["Global Organic Textile Standard", "OEKO-TEX®", "Bluesign®", "GRS - Global Recycle Standard"];
const socialCertificationOptions = ["Fair Trade", "SAI", "WRAP", "BSCI"];
const workerPoliciesOptions = ["Fair Wages", "Safe Conditions", "No Child Labor", "Worker Voice"];
const animalCertificationOptions = ["Leaping Bunny", "PETA-Approved Vegan"];
const healthCertificationOptions = ["REACH Compliance (EU)", "OEKO-TEX® STANDARD 100"];

const ProductImpact = () => {
  const [products, setProducts] = useState<ProductData[]>(initialProducts);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [impactData, setImpactData] = useState<ProductImpactDataType | null>(null);

  const handleProductSelect = (productId: string) => {
    setSelectedProductId(productId);
    const product = products.find(p => p.id === productId);
    setImpactData(product ? product.impact : emptyImpactData);
  };

  const handleCertificationAdd = (type: "environmental" | "social" | "animal" | "health", category: "certifications" | "workerPolicies", name: string) => {
    if (!impactData) return;

    setImpactData(prevData => {
      if (!prevData) return null;
      const newData = { ...prevData };
      
      const currentList = (newData[type] as any)[category];
      const updatedList = [...currentList, { name }];
      
      (newData[type] as any)[category] = updatedList;

      return newData;
    });
  };

  const isSaveDisabled = () => {
    if (!selectedProductId || !impactData) {
      return true;
    }
    // Check if any of the dropdowns have a value selected
    return (
      impactData.environmental.certifications.length === 0 ||
      impactData.social.certifications.length === 0 ||
      impactData.social.workerPolicies.length === 0 ||
      impactData.animal.certifications.length === 0 ||
      impactData.health.certifications.length === 0
    );
  };

  const handleSave = () => {
  if (isSaveDisabled() || !impactData) {
    toast.error("Please fill all the required dropdowns.");
    return;
  }
  setProducts(prevProducts =>
    prevProducts.map(p =>
      p.id === selectedProductId ? { ...p, impact: impactData } : p
    )
  );
  toast.success(`${selectedProductId}  saved ✅`);

};

  const handleClear = () => {
    setSelectedProductId("");
    setImpactData(null);
  };

  const renderEnvironmentalAccordion = () => (
    <AccordionItem value="environmental" className="border-b-2 border-slate-200 last:border-b-0 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <AccordionTrigger className="text-lg font-semibold hover:no-underline px-6 py-4 bg-white hover:bg-zinc-50 transition-colors">
        Environmental Impact
      </AccordionTrigger>
      <AccordionContent className="p-6 bg-zinc-50 space-y-4">
        <div className="space-y-2">
          <h4 className="font-bold">Certifications</h4>
          <Select onValueChange={(value) => handleCertificationAdd("environmental", "certifications", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Certification" />
            </SelectTrigger>
            <SelectContent>
              {environmentalCertificationOptions.map(cert => (
                <SelectItem key={cert} value={cert}>{cert}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </AccordionContent>
    </AccordionItem>
  );

  const renderSocialAccordion = () => (
    <AccordionItem value="social" className="border-b-2 border-slate-200 last:border-b-0 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <AccordionTrigger className="text-lg font-semibold hover:no-underline px-6 py-4 bg-white hover:bg-zinc-50 transition-colors">
        Social Impact
      </AccordionTrigger>
      <AccordionContent className="p-6 bg-zinc-50 space-y-4">
        <div className="space-y-2">
          <h4 className="font-bold">Certifications</h4>
          <Select onValueChange={(value) => handleCertificationAdd("social", "certifications", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Certification" />
            </SelectTrigger>
            <SelectContent>
              {socialCertificationOptions.map(cert => (
                <SelectItem key={cert} value={cert}>{cert}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <h4 className="font-bold">Worker Policies</h4>
          <Select onValueChange={(value) => handleCertificationAdd("social", "workerPolicies", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Worker Policy" />
            </SelectTrigger>
            <SelectContent>
              {workerPoliciesOptions.map(policy => (
                <SelectItem key={policy} value={policy}>{policy}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </AccordionContent>
    </AccordionItem>
  );

  const renderAnimalAccordion = () => (
    <AccordionItem value="animal" className="border-b-2 border-slate-200 last:border-b-0 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <AccordionTrigger className="text-lg font-semibold hover:no-underline px-6 py-4 bg-white hover:bg-zinc-50 transition-colors">
        Animal Impact
      </AccordionTrigger>
      <AccordionContent className="p-6 bg-zinc-50 space-y-4">
        <div className="space-y-2">
          <h4 className="font-bold">Certifications</h4>
          <Select onValueChange={(value) => handleCertificationAdd("animal", "certifications", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Certification" />
            </SelectTrigger>
            <SelectContent>
              {animalCertificationOptions.map(cert => (
                <SelectItem key={cert} value={cert}>{cert}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </AccordionContent>
    </AccordionItem>
  );

  const renderHealthAccordion = () => (
    <AccordionItem value="health" className="border-b-2 border-slate-200 last:border-b-0 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <AccordionTrigger className="text-lg font-semibold hover:no-underline px-6 py-4 bg-white hover:bg-zinc-50 transition-colors">
        Health Impact
      </AccordionTrigger>
      <AccordionContent className="p-6 bg-zinc-50 space-y-4">
        <div className="space-y-2">
          <h4 className="font-bold">Certifications</h4>
          <Select onValueChange={(value) => handleCertificationAdd("health", "certifications", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Certification" />
            </SelectTrigger>
            <SelectContent>
              {healthCertificationOptions.map(cert => (
                <SelectItem key={cert} value={cert}>{cert}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </AccordionContent>
    </AccordionItem>
  );

  return (
    <div className="mx-auto w-full h-full p-3 bg-[whitesmoke]">
      <div className="flex items-center space-x-4 mb-8">
        <h1 className="text-3xl font-bold">
          Product Impact Data
        </h1>
      </div>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:space-x-4 space-y-4 sm:space-y-0">
        <div className="flex-1">
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Select Product
          </label>
          <Select onValueChange={handleProductSelect} value={selectedProductId}>
            <SelectTrigger className="w-full h-12 text-md">
              <SelectValue placeholder="Choose a product" />
            </SelectTrigger>
            <SelectContent>
              {products.map(product => (
                <SelectItem key={product.id} value={product.id}>
                  {product.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={handleSave}
            variant="default"
            className="bg-green-600 hover:bg-green-700 text-white shadow-md transition-transform transform hover:scale-105"
            disabled={isSaveDisabled()}
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
      {selectedProductId && impactData ? (
        <Accordion type="multiple" defaultValue={[]} className="w-full space-y-4">
          {renderEnvironmentalAccordion()}
          {renderSocialAccordion()}
          {renderAnimalAccordion()}
          {renderHealthAccordion()}
        </Accordion>
      ) : (
        <div className="p-10 text-center text-gray-500 italic bg-white rounded-lg shadow-inner border border-gray-200">
          <p className="text-lg">
            <span className="block mb-2 font-bold text-gray-700">Welcome!</span>
            Please select a product from the dropdown above to manage its impact data.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductImpact;