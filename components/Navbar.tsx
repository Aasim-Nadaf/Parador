"use client";
import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/stays", label: "Stays" },
  { href: "/experiences", label: "Experiences" },
  { href: "/destinations", label: "Distinations" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src={"/logo.svg"} alt="logo" width={30} height={30} />
            <span className="font-serif text-2xl tracking-tight text-foreground">
              Parador
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
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
              {navLinks.map(({ label, href }) => (
                <Link
                  href={href}
                  className="text-lg font-medium text-foreground py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </Link>
              ))}

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
