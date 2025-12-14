"use client";
import { useState } from "react";
import {
  Menu,
  X,
  User,
  LogOut,
  Store,
  Castle,
  LayoutDashboard,
  BookIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useRouter();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Successfully signed out");
    navigate.push("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Left Side */}
          <div className="flex-1">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <Image
                src={"/logo.svg"}
                alt="logo"
                height={40}
                width={40}
                className="w-auto h-auto"
              />
              <span className="font-serif text-2xl tracking-tight text-foreground">
                Parador
              </span>
            </Link>
          </div>

          {/* Navigation Links - Center */}
          <div className="hidden lg:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
            <Link
              href="/stays"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Stays
            </Link>
            <Link
              href="/experiences"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Experiences
            </Link>
            <Link
              href="/destinations"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Destinations
            </Link>
          </div>

          {/* User Actions - Right Side */}
          <div className="hidden lg:flex items-center gap-4 flex-1 justify-end">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="text-muted-foreground cursor-pointer"
            >
              <Link href="/host">
                <Store className="h-4 w-4" />
                Become a Host
              </Link>
            </Button>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 cursor-pointer"
                  >
                    <User className="h-4 w-4" />
                    Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={() => navigate.push("/my-bookings")}
                  >
                    <BookIcon className="h-4 w-4 mr-2" />
                    My Bookings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate.push("/host")}>
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Host Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="gap-2 cursor-pointer"
              >
                <Link href="/auth">
                  <User className="h-4 w-4" />
                  Sign In
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-6 border-t border-border animate-fade-up">
            <div className="flex flex-col gap-4">
              <Link
                href="/stays"
                className="text-lg font-medium text-foreground py-2"
                onClick={() => setIsOpen(false)}
              >
                Stays
              </Link>
              <Link
                href="/experiences"
                className="text-lg font-medium text-foreground py-2"
                onClick={() => setIsOpen(false)}
              >
                Experiences
              </Link>
              <Link
                href="/destinations"
                className="text-lg font-medium text-foreground py-2"
                onClick={() => setIsOpen(false)}
              >
                Destinations
              </Link>
              <hr className="border-border my-2" />
              {user ? (
                <>
                  <Link
                    href="/my-bookings"
                    className="text-lg font-medium text-foreground py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    My Bookings
                  </Link>
                  <Button asChild variant={"outline"}>
                    <Link
                      href="/host"
                      className="text-foreground py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <Store className="h-4 w-4" />
                      Become a Host
                    </Link>
                  </Button>
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    className="mt-2 w-full"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Link href="/auth" onClick={() => setIsOpen(false)}>
                  <Button className="mt-2 w-full">
                    <User className="h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
