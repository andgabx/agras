"use client";

import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ThemeSwitcher } from "../theme-switcher";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();
  }, []);

  return (
    <div className="border-b">
      <div className="flex h-20 items-center px-4">
        <div className="flex flex-col ml-2 items-start">
          <span className="text-sm text-muted-foreground font-medium">
            COMUNIDADE
          </span>
          <h2 className="text-lg font-bold sm:text-xl">Coletivo Raio de Sol</h2>
          <ThemeSwitcher />
        </div>

        <div className="ml-auto flex items-center space-x-2 sm:space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Bell className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer" />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center space-x-2 cursor-pointer p-1 rounded-lg hover:bg-[#c0c0c046]">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" />
              {/* Fiz aqui embaixo um fallback pegando a primeira letra do nome do usuario que ele colocou no supabase, caso nao tenha como botar foto futuramente */}
              <AvatarFallback className="bg-[#8ABF17] text-white font-semibold">
                {user?.user_metadata.full_name?.charAt(0)}
              </AvatarFallback>
            </Avatar>

            {/* Informações do usuário - Oculto em mobile */}
            <div className="hidden sm:flex sm:flex-col">
              <span className="text-sm font-medium truncate max-w-[120px]">
                {user?.user_metadata.full_name}
              </span>
              <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                {user?.email}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
