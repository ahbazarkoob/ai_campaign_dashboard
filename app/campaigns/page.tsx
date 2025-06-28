"use client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getCampaigns } from "../lib/api";
import Link from "next/link";
import { Campaign } from "@/types";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  CalendarDays,
  Mail,
  MessageCircle,
  Phone,
  PlusIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function CampaignsPage() {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);

  const {
    data: campaigns,
    isLoading,
    error,
  } = useQuery<Campaign[]>({
    queryKey: ["campaigns"],
    queryFn: getCampaigns,
  });

  if (!token) {
    router.push("/login");
    return null;
  }

  if (isLoading) return <div className="text-center">Loading...</div>;
  
  if (error)
    return (
      <div className="text-center text-red-500">Error loading campaigns</div>
    );

  return (
    <div className="flex flex-col gap-5 p-5 m-8 border rounded-md">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Campaign</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Campaigns</h2>
        <Link
          href="/campaigns/create"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          <div className="flex gap-1 items-center">
            <PlusIcon size={20} />
            <span> Create Campaign</span>
          </div>
        </Link>
      </div>
      {campaigns?.length === 0 ? (
        <p className="text-gray-500">
          No campaigns found. Create one to get started!
        </p>
      ) : (
        <div className="grid gap-4">
          {campaigns?.map((campaign) => (
            <Card key={campaign.id}>
              <Link href={`/campaigns/${campaign.id}`}>
                <CardHeader className="flex flex-row justify-between w-full pb-2">
                  <CardTitle className="gap-2 items-center">
                    <div className="flex flex-col gap-1 justify-center">
                      <div className="text-md font-semibold flex gap-2 items-center">
                        {campaign.name}
                      </div>
                      <div className="flex flex-row gap-3 items-center">
                        <span className="text-gray-600 text-xs font-medium">
                          Start: {new Date(campaign.startDate).toLocaleString()}
                        </span>
                        <Badge
                          className={`capitalize bg-[#F9FAFB] border-[#e5e7eb]  ${
                            campaign.status === "scheduled"
                              ? "text-purple-800 border-purple-800"
                              : campaign.status == "running"
                              ? "text-green-700 border-green-700"
                              : campaign.status === "completed"
                              ? "text-blue-800 border-blue-800"
                              : "text-[#374151] border-[#374151]"
                          }`}
                        >
                          {campaign.status}
                        </Badge>
                      </div>
                    </div>
                  </CardTitle>
                  <CardDescription className="text-gray-600 justify-between flex-none flex-col items-end ">
                    Camapign ID: {campaign.id}
                  </CardDescription>
                </CardHeader>
                <CardContent className="border-t border-gray-100 pt-4 w-full text-sm text-gray-900 items-center">
                  <div className="flex flex-col gap-3">
                    {campaign.message}
                    <div className="flex flex-row gap-2 w-full">
                      <Badge className="flex items-center gap-1 bg-[#F9FAFB] border-[#e5e7eb]">
                        <CalendarDays size={16} className="text-gray-500" />
                        <span className="text-[#374151] capitalize">
                          {
                            new Date(campaign.startDate)
                              .toLocaleString()
                              .split(",")[0]
                          }
                        </span>
                      </Badge>
                      <Badge className="flex items-center gap-1 bg-[#F9FAFB] border-[#e5e7eb]">
                        {campaign.type === "call" ? (
                          <Phone size={16} className="text-gray-500" />
                        ) : campaign.type === "email" ? (
                          <Mail size={16} className="text-gray-500" />
                        ) : (
                          <MessageCircle size={16} className="text-gray-500" />
                        )}
                        <span className="text-[#374151] capitalize">
                          {campaign.type}
                        </span>
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
