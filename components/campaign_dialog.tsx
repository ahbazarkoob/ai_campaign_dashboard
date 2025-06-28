import React from "react";
import { Campaign } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Mail, MessageCircle, Phone } from "lucide-react";

const CampaignDialog = ({ campaign }: { campaign: Campaign }) => {
  return (
    <Dialog key={campaign.id}>
      <DialogTrigger>
        <Card>
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
          <CardContent className="border-t border-gray-100 pt-4 w-full text-sm text-gray-900 flex items-start">
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
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> Campaign {campaign.id} details</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="flex gap-1 flex-col">
            <div className="text-xs font-medium text-gray-500 gap-1">Name</div>
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
            <div className="text-xs font-medium text-gray-500 gap-1">Date</div>
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
      </DialogContent>
    </Dialog>
  );
};

export default CampaignDialog;
