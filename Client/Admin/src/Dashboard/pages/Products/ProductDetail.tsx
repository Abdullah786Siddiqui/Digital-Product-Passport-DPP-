// src/components/DigitalProductPassport.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
// AspectRatio is a nice touch, but for a standalone image, a well-defined w/h and object-cover suffice. We'll keep it simple here.
// import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Leaf,
  Award,
  CheckCircle,
  Factory,
  Calendar,
  Globe,
  Cloud,
  Droplet,
  Power,
  WashingMachine,
  Thermometer,
  Snowflake,
  Eye,
  Type, // Using Type for general care instructions for better semantic fit
  type LucideIcon,
} from "lucide-react";
import CountUp from "react-countup";

/* ----------------- Types ----------------- */
interface CertificateProps {
  iconSrc: string; // Renamed 'icon' to 'iconSrc' for clarity
  name: string;
}

interface SustainabilityItemProps {
  icon: LucideIcon;
  description: string;
}

interface ImpactMetricProps {
  icon: LucideIcon;
  value: number;
  unit?: string;
  label: string;
}

interface CareInstructionProps {
  icon: LucideIcon;
  description: string;
}

/* ----------------- Section Header ----------------- */
const SectionHeader = ({ title, className = "" }: { title: string, className?: string }) => (
  <h2 className={`text-2xl font-bold mb-6 relative inline-block ${className}`}>
    {title}
    <span className="absolute -bottom-1 left-0 w-12 h-1 bg-teal-500 rounded-full"></span>
  </h2>
);

/* ----------------- Sustainability Badge ----------------- */
const SustainabilityItem: React.FC<SustainabilityItemProps> = ({
  icon: Icon,
  description,
}) => (
  <li className="flex flex-col items-center p-3 transform transition hover:scale-105"> {/* Changed to <li> for semantic list of features */}
    <div className="p-4 bg-gradient-to-br from-teal-500/10 to-emerald-500/20 border border-teal-400 rounded-full mb-3 shadow-sm">
      <Icon aria-hidden size={26} className="text-teal-600" />
    </div>
    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
      {description}
    </p>
  </li>
);

/* ----------------- Certificate Badge ----------------- */
const CertificateItem: React.FC<CertificateProps> = ({ iconSrc, name }) => (
  <li className="relative group flex flex-col items-center w-24 text-center"> {/* Changed to <li> for semantic list of certificates */}
    <div className="p-4 border border-teal-400 rounded-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-md transition duration-300 group-hover:scale-110 group-hover:border-teal-600">
      <img
        src={iconSrc}
        alt={`${name} logo`} // Improved alt text
        className="w-8 h-8 object-contain"
        loading="lazy"
      />
    </div>
    <span className="mt-2 text-xs font-medium text-gray-600 dark:text-gray-300 opacity-80 group-hover:opacity-100 transition">
      {name}
    </span>
  </li>
);

/* ----------------- Impact Metric ----------------- */
const ImpactMetric: React.FC<ImpactMetricProps> = ({
  icon: Icon,
  value,
  unit,
  label,
}) => (
  <div className="rounded-xl p-5 flex items-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-lg hover:shadow-xl transition"> {/* Enhanced shadow for metric */}
    <div className="p-3 rounded-full bg-teal-500/10 mr-4 flex-shrink-0"> {/* Added flex-shrink-0 */}
      <Icon aria-hidden size={28} className="text-teal-600" />
    </div>
    <div>
      <p className="text-xl font-extrabold text-gray-900 dark:text-gray-100"> {/* Increased text size for impact number */}
        <CountUp end={value} duration={2} separator="," decimals={unit === 'kg CO2' || unit === 'L' ? 1 : 0} />{" "} {/* Added decimal support for float values like 2.1 */}
        {unit && (
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {unit}
          </span>
        )}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
    </div>
  </div>
);

/* ----------------- Care Instruction ----------------- */
const CareInstruction: React.FC<CareInstructionProps> = ({
  icon: Icon,
  description,
}) => (
  <li className="flex flex-col items-center transform transition hover:scale-105 p-2"> {/* Changed to <li>, slightly reduced scale, added padding */}
    <div className="p-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full shadow-inner mb-2">
      <Icon
        aria-hidden
        size={24}
        className="text-teal-600 dark:text-teal-400"
      />
    </div>
    <p className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 text-center"> {/* Adjusted font size for better fit on small screens */}
      {description}
    </p>
  </li>
);

