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
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { signOutAction } from "@/app/actions";
import { usePathname } from "next/navigation";

export default function SidebarDemo() {
  const pathname = usePathname();

  const links = [
    {
      label: "Comunidades",
      href: "/communities",
      icon: (
        <Users className="h-[27px] w-[27px] flex-shrink-0 transition-colors group-hover:text-[#8ABF17]" />
      ),
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <LayoutDashboard className="h-[27px] w-[27px] flex-shrink-0 transition-colors group-hover:text-[#8ABF17]" />
      ),
    },
    {
      label: "Areas de Plantio",
      href: "#",
      icon: (
        <Trees className="h-[27px] w-[27px] flex-shrink-0 transition-colors group-hover:text-[#8ABF17]" />
      ),
    },
    {
      label: "Tarefas",
      href: "/tarefas",
      icon: (
        <CalendarCheck className="h-[27px] w-[27px] flex-shrink-0 transition-colors group-hover:text-[#8ABF17]" />
      ),
    },
    {
      label: "Meu Perfil",
      href: "/account",
      icon: (
        <UserRoundPen className="h-[27px] w-[27px] flex-shrink-0 transition-colors group-hover:text-[#8ABF17]" />
      ),
    },
    {
      label: "Configuraçoes",
      href: "/configuracoes",
      icon: (
        <Settings className="h-[27px] w-[27px] flex-shrink-0 transition-colors group-hover:text-[#8ABF17]" />
      ),
    },
    {
      label: "Sair",
      href: "#",
      onClick: signOutAction,
      icon: (
        <LogOut className="h-[27px] w-[27px] flex-shrink-0 transition-colors group-hover:text-[#8ABF17]" />
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

              {pathname !== "/communities" &&
                links
                  .slice(1, 6)
                  .map((link, idx) => (
                    <SidebarLink key={idx + 1} link={link} />
                  ))}
            </div>
          </div>
          <div className="py-4">
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
      href="#"
      className="font-normal mx-auto flex space-x-2 items-center bg-[#8ABF17] text-sm text-white py-4 relative z-20"
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
