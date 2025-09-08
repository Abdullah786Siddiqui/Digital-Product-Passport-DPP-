import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronDown, MapPin, Calendar, Plus, Upload } from "lucide-react";

// Mock component for Shadcn UI components that don't exist in the base library but are used in the design
const Icon = ({ name, className }: { name: string, className?: string }) => {
  switch (name) {
    case 'MapPin':
      return <MapPin className={className} />;
    case 'Calendar':
      return <Calendar className={className} />;
    case 'Plus':
      return <Plus className={className} />;
    case 'Upload':
      return <Upload className={className} />;
    default:
      return null;
  }
};

const TimelineItem = ({ title, description, children }: { title: string, description?: string, children: React.ReactNode }) => (
  <AccordionItem value={title} className="border-b px-6 py-4">
    <AccordionTrigger className="text-lg font-medium hover:no-underline">
      {title}
    </AccordionTrigger>
    <AccordionContent className="p-4 bg-slate-50 rounded-lg mt-4">
      {children}
    </AccordionContent>
  </AccordionItem>
);

const JourneyTimeline = () => {
  return (
    <div className="min-h-screen font-sans">
      <div className="w-full mx-auto bg-white p-4 ">
        <h1 className="text-3xl font-bold mb-6">Product Journey Timeline</h1>
        <Accordion type="multiple" defaultValue={["item-3"]} className="w-full">
          <TimelineItem title="Concept Ideation">
            <div className="space-y-4">
              <label className="text-sm font-medium">Stage Name</label>
              <Input placeholder="Concept Ideation" />
              <label className="text-sm font-medium">Description</label>
              <Textarea placeholder="Describe the concept ideation process." />
              <label className="text-sm font-medium">Location</label>
              <Input placeholder="e.g., San Francisco, CA" />
              <label className="text-sm font-medium">Date</label>
              <Input placeholder="e.g., 2024-08-16" />
              <label className="text-sm font-medium">Supplier</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a supplier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="supplier1">Supplier 1</SelectItem>
                  <SelectItem value="supplier2">Supplier 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TimelineItem>

          <TimelineItem title="Market Research">
            <div className="space-y-4">
              <label className="text-sm font-medium">Stage Name</label>
              <Input placeholder="Market Research" />
              <label className="text-sm font-medium">Description</label>
              <Textarea placeholder="Describe the market research process." />
            </div>
          </TimelineItem>

          <AccordionItem value="item-3" className="border-b px-6 py-4">
            <AccordionTrigger className="text-lg font-medium hover:no-underline">
              Sourcing
            </AccordionTrigger>
            <AccordionContent className="p-4 bg-slate-50 rounded-lg mt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Stage Name</label>
                  <Input defaultValue="Sourcing" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea defaultValue="Detailing the acquisition of raw materials and components for product development. This includes identifying suppliers, negotiating terms, and ensuring quality and ethical standards are met." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <div className="relative">
                    <Input placeholder="e.g., Shenzhen, CN" className="pr-10" />
                    <Icon name="MapPin" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <div className="relative">
                    <Input placeholder="e.g., 2024-08-16" className="pr-10" />
                    <Icon name="Calendar" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Supplier</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="supplier1">Supplier 1</SelectItem>
                      <SelectItem value="supplier2">Supplier 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="ghost" className="w-full justify-center space-x-2">
                  <Icon name="Upload" className="h-4 w-4" />
                  <span>Upload Image</span>
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <TimelineItem title="Prototyping">
            <div className="space-y-4">
              <label className="text-sm font-medium">Stage Name</label>
              <Input placeholder="Prototyping" />
              <label className="text-sm font-medium">Description</label>
              <Textarea placeholder="Describe the prototyping process." />
            </div>
          </TimelineItem>

          <TimelineItem title="Manufacturing">
            <div className="space-y-4">
              <label className="text-sm font-medium">Stage Name</label>
              <Input placeholder="Manufacturing" />
              <label className="text-sm font-medium">Description</label>
              <Textarea placeholder="Describe the manufacturing process." />
            </div>
          </TimelineItem>
          
          <TimelineItem title="Quality Assurance">
            <div className="space-y-4">
              <label className="text-sm font-medium">Stage Name</label>
              <Input placeholder="Quality Assurance" />
              <label className="text-sm font-medium">Description</label>
              <Textarea placeholder="Describe the quality assurance process." />
            </div>
          </TimelineItem>
          
          <TimelineItem title="Launch Preparation">
            <div className="space-y-4">
              <label className="text-sm font-medium">Stage Name</label>
              <Input placeholder="Launch Preparation" />
              <label className="text-sm font-medium">Description</label>
              <Textarea placeholder="Describe the launch preparation process." />
            </div>
          </TimelineItem>

        </Accordion>
        <div className="mt-8 flex justify-center">
          <Button variant="outline" className="text-gray-500 hover:text-gray-700">
            <Icon name="Plus" className="mr-2 h-4 w-4" />
            Add Stage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JourneyTimeline;
