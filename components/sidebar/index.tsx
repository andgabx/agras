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
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function SidebarDemo() {
  const links = [
    {
      label: "Dashboard",
      href: "/",
      icon: <IconDashboard className="text-white h-8 w-8 flex-shrink-0" />,
    },
    {
      label: "Areas de Plantio",
      href: "#",
      icon: <IconUserBolt className="text-white h-8 w-8 flex-shrink-0" />,
    },

    {
      label: "Tarefas",
      href: "/tarefas",
      icon: <IconSettings className="text-white h-8 w-8 flex-shrink-0" />,
    },
    {
      label: "Participantes",
      href: "#",
      icon: <IconArrowLeft className="text-white h-8 w-8 flex-shrink-0" />,
    },
    {
      label: "Minha Conta",
      href: "#",
      icon: <IconArrowLeft className="text-white h-8 w-8 flex-shrink-0" />,
    },
    {
      label: "Configuraçoes",
      href: "#",
      icon: <IconArrowLeft className="text-white h-8 w-8 flex-shrink-0" />,
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn("flex flex-col md:flex-row bg-gray-100", "min-h-screen")}
    >
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <>
              <Logo />
            </>
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Comunidades",
                href: "#",
                icon: (
                  <IconSettings className="text-white h-8 w-8 flex-shrink-0" />
                ),
              }}
            />
            <SidebarLink
              link={{
                label: "Sair",
                href: "#",
                icon: (
                  <IconSettings className="text-white h-8 w-8 flex-shrink-0" />
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
      className="font-normal mx-auto flex space-x-2 items-center text-sm text-white py-4 relative z-20"
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
