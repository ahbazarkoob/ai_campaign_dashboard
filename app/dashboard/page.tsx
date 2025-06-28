"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import imageURL from "@/app/assets/AI_Campaign_logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearToken } from "@/store/slices/authSlice";

const navItems = [
  {
    id: "dashboard",
    label: "Home",
    href: "/dashboard",
    content: "Go to Dashboard",
  },
  {
    id: "campaigns",
    label: "Campaign",
    href: "/campaigns",
    content: "View Campaign",
  },
  {
    id: "create_campaign",
    label: "Create Campaign",
    href: "/campaigns/create",
    content: "Create a new Campaign",
  },
];

const DashboardPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  // Handle logout
  const handleLogout = () => {
    dispatch(clearToken());
    router.push("/login");
  };

  return (
    <main className="w-full h-screen flex-1 overflow-hidden">
      <div className="flex flex-row justify-between p-4">
        <Link href={"/dashboard"}>
          <Image src={imageURL} alt={"logo"} height={48} priority />
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          {navItems.map((item) => (
            <NavigationMenuItem key={item.id}>
              <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href={item.href} className="min-w-44">
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex flex-col gap-5 p-5 items-center">
        <h1 className="text-primary text-2xl font-medium">
          Welcome to AI Campaign Dashboard!
        </h1>
        <p>Manage your campaigns with ease.</p>
      </div>
    </main>
  );
};

export default DashboardPage;
