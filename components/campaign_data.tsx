import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Campaign } from "@/types";
import { createCampaign, getCampaigns } from "@/app/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  Mail,
  MessageCircle,
  Phone,
  PlusIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import router from "next/router";

const createCampaignSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(2),
  type: z.enum(["call", "sms", "email"]),
  startDate: z.string({ required_error: "Date is required" }),
  message: z.string({ required_error: "Message is required" }),
  status: z.enum(["scheduled", "running", "completed"]),
});

const CampaignData = () => {
  const {
    data: campaigns,
    isLoading,
    error,
  } = useQuery<Campaign[]>({
    queryKey: ["campaigns"],
    queryFn: getCampaigns,
  });
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof createCampaignSchema>>({
    resolver: zodResolver(createCampaignSchema),
    defaultValues: {
      name: "",
      type: "email",
      startDate: "",
      message: "",
      status: "scheduled",
    },
  });

  const mutation = useMutation({
    mutationFn: createCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      router.push("/campaigns");
    },
    onError: () => {
      form.setError("root", {
        message: "Failed to create campaign. Please try again.",
      });
    },
  });

  if (isLoading) return <div className="text-center">Loading...</div>;

  if (error)
    return (
      <div className="text-center text-red-500">Error loading campaigns</div>
    );

  function onSubmit(values: z.infer<typeof createCampaignSchema>) {
    mutation.mutate(values);
    console.log(values);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row justify-between">
        <div>Campaigns</div>
        <Dialog>
          <DialogTrigger>
            <div className="flex gap-1 items-center bg-primary px-3 py-2 rounded-md text-white shadow-sm">
              <PlusIcon size={20} />
              <span> Create Campaign</span>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Campaign</DialogTitle>
              <DialogDescription>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 max-w-[400px]"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Campaign Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Campaign Type</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Campaign Type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="call">Call</SelectItem>
                                <SelectItem value="sms">SMS</SelectItem>
                                <SelectItem value="email">Email</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Campaign Start Date</FormLabel>
                          <FormControl>
                            <Input {...field} type="datetime-local" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Campaign Message</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      disabled={mutation.isPending}
                      className="w-full"
                    >
                      {mutation.isPending ? "Creating..." : "Create"}
                    </Button>
                  </form>
                </Form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      {campaigns?.length === 0 ? (
        <p className="text-gray-500">
          No campaigns found. Create one to get started!
        </p>
      ) : (
        <div className="grid gap-4">
          {campaigns?.map((campaign) => (
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
                            Start:{" "}
                            {new Date(campaign.startDate).toLocaleString()}
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
                            <MessageCircle
                              size={16}
                              className="text-gray-500"
                            />
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
                  <DialogDescription>
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
                          {
                            new Date(campaign.startDate)
                              .toLocaleString()
                              .split(",")[0]
                          }
                        </div>
                      </div>
                      <div className="flex gap-1 flex-col">
                        <div className="text-xs font-medium text-gray-500 gap-1">
                          Start Time
                        </div>
                        <div className="font-semibold capitalize text-sm">
                          {
                            new Date(campaign.startDate)
                              .toLocaleString()
                              .split(",")[1]
                          }
                        </div>
                      </div>
                      <div className="flex gap-1 flex-col">
                        <div className="text-xs font-medium text-gray-500">
                          Status
                        </div>
                        <div className="font-semibold capitalize text-sm">
                          {campaign.status}
                        </div>
                      </div>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      )}
    </div>
  );
};

export default CampaignData;
