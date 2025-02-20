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
import { useParams, usePathname } from "next/navigation";
import { ThemeSwitcher } from "../theme-switcher";
import { SidebarTrigger } from "../ui/sidebar";
export function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [communityName, setCommunityName] = useState("");
  const pathName = usePathname();
  const params = useParams();
  const communityId = params?.communityId as string;

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
    <div >

      <div className="flex h-20 justify-between items-center px-4">
        <div className="flex items-center space-x-4">
          <SidebarTrigger className="md:hidden items-center" />

          <span className="text-sm text-black font-medium">
            {pathName === "/account" ? (
              <span className="font-medium">MEU PERFIL</span>
            ) : (
              <span className="font-medium">
                {pathName === "/communities" ? (
                  <p className="font-normal text-[18px] uppercase">
                    Comunidades
                  </p>
                ) : params.communityId ? (
                  <div className="flex flex-col space-y-1">
                    <p className="font-normal text-[18px] uppercase">
                      Comunidade
                    </p>
                    <p className="font-bold text-[20px] uppercase">
                      {communityName}
                    </p>
                  </div>
                ) : pathName === "/dashboard" ? (
                  "Dashboard"
                ) : (
                  "Carregando..."
                )}
              </span>
            )}
          </span>
        </div>

        <div className="ml-auto flex items-center space-x-2 sm:space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Bell className="h-5 w-5 text-muted-foreground dark:bg-black hover:text-foreground cursor-pointer" />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <ThemeSwitcher />
          <Link href={communityId ? `#` : "/account"}>
            <div className="flex items-center space-x-2 cursor-pointer p-1 rounded-lg hover:bg-[#c0c0c046]">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.user_metadata.avatar_url} />
                <AvatarFallback className="bg-[#8ABF17] text-white font-semibold">
                  {user?.user_metadata.full_name?.charAt(0)}
                </AvatarFallback>
              </Avatar>

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
                        if (index === 0) return curr;
                        if (index === arr.length - 1) return acc + " " + curr;
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
          </Link>
        </div>
      </div>
    </div>
  );
}
