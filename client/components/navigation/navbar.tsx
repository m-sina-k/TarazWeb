"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserMenu } from "./user-menu";
import { useGetCurrentUser } from "@/hooks/api/user/useGetCurrentUser";
import { useSpring, animated, config } from "@react-spring/web";

type NavigationItem = {
  name: string;
  href: string;
};

const navigation: NavigationItem[] = [
  { name: "نمای کلی", href: "/overview" },
  { name: "تراکنش‌ها", href: "/transactions" },
  { name: "تنظیمات", href: "/settings" },
];

function MobileMenu({
  navigation,
  pathname,
  onClose,
}: {
  navigation: NavigationItem[];
  pathname: string;
  onClose: () => void;
}) {
  const springs = useSpring({
    from: { opacity: 0, transform: "translateY(-10px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: config.gentle,
  });

  return (
    <animated.div style={springs} className="border-t py-4 md:hidden">
      <div className="flex flex-col gap-1">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </animated.div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: userData } = useGetCurrentUser();

  return (
    <nav className="border-b bg-foreground">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/overview"
              className="text-xl font-bold text-text flex items-center gap-2 h-8"
            >
              <Image src="/images/logo.png" alt="logo" width={32} height={32} />
              ترازوب
            </Link>

            <div className="hidden md:flex md:items-center md:gap-1">
              {navigation.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <UserMenu user={userData?.user} />

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <MobileMenu
            navigation={navigation}
            pathname={pathname}
            onClose={() => setMobileMenuOpen(false)}
          />
        )}
      </div>
    </nav>
  );
}
