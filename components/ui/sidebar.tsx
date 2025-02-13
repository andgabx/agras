"use client";
import { cn } from "@/lib/utils";
import Link, { type LinkProps } from "next/link";
import type React from "react";
import { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.div
        className={cn(
          "md:h-screen hidden md:flex md:flex-col bg-[#8ABF17] w-[265px] flex-shrink-0",
          className
        )}
        animate={{
          width: animate ? (open ? "265px" : "60px") : "265px",
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <div
        className={cn(
          "h-20 px-4 py-4 flex flex-row md:hidden items-center justify-between w-full"
        )}
        {...props}
      >
        <div className="flex justify-end z-20 w-full">
          <IconMenu2
            className="text-neutral-800 dark:text-white"
            onClick={() => setOpen(!open)}
          />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-screen w-full inset-0 bg-[#8ABF17] dark:bg-neutral-900 z-[100] flex flex-col justify-between",
                className
              )}
            >
              <div
                className="absolute right-10 top-4 z-50 text-white dark:text-white"
                onClick={() => setOpen(!open)}
              >
                <IconX />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
  props?: LinkProps;
}) => {
  const { open, animate } = useSidebar();
  const pathname = usePathname();

  const isActive = pathname === link.href;

  return (
    <div className="relative">
      <Link
        href={link.href}
        className={cn(
          "px-8 hover:bg-white flex items-center justify-start gap-2 w-full text-white group/sidebar py-2",
          isActive && "bg-white",
          className
        )}
        {...props}
      >
        <span
          className={cn(
            "group-hover/sidebar:text-[#8ABF17]",
            isActive && "text-[#8ABF17]"
          )}
        >
          {link.icon}
        </span>

        <motion.span
          animate={{
            display: animate
              ? open
                ? "inline-block"
                : "none"
              : "inline-block",
            opacity: animate ? (open ? 1 : 0) : 1,
          }}
          className={cn(
            "text-white group-hover/sidebar:translate-x-1 group-hover/sidebar:text-[#8ABF17] transition duration-150 whitespace-pre inline-block !p-0 !m-0",
            isActive && "text-[#8ABF17] translate-x-1"
          )}
        >
          {link.label}
        </motion.span>
      </Link>
      <div
        className={cn(
          "w-[5px] bg-[#5F8C1B] absolute left-0 top-0 bottom-0 transition-all duration-300 transform origin-left",
          isActive
            ? "opacity-100 scale-y-100"
            : "opacity-0 scale-y-50 group-hover/sidebar:opacity-100 group-hover/sidebar:scale-y-100"
        )}
      />
    </div>
  );
};