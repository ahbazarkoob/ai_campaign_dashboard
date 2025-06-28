"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import LoginPage from "./login/page";
import Dashboard from "@/components/dashbord";

export default function Home() {
  const token = useSelector((state: RootState) => state.auth.token);

  return (
    <div>
      {token ? (
        <main className="w-screen h-screen flex flex-1 bg-gray-100">
          <Dashboard />
        </main>
      ) : (
        <LoginPage />
      )}
    </div>
  );
}
