"use client"

import { SidebarGroup,SidebarGroupContent,SidebarMenu,SidebarMenuButton,SidebarMenuItem} from "@/components/ui/sidebar";
import { useAuth, useClerk } from "@clerk/nextjs";
import {FlameIcon,HomeIcon,PlayCircleIcon} from "lucide-react"
import Link from "next/link";


const items = [
    {
        title: "Home",
        url:"/",
        icon: HomeIcon
    },
    {
        title: "Subscriptions",
        url:"/feed/subscriptions",
        icon: PlayCircleIcon,
        auth: true
    },
    {
        title: "Trending",
        url:"/feed/trending",
        icon: FlameIcon
    }
];

export const MainSection = () => {
    const clerk = useClerk();
    const { isSignedIn } = useAuth();
    return (
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item)=> (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                tooltip={item.title}
                                asChild
                                isActive={false} //TODO: Make it look at current pathname
                                onClick={(e) => {
                                    if (!isSignedIn && item.auth){
                                        e.preventDefault();
                                        return clerk.openSignIn();
                                    }
                                }} 
                            >
                                <Link href={item.url} className="flex items-center gap-4">
                                    <item.icon/>
                                    <span className="text-sm">{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>  
    )
}