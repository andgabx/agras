"use client";

import type * as React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarFooter,
} from "@/components/ui/sidebar";
import {
    UserRoundPen,
    LogOut,
    Settings,
    Users,
    CalendarCheck,
    Trees,
    LayoutDashboard,
    Undo2,
    Undo,
} from "lucide-react";
import { signOutAction } from "@/app/actions";
import { usePathname, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();
    const params = useParams();
    const communityId = params?.communityId as string;

    // Função auxiliar para verificar se o link está ativo
    const isLinkActive = (href: string) => {
        if (href === "#") return false;

        // Para a rota de comunidades, verifica se está na raiz
        if (href === "/communities") {
            return pathname === "/communities";
        }

        // Para outras rotas, verifica se o pathname começa com o href
        return pathname.startsWith(href);
    };

    const links = [
        {
            label: "Comunidades",
            href: "/communities",
            icon: <Users className="flex-shrink-0 transition-colors" />,
        },
        {
            label: "Dashboard",
            href: communityId ? `/community/${communityId}/dashboard` : "#",
            icon: (
                <LayoutDashboard className="flex-shrink-0 transition-colors" />
            ),
        },
        {
            label: "Áreas de Plantio",
            href: communityId ? `/community/${communityId}/areas` : "#",
            icon: <Trees className="flex-shrink-0 transition-colors" />,
        },
        {
            label: "Tarefas",
            href: communityId ? `/community/${communityId}/tarefas` : "#",
            icon: <CalendarCheck className="flex-shrink-0 transition-colors" />,
        },
        {
            label: "Participantes",
            href: communityId ? `/community/${communityId}/participantes` : "#",
            icon: <Users className="flex-shrink-0 transition-colors" />,
        },
        {
            label: "Meu Perfil",
            href: communityId
                ? `/community/${communityId}/account`
                : "/account",
            icon: <UserRoundPen className="flex-shrink-0 transition-colors" />,
        },
        {
            label: "Configurações",
            href: communityId ? `/community/${communityId}/settings` : "#",
            icon: <Settings className="flex-shrink-0 transition-colors" />,
        },
        {
            label: "Sair",
            href: "#",
            onClick: signOutAction,
            icon: <LogOut className="flex-shrink-0 transition-colors" />,
        },
    ];

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem className="text-white p-4 mx-auto">
                        <Link href="/communities">
                            <Image
                                src="/logo.png"
                                alt="logo"
                                width={150}
                                height={150}
                            />
                        </Link>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <Separator orientation="horizontal" className="bg-[#CECECE]" />

            <SidebarContent className="py-8">
                <SidebarGroup>
                    <SidebarMenu className="space-y-4">
                        {/* Mostra apenas Comunidades quando estiver na rota /communities */}
                        {pathname === "/communities" && (
                            <SidebarMenuItem className="text-white items-center">
                                <SidebarMenuButton
                                    asChild
                                    isActive={isLinkActive(links[0].href)}
                                >
                                    <Link
                                        href={links[0].href}
                                        className="font-medium text-xl flex justify-start gap-2 pl-10"
                                    >
                                        {links[0].icon}
                                        {links[0].label}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )}

                        {/* Mostra apenas Meu Perfil quando estiver na rota /account */}
                        {pathname === "/account" && (
                            <SidebarMenuItem className="text-white items-center">
                                <SidebarMenuButton
                                    asChild
                                    isActive={isLinkActive(links[5].href)}
                                >
                                    <Link
                                        href={links[5].href}
                                        className="font-medium text-xl flex justify-start gap-2 pl-10"
                                    >
                                        {links[5].icon}
                                        {links[5].label}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )}

                        {/* Mostra os links de Dashboard até Configurações nas outras rotas */}
                        {pathname !== "/communities" &&
                            pathname !== "/account" &&
                            links.slice(1, 7).map((item) => (
                                <SidebarMenuItem
                                    className="text-white items-center"
                                    key={item.label}
                                >
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isLinkActive(item.href)}
                                    >
                                        <Link
                                            href={item.href}
                                            className="font-medium text-xl flex justify-start gap-2 pl-10"
                                        >
                                            {item.icon}
                                            {item.label}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        {pathname.startsWith(`/community/${communityId}`) && (
                            <SidebarMenuButton asChild>
                                <Link
                                    href={links[0].href}
                                    className="font-medium text-white text-xl flex justify-start gap-2 pl-10"
                                >
                                    <Undo className="flex-shrink-0 transition-colors" />
                                    {links[0].label}
                                </Link>
                            </SidebarMenuButton>
                        )}
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link
                                href={links[7].href}
                                onClick={links[7].onClick}
                                className="font-medium text-white text-xl flex justify-start gap-2 pl-10 mb-10"
                            >
                                {links[7].icon}
                                {links[7].label}
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
