"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Config } from "@/config/config";
import { LogOut, Settings } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  const handleDeleteAccount = () => {
    // TODO: Implement account deletion
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      // Call API to delete account
      localStorage.removeItem("token");
      router.push("/register");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="Bright Buddy Logo"
            width={200}
            height={200}
            className="rounded-lg h-18 w-auto"
          />

          <span className="text-xl font-bold text-gray-900">
            {Config.APP_NAME}
          </span>
        </Link>

      <div className="flex gap-6 items-center">
      <Button onClick={() => router.push('/child-dashboard')}>Stat Session</Button>

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
      <Avatar>
        <AvatarImage src="/logo.png" />
        <AvatarFallback>{Config.APP_NAME}</AvatarFallback>
      </Avatar>
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56" align="end">
    <DropdownMenuItem onClick={() => router.push("/profile")}>
      <Settings className="mr-2 h-4 w-4" />
      <span>Profile Settings</span>
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={handleLogout}>
      <LogOut className="mr-2 h-4 w-4" />
      <span>Logout</span>
    </DropdownMenuItem>
    <DropdownMenuSeparator />
  </DropdownMenuContent>
</DropdownMenu>
      </div>
      </div>
    </header>
  );
}