/* ----------------- Main Component ----------------- */
const DigitalProductPassport: React.FC = () => {
  // Use a sensible default alt text for the main image
  const productName = "Dual Tone Cotton Jeans";
  const productImageSrc = "https://binshafiq.pk/cdn/shop/files/Untitled-4-Photoroom_14_394x.jpg?v=1721394869";

  return (
    // Removed the extra commented-out </div> and fixed the surrounding Card structure
    <Card className="overflow-hidden max-w-6xl mx-auto my-8">
      <CardContent className="flex flex-col lg:flex-row gap-8 p-6 md:p-10">
        {/* Product Image */}
        <div className="flex-1 flex justify-center lg:justify-start items-start pt-6 lg:pt-0"> {/* Adjusted alignment for better top-of-page feel */}
          <div className="w-full max-w-sm aspect-[4/5] overflow-hidden rounded-xl shadow-2xl border-4 border-white dark:border-gray-800"> {/* Enhanced shadow and added border for emphasis */}
            <img
              src={productImageSrc}
              alt={`${productName} - Product Image`} // Use product name in alt text
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col justify-start space-y-8 text-gray-800 dark:text-gray-200"> {/* Reduced overall spacing slightly */}
          <header className="space-y-3"> {/* Use <header> for product intro */}
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
              {productName}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed italic"> {/* Enhanced description style */}
              A stylish two-tone hoodie made from soft, breathable fabric for all-day comfort.
            </p>
          </header>

          {/* PEF/French Score - Use a proper grid structure */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {[{ label: "PEF Score", value: 1998, unit: "ppts" }, { label: "French Score", value: 100, unit: "ppts" }].map(({ label, value, unit }) => (
              <div
                key={label}
                className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl p-4 md:p-6 text-center shadow-md hover:shadow-lg transition flex flex-col justify-center items-center" // Added flex for centering
              >
                <p className="text-sm font-light uppercase opacity-90">{label}</p>
                <p className="text-3xl md:text-4xl font-extrabold mt-1">
                  <CountUp end={value} duration={2} separator="," />{" "}
                  <span className="text-lg font-light">{unit}</span>
                </p>
              </div>
            ))}
          </div>

          <Separator className="bg-gray-200 dark:bg-gray-700" />

          {/* Sustainability */}
          <section>
            <SectionHeader title="Sustainability" />
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-6"> {/* Changed to <ul> for semantic list */}
              <SustainabilityItem icon={Leaf} description="100% Organic Cotton" />
              <SustainabilityItem icon={CheckCircle} description="Certified GOTS" />
              <SustainabilityItem icon={Award} description="100% Original Material" />
            </ul>
          </section>
        </div>
      </CardContent>

      {/* Certificates */}
      <section className="px-6 md:px-10 py-6 border-t dark:border-gray-800"> {/* Added top border for separation */}
        <div className="flex justify-between items-center mb-6">
          <SectionHeader title="Certificates" className="mb-0" /> {/* Removed mb-6 from header */}
          <a href="#" className="text-sm text-teal-600 hover:underline flex items-center dark:text-teal-400">
            View All <Eye size={16} className="ml-1" />
          </a>
        </div>
        <ul className="flex flex-wrap justify-start gap-6 list-none p-0"> {/* Changed to <ul> and added list-none/p-0 */}
          <CertificateItem iconSrc="https://cdn.shopify.com/s/files/1/0497/1809/files/gotslogo_large.gif?17985187548554224389" name="GOTS" />
          <CertificateItem iconSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFXImO_vfxG_DN6VSHjVVN-aScLel_uySLJw&s" name="OEKO-TEX" />
          <CertificateItem iconSrc="https://upload.wikimedia.org/wikipedia/commons/4/41/Certified_B_Corporation_B_Corp_Logo_2022_Black_RGB.svg" name="B-CORP" />
        </ul>
      </section>

      {/* Manufacturing + Impact Section */}
      <div className="p-6 md:p-10 space-y-10 border-t dark:border-gray-800"> {/* Added top border */}
        {/* Manufacturing */}
        <section>
          <SectionHeader title="Manufacturing" />
          <dl className="space-y-3 text-gray-700 dark:text-gray-300">
            {[
              { icon: Globe, label: "Origin", value: "Pakistan" },
              { icon: Factory, label: "Factory", value: "Eco Trace" },
              { icon: Calendar, label: "Productive Date", value: "March 2025" },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-3 rounded-lg shadow-sm"
              >
                <dt className="flex items-center font-semibold"> {/* Made label text slightly bolder */}
                  <Icon size={18} className="text-teal-600 dark:text-teal-400 mr-3" /> {/* Increased icon size and changed color */}
                  {label}
                </dt>
                <dd>
                  <Badge
                    variant="outline"
                    className="px-4 py-1.5 text-teal-700 dark:text-teal-300 border-teal-600 dark:border-teal-400 rounded-full bg-teal-50/50 dark:bg-teal-900/30 font-semibold" // More prominent badge style
                  >
                    {value}
                  </Badge>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <Separator className="bg-gray-200 dark:bg-gray-700" />

        {/* Sustainability Impact */}
        <section>
          <SectionHeader title="Sustainability Impact" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> {/* Ensured 3 columns on medium screens and up */}
            <ImpactMetric
              icon={Cloud}
              value={2.1}
              unit="kg CO2"
              label="Carbon Footprint"
            />
            <ImpactMetric
              icon={Droplet}
              value={850}
              unit="L"
              label="Water Usage"
            />
            <ImpactMetric
              icon={Power}
              value={1150}
              unit="kWh"
              label="Energy Usage"
            />
          </div>
        </section>

        <Separator className="bg-gray-200 dark:bg-gray-700" />

        {/* Care Instructions */}
        <section>
          <SectionHeader title="Care Instructions" />
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8 list-none p-0"> {/* Changed to <ul>, adjusted gap, and ensured 4 cols on small screens and up */}
            <CareInstruction icon={Snowflake} description="Do Not Bleach" />
            <CareInstruction
              icon={WashingMachine}
              description="Machine Wash Cold" // Changed Tumble Dry to Machine Wash for variety
            />
            <CareInstruction
              icon={Type} // Used 'Type' (text/symbol) for ironing to differentiate from washing machine icon
              description="Iron on Low Heat"
            />
            <CareInstruction icon={Thermometer} description="30°C max" />
          </ul>
        </section>
      </div>
    </Card>
  );
};

export default DigitalProductPassport;