"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import imageURL from "@/app/assets/AI_Campaign_logo.png";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setToken } from "@/store/slices/authSlice";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token } = await login(email, password);
      dispatch(setToken({ token: token }));
      router.push("/");
    } catch (err) {
      setError("Invalid email or password");
      alert(err);
    }
  };

  return (
    <div className="flex flex-col justify-between items-stretch">
      <div className="flex flex-row justify-between p-4">
        <Link href={""}>
          <Image src={imageURL} alt={"logo"} height={48} priority />
        </Link>
      </div>
      <div className="absolute bottom-0 h-2/4 w-full md:bg-[#007BFF] lg:bg-[#007BFF] bg-[#D5D5D5]"></div>
      <div className="flex flex-col gap-5 absolute top-1/3 left-[50%] md:max-w-[500px] lg:max-w-[500px] w-full transform -translate-x-1/2 -translate-y-1/4 md:p-8 lg:p-8  ">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {error && <p className="text-red-500">{error}</p>}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
