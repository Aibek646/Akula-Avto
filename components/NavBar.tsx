"use client";
import React from "react";
import Logo from "@/components/logo";
import { Input } from "@/components/ui/input";
import { Command } from "@/components/ui/command";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Loader, MessageSquare, MessageSquareText, Plus } from "lucide-react";
import useRegisterDialog from "@/hooks/use-register.dialog";
import useLoginDialog from "@/hooks/use-login-dialog";
import useCurrentUser from "@/hooks/api/use-current-user";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const NavBar = () => {
  const router = useRouter();
  const { onOpen: onRegisterOpen } = useRegisterDialog();
  const { onOpen: onLoginOpen } = useLoginDialog();
  const [searchKeyword, setSearchKeyword] = React.useState("");

  const { data: userData, isPending: isLoading } = useCurrentUser();
  const user = userData?.user;

  const handleSell = () => {
    if (!user) {
      onLoginOpen();
      return;
    }
    router.push("/my-shop/add-listing");
  };

  return (
    <header
      className="w-full px-3 md:px-0 bg-primary sticky top-0 align-top z-10 h-14"
      style={{ boxShadow: "1px 1px 4px #50727d66" }}
    >
      <nav className="flex items-center h-full max-w-7xl mx-auto">
        <Logo />
        <ul className="hidden lg:flex flex-1 items-center justify-center  mx-9 text-white/80 space-x-6">
          <li className="flex-[0.6] hidden md:flex">
            <div className="w-full max-w-[320px] h-10 bg-white rounded-lg relative">
              <form action="">
                <div className="flex items-center justify-between">
                  <Input
                    type="search"
                    name="keyword"
                    autoComplete="off"
                    placeholder="type your search"
                    className="flex-1 !shadow-none h-10 text-black !ring-0 !border-0"
                    value={searchKeyword}
                    onChange={() => setSearchKeyword(e.target.value)}
                  />
                  <Command className="w-5 h-5 mr-2 text-gray-600" />
                </div>
              </form>
            </div>
          </li>
          <li>
            <Link className="text-sm font-medium" href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="text-sm font-medium" href="/">
              Services & Repair
            </Link>
          </li>
          <li>
            <Link className="text-sm font-medium" href="/">
              Pricing
            </Link>
          </li>
        </ul>
        <div className="ml-auto flex items-center space-x-4">
          {isLoading ? (
            <Loader className="w-5 h-5 animate-spin text-white" />
          ) : !user ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={onLoginOpen}
                className="text-sm font-extralight text-white"
              >
                Sign in
              </button>
              <Separator orientation="vertical" className="h-3 text-white" />

              <button
                onClick={onRegisterOpen}
                className="text-sm font-extralight text-white"
              >
                Registration
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                size="icon"
                className="rounded-full shadow-sm !py-0 bg-white !text-black"
              >
                <MessageSquareText />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar role="button" className="h-9 w-9 shadow-sm">
                    <AvatarFallback className="text-sm uppercase">
                      {user?.name.charAt()}
                      {user?.name.charAt(1)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem
                    className="!cursor-pointer"
                    onClick={() => router.push("/my-shop")}
                  >
                    My Shop
                  </DropdownMenuItem>
                  <DropdownMenuSeparator>
                    <DropdownMenuItem
                      className="!cursor-pointer"
                      onClick={() => router.push("/my-shop")}
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuSeparator>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          <Button
            size="default"
            className="!bg-[#fea03c] !px-5 !h-10"
            onClick={handleSell}
          >
            <Plus />
            Sell Car
          </Button>
        </div>
      </nav>
    </header>
  );
};
export default NavBar;
