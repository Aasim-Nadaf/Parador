"use client";
import { useState } from "react";
import { Menu, X, Globe, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-2xl tracking-tight text-foreground">
              Parador
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
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

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Globe className="h-4 w-4 mr-2" />
              EN
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              Become a Host
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <User className="h-4 w-4" />
              Sign In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
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
          <div className="md:hidden py-6 border-t border-border animate-fade-up">
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
              <Link
                href="/host"
                className="text-muted-foreground py-2"
                onClick={() => setIsOpen(false)}
              >
                Become a Host
              </Link>
              <Button className="mt-2 w-full">Sign In</Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
