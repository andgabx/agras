"use client";
import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconDashboard,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SidebarDemo() {
  const links = [
    {
      label: "Dashboard",
      href: "/",
      icon: (
        <IconDashboard className="h-8 w-8 flex-shrink-0 transition-colors group-hover:text-[#8ABF17]" />
      ),
    },
    {
      label: "Areas de Plantio",
      href: "#",
      icon: (
        <IconUserBolt className="h-8 w-8 flex-shrink-0 transition-colors group-hover:text-[#8ABF17]" />
      ),
    },
    {
      label: "Tarefas",
      href: "/tarefas",
      icon: (
        <IconSettings className="h-8 w-8 flex-shrink-0 transition-colors group-hover:text-[#8ABF17]" />
      ),
    },
    {
      label: "Participantes",
      href: "#",
      icon: (
        <IconArrowLeft className="h-8 w-8 flex-shrink-0 transition-colors group-hover:text-[#8ABF17]" />
      ),
    },
    {
      label: "Minha Conta",
      href: "#",
      icon: (
        <IconArrowLeft className="h-8 w-8 flex-shrink-0 transition-colors group-hover:text-[#8ABF17]" />
      ),
    },
    {
      label: "Configuraçoes",
      href: "#",
      icon: (
        <IconArrowLeft className="h-8 w-8 flex-shrink-0 transition-colors group-hover:text-[#8ABF17]" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div className="">
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
                label: "Comunidades",
                href: "#",
                icon: (
                  <IconSettings className="h-8 w-8 flex-shrink-0 transition-colors group-hover:text-[#8ABF17]" />
                ),
              }}
            />
            <SidebarLink
              link={{
                label: "Sair",
                href: "#",
                icon: (
                  <IconSettings className="h-8 w-8 flex-shrink-0 transition-colors group-hover:text-[#8ABF17]" />
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
        <Image src="/logo.png" alt="logo" width={150} height={150} />
      </motion.span>
    </Link>
  );
};
