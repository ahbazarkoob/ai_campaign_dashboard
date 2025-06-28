import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import imageURL from "@/app/assets/AI_Campaign_logo.png";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch } from "react-redux";
import { clearToken } from "@/store/slices/authSlice";
import CampaignData from "./campaign_data";

const Dashboard = () => {
  const dispatch = useDispatch();
  const router = useRouter();

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
      <CampaignData />
    </main>
  );
};

export default Dashboard;
