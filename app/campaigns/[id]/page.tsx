"use client";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";
import { getCampaign } from "../../lib/api";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

export default function CampaignDetailsPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };

  const {
    data: campaign,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["campaign", id],
    queryFn: () => getCampaign(id),
  });

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error || !campaign)
    return (
      <div className="text-center text-red-500">
        Error loading campaign or campaign not found
      </div>
    );

  // Protect route: redirect to login if no token
  if (!localStorage.getItem("token")) {
    router.push("/login");
    return null;
  }

  return (
    <div className="flex flex-col gap-5 p-5 m-8 border rounded-md flex-1 h-[90vh]">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/campaigns">Campaigns</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Campaign {id}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex border-gray-100 border group p-6 py-4 flex-1 rounded-lg">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-row justify-between items-center">
            <div className="font-semibold text-xs text-gray-600">
              Campaign {id} details
            </div>
            <Button variant="ghost" className="invisible group-hover:visible">
              <Pencil />
              Edit
            </Button>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex gap-1 flex-col">
              <div className="text-xs font-medium text-gray-500 gap-1">
                Name
              </div>
              <div className={"font-semibold capitalize text-sm"}>
                {campaign.name}
              </div>
            </div>
            <div className="flex gap-1 flex-col">
              <div className="text-xs font-medium text-gray-500 gap-1">
                Message
              </div>
              <div className="font-semibold capitalize text-sm">
                {campaign.message}
              </div>
            </div>
            <div className="flex gap-1 flex-col">
              <div className="text-xs font-medium text-gray-500 gap-1">
                Campaign Type
              </div>
              <div className="font-semibold capitalize text-sm">
                {campaign.type}
              </div>
            </div>
            <div className="flex gap-1 flex-col">
              <div className="text-xs font-medium text-gray-500 gap-1">
                Date
              </div>
              <div className="font-semibold capitalize text-sm">
                {new Date(campaign.startDate).toLocaleString().split(",")[0]}
              </div>
            </div>
            <div className="flex gap-1 flex-col">
              <div className="text-xs font-medium text-gray-500 gap-1">
                Start Time
              </div>
              <div className="font-semibold capitalize text-sm">
                {new Date(campaign.startDate).toLocaleString().split(",")[1]}
              </div>
            </div>
            <div className="flex gap-1 flex-col">
              <div className="text-xs font-medium text-gray-500">Status</div>
              <div className="font-semibold capitalize text-sm">
                {campaign.status}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
