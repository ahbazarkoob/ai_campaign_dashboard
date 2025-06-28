import React from "react";
import CampaignDialog from "./campaign_dialog";
import { useQuery } from "@tanstack/react-query";
import { Campaign } from "@/types";
import { getCampaigns } from "@/app/lib/api";
import CreateCampaignForm from "./create_campaign_form";

const CampaignData = () => {
  const { data: campaigns } = useQuery<Campaign[]>({
    queryKey: ["campaigns"],
    queryFn: getCampaigns,
  });

  return (
    <div className="flex flex-col gap-3 overflow-scroll">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-medium">Campaigns</h1>
        <CreateCampaignForm />
      </div>
      {campaigns?.length === 0 ? (
        <p className="text-gray-500">
          No campaigns found. Create one to get started!
        </p>
      ) : (
        <div className="grid gap-4">
          {campaigns?.map((campaign) => (
            <CampaignDialog campaign={campaign} key={campaign.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CampaignData;
