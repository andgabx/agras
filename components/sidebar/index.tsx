"use client";
import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { LogOut, LayoutDashboard, CalendarCheck, Users, Settings, Trees} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SidebarDemo() {
  const links = [
    {
      label: "Dashboard",
      href: "/",
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
      label: "Participantes",
      href: "#",
      icon: (
        <Users className="h-[27px] w-[27px] flex-shrink-0 transition-colors group-hover:text-[#8ABF17]" />
      ),
    },
    {
      label: "Configuraçoes",
      href: "#",
      icon: (
        <Settings className="h-[27px] w-[27px] flex-shrink-0 transition-colors group-hover:text-[#8ABF17]" />
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
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div className="py-4">
            <SidebarLink
              link={{
                label: "Sair",
                href: "#",
                icon: (
                  <LogOut className="h-[27px] w-[27px] flex-shrink-0 transition-colors group-hover:text-[#8ABF17]" />
                ),
              }}
            />
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
        <Image src="/logo.png" alt="logo" width={150} height={150} className="" />
        <div className="border-b-[1px] border-[#CECECE] fixed w-[767px] lg:w-[303px] h-[63px]"></div>
        </div>

      </motion.span>
    </Link>
  );
};
