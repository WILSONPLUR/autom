'use client';
import {  SidebarIcon } from 'lucide-react';
import React from 'react'
import {Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenuButton, SidebarMenuItem } from './sidebar';
import Link from 'next/link';
import LogoutButton from '@/app/logoutButton';
import { useHasActiveSubscriptions } from '@/hooks/use-subscription';

const menuItems = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Workflows",
                href: "/workflows",
                id: 1
            }
        ],
        href: "/dashboard",
        id: 1
    },
    {
        title: "Workflows",
        items: [
            {
                title: "Workflows",
                href: "/workflows",
                id: 1
            }
        ],
        href: "/workflows",
        id: 2
    },
]

const AppSidebar = () => {
    const {hasActiveSubs, isLoading} = useHasActiveSubscriptions();
  return (
    <Sidebar collapsible='icon' draggable>
        <SidebarHeader>
            <SidebarMenuItem>
                <SidebarMenuButton>
                    Autom {isLoading ? "Loading..." : hasActiveSubs ? "Pro" : "Free"}
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
                {menuItems.map((item) => (
                    <SidebarGroupContent key={item.id}>
                       {item.items.map(({id, title, href}) => (
                            <SidebarMenuItem key={id}>
                                <SidebarMenuButton>
                                    <Link href={href}>  
                                        {title}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                       ))}
                    </SidebarGroupContent>
            ))} 
            </SidebarGroup> 
            <LogoutButton className='w-[88%] mx-auto absolute bottom-2 left-4' />      
        </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar;
