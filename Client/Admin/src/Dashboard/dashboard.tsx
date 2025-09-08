import { AppSidebar } from "@/components/app-sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { ArrowRight, Bell, Sun, UserRoundPlus } from "lucide-react";
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
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4  transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 ">
          <SidebarTrigger className="-ml-1" />
          <Dialog>
  <DialogTrigger>
  {/* Search Input */}
<Input
  type="text"
  placeholder="Type to search..."
  className="w-[300px]  px-4 py-2 text-base border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
/>

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
          <div className="flex items-center gap-2 ml-auto ">
            <div className="p-2 border rounded-md cursor-pointer hover:bg-accent">
              <Bell className="h-5 w-5" />
            </div>
            <div className="p-2 border rounded-md cursor-pointer hover:bg-accent">
              <Sun className="h-5 w-5" />
            </div>

            <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/leerob.png"
                  alt="@leerob"
                />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </div>
            <div 
  className="p-1.5 border flex items-center gap-1 rounded-md cursor-pointer hover:bg-accent"
>
  <UserRoundPlus className="h-5 w-5" />
  <span className="font-semibold">Invite</span>
</div>

          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 ">
        < Outlet />

   
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
