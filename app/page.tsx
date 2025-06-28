"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardPage from "./dashboard/page";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function Home() {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setIsLoggedIn(!!storedToken || !!token);
    }
  }, [token]);

  useEffect(() => {
    if (isLoggedIn === false) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  if (isLoggedIn === null || !isLoggedIn) {
    return null;
  }

  // Welcome page for logged-in users
  return (
    <div className="w-screen h-screen">
      <DashboardPage />
    </div>
  );
}
