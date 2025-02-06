"use client";

import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export function Navbar() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold">Coletivo Raio de Sol</h2>
          <span className="text-sm text-muted-foreground">COMUNIDADE</span>
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Bell className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer" />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" />
              <AvatarFallback>MJ</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Maria José</span>
              <span className="text-xs text-muted-foreground">
                mariajose@gmail.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
