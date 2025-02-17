"use client";

import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  LogOut,
  LayoutDashboard,
  CalendarCheck,
  Users,
  Settings,
  Trees,
  UserRoundPen,
  Undo2,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { signOutAction } from "@/app/actions";
import { usePathname, useParams } from "next/navigation";

export default function SidebarDemo() {
  const pathname = usePathname();
  const params = useParams();
  const communityId = params?.communityId as string;

  const links = [
    {
      label: "Comunidades",
      href: "/communities",
      icon: (
        <Users className="h-[27px] w-[27px] flex-shrink-0 transition-colors group-hover:text-primary" />
      ),
    },
    {
      label: "Dashboard",
      href: communityId ? `/community/${communityId}/dashboard` : "#",
      icon: (
        <LayoutDashboard className="h-[27px] w-[27px] flex-shrink-0 transition-colors group-hover:text-primary" />
      ),
    },
    {
      label: "Áreas de Plantio",
      href: communityId ? `/community/${communityId}/areas` : "#",
      icon: (
        <Trees className="h-[27px] w-[27px] flex-shrink-0 transition-colors group-hover:text-primary" />
      ),
    },
    {
      label: "Tarefas",
      href: "/tarefas",
      icon: (
        <CalendarCheck className="h-[27px] w-[27px] flex-shrink-0 transition-colors group-hover:text-primary" />
      ),
    },
    {
      label: "Participantes",
      href: communityId ? `/community/${communityId}/participantes` : "#",
      icon: (
        <Users className="h-[27px] w-[27px] flex-shrink-0 transition-colors group-hover:text-primary" />
      ),
    },
    {
      label: "Meu Perfil",
      href: communityId ? `/community/${communityId}/account` : "/account",
      icon: (
        <UserRoundPen className="h-[27px] w-[27px] flex-shrink-0 transition-colors group-hover:text-primary" />
      ),
    },
    {
      label: "Configurações",
      href: communityId ? `/community/${communityId}/settings` : "#",
      icon: (
        <Settings className="h-[27px] w-[27px] flex-shrink-0 transition-colors group-hover:text-primary" />
      ),
    },
    {
      label: "Sair",
      href: "#",
      onClick: signOutAction,
      icon: (
        <LogOut className="h-[27px] w-[27px] flex-shrink-0 transition-colors group-hover:text-primary" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b md:border-r-[1px] sm:border-[#CECECE]">
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <>
              <Logo />
            </>
            <div className="mt-8 flex flex-col gap-2 ">
              {pathname === "/communities" && (
                <SidebarLink key={0} link={links[0]} />
              )}

              {pathname === "/account" && (
                <SidebarLink key={0} link={links[4]} />
              )}

              {pathname !== "/communities" &&
                pathname !== "/account" &&
                links
                  .slice(1, 7)
                  .map((link, idx) => (
                    <SidebarLink key={idx + 1} link={link} />
                  ))}
            </div>
          </div>
          <div className="py-4">
            {pathname.startsWith(`/community/${communityId}`) && (
              <SidebarLink
                link={{
                  label: "Comunidades",
                  href: "/communities",
                  icon: (
                    <Undo2 className="h-[27px] w-[27px] flex-shrink-0 transition-colors group-hover:text-primary" />
                  ),
                }}
              />
            )}
            <SidebarLink link={links[links.length - 1]} />
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="/communities"
      className="font-normal mx-auto flex space-x-2 items-center bg-primary text-sm text-white py-4 relative z-20"
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-xl text-white dark:text-white whitespace-pre"
      >
        <div className="flex items-center justify-center flex-col">
          <Image
            src="/logo.png"
            alt="logo"
            width={150}
            height={150}
            className="transform translate-y-2 -translate-x-1"
          />
          <div className="border-b-[1px] border-[#CECECE] fixed w-[767px] lg:w-[265px] h-[95px]"></div>
        </div>
      </motion.span>
    </Link>
  );
};
