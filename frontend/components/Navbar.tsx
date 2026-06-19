"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();

  const navItems = [
    {
      label: "Gender",
      href: "/gender",
    },
  ];

  return (
    <header className="wrapper navbar">
      <div className="h-16 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/images/innovation-logo.png"
            alt="FaceLens Logo"
            width={20}
            height={20}
            className="logo-icon drop-shadow-sm"
          />
          <span className="logo-text">facelens</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="ghost"
            size="lg"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="cursor-pointer h-12 w-12"
          >
            {resolvedTheme === 'dark' ? (
              <Sun size={24}  />
            ) : (
              <Moon size={24}  />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="icon-lg"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="cursor-pointer h-12 w-12"
          >
            {resolvedTheme === "dark" ? (
              <Sun size={24} />
            ) : (
              <Moon size={24} />
            )}
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon-lg" className="cursor-pointer">
                <Menu size={24} />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[min(85vw,360px)]">
              <div className="mt-10 flex flex-col gap-6 px-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium text-foreground transition hover:text-cta"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
