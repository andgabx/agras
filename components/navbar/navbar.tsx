"use client";

import { Bell } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { usePathname, useParams } from "next/navigation";
import { set } from "zod";
import { ThemeSwitcher } from "../theme-switcher";

export function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [communityName, setCommunityName] = useState("");
  const pathName = usePathname();
  const params = useParams();

  useEffect(() => {
    const supabase = createClient();
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    async function getCommunityName() {
      if (params.communityId) {
        const { data } = await supabase
          .from("communities")
          .select("name")
          .eq("id", params.communityId)
          .single();

        if (data) {
          setCommunityName(data.name);
        }
      }
    }

    getCommunityName();
    getUser();
  }, [params.communityId]);

  return (
    <div className="border-b">
      <div className="flex h-20 items-center px-4">
        <div className="flex flex-col ml-2 items-start">
          <span className="text-sm text-black font-medium">
            {pathName === "/account" ? (
              <span className="font-medium">MEU PERFIL</span>
            ) : (
              <span className="font-medium">
                {pathName === "/communities"
                  ? "Comunidades"
                  : params.communityId
                    ? `Comunidade ${communityName}`
                    : pathName === "/dashboard"
                      ? "Dashboard"
                      : "Carregando..."}
              </span>
            )}
          </span>
          {/* <ThemeSwitcher />  */}
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
            <Link href="/account">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                {/* Fiz aqui embaixo um fallback pegando a primeira letra do nome do usuario que ele colocou no supabase, caso nao tenha como botar foto futuramente */}
                <AvatarFallback className="bg-[#8ABF17] text-white font-semibold">
                  {user?.user_metadata.full_name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </Link>

            {/* Informações do usuário - Oculto em mobile */}
            <div className="hidden sm:flex sm:flex-col">
              <span className="text-sm font-medium truncate max-w-[120px]">
                {user?.user_metadata.full_name
                  .split(" ")
                  .filter((name: string) => name.trim().length > 0)
                  .reduce(
                    (
                      acc: string,
                      curr: string,
                      index: number,
                      arr: Array<number>
                    ) => {
                      if (index === 0) return curr; // Primeiro nome
                      if (index === arr.length - 1) return acc + " " + curr; // Último nome
                      return acc;
                    },
                    ""
                  )}
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
