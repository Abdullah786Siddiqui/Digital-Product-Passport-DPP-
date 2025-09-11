import { AppSidebar } from "@/components/app-sidebar";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ArrowRight, Bell, Sun } from "lucide-react";
import { Outlet } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
 

const sidebarItems = [
  { name: "Docs", active: true },
  { name: "Components" },
  { name: "Blocks" },
  { name: "Charts" },
  { name: "Themes" },
  { name: "Colors" },
]

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar  />
      <SidebarInset >
        <header className="flex h-16 shrink-0 items-center gap-2 px-4 bg-[whitesmoke]  transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12    ">
          <SidebarTrigger className="-ml-1" />
          <Dialog>
  <DialogTrigger>
  {/* Search Input */}


  </DialogTrigger>
 <DialogContent showCloseButton={false} className="sm:max-w-lg w-full p-4">
      {/* Search Input */}
      <Input
        type="text"
        placeholder="Type to search..."
        className="w-full "
      />

      {/* Sidebar-like Navigation */}
    <div className="w-full p-4 bg-white border rounded-md">
  <p className="text-sm text-muted-foreground mb-4">Pages</p>
  <NavigationMenu orientation="vertical">
    <NavigationMenuList className="flex flex-col space-y-1">
      {sidebarItems.map((item) => (
        <NavigationMenuItem
          key={item.name}
          className="w-full md:w-[430px]" 
        >
          <NavigationMenuLink
            className={cn(
              "flex items-center flex-row justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors",
              item.active
                ? "bg-muted text-foreground"
                : "hover:bg-muted text-muted-foreground"
            )}
          >
            <div className="flex gap-3">
              <ArrowRight className="w-4 h-4" />
              {item.name}
            </div>
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
</div>

    </DialogContent>
</Dialog>

          {/* Right side icons */}
          <div className="flex items-center gap-2 ml-auto bg-[whitesmoke]  ">
            <div className="p-2 border rounded-md cursor-pointer hover:bg-accent">
              <Bell className="h-5 w-5" />
            </div>
            <div className="p-2 border rounded-md cursor-pointer hover:bg-accent">
              <Sun className="h-5 w-5" />
            </div>

          
      

          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4  pt-0 ">
        < Outlet />

   
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
