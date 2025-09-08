"use client";

import * as React from "react";
import {
  AudioWaveform,
  Command,
  Zap,
  LayoutDashboard,
  Package,
  Truck,
  Layers,
  BarChart2,
  PlusSquare,
  List,
  Info,
  Workflow,
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Rapid Rescue",
      logo: Zap,
      plan: "Driver Panel",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],

  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
    title: "Products",
    url: "#",
    icon: Package,
    items: [
      {
    title: "Product List",
    url: "ProductsList",
    icon: List,
  },
  {
    title: "Product Detail",
    url: "ProductDetail",
    icon: Info,
  },
  {
    title: "Add Product",
    url: "AddProduct",
    icon: PlusSquare,
  },
  {
    title: "Journey",
    url: "JourneyTimeline", 
    icon: Workflow,
  },
    ],
  },
    {
      title: "Suppliers",
      url: "/",
      icon: Truck,
      isActive: true,
    },
    {
      title: "Materials",
      url: "/",
      icon: Layers,
      isActive: true,
    },
    {
      title: "Analytics",
      url: "/",
      icon: BarChart2,
      isActive: true,
    },
  ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
