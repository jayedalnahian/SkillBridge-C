"use client";

import { Menu, BookOpen, Search, User, LogOut, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./modeToggle";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarProps {
  className?: string;
}


interface AppUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  role?: string;
  createdAt: Date;
  updatedAt: Date;
}

const Navbar = ({ className }: NavbarProps) => {

  const data = authClient.useSession();
  // Cast to AppUser type to include role
  const user = data.data?.user as AppUser | undefined;

  // const user = null
  const pathname = usePathname();

  // Public menu items
  const publicMenu: MenuItem[] = [
    { title: "Home", url: "/" },
    {
      title: "Find Tutors",
      url: "/tutors",
    },
    { title: "About", url: "/about" },
    { title: "Contact", url: "/contact" },
  ];

  // Role-based dashboard links
  const getDashboardUrl = () => {
    if (!user) return "/";
    switch (user.role) {
      case "STUDENT":
        return "/student/dashboard";
      case "TUTOR":
        return "/tutor/dashboard";
      case "ADMIN":
        return "/admin/dashboard";
      default:
        return "/";
    }
  };

  // Get user initials for avatar
  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Handle logout
  const handleLogout = async () => {
    const toastId = toast.loading("Logging out from your account...")
    try {

      await fetch("/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      // Force full refresh so Server Components re-check auth
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed", { id: toastId })
    }
  };

  return (
    <section className={cn("py-4 border-b sticky top-0 z-50 bg-background", className)}>
      <div className="container mx-auto">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-bold   bg-clip-text  hover:opacity-80 transition-opacity"
            >
              <BookOpen className="w-7 h-7 text-primary" />
              SkillBridge
            </Link>

            {/* Navigation Menu */}
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {publicMenu.map((item) => (
                    <NavigationMenuItem key={item.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.url}
                          className={cn(
                            "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground",
                            pathname === item.url && "bg-muted text-accent-foreground"
                          )}
                        >
                          {item.icon && <span className="mr-2">{item.icon}</span>}
                          {item.title}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <ModeToggle />

            {user ? (
              <>
                {/* Dashboard Button */}
                <Button asChild variant="outline" size="sm">
                  <Link href={getDashboardUrl()}>
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                </Button>

                {/* User Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.image || ""} alt={user.name} />
                        <AvatarFallback className="bg-black text-primary-foreground">
                          {getUserInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground mt-1">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
                            {user.role}
                          </span>
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={getDashboardUrl()}>
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    {user.role === "STUDENT" && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href="/student/bookings">
                            <BookOpen className="mr-2 h-4 w-4" />
                            <span>My Bookings</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/student/become-tutor">
                            <Search className="mr-2 h-4 w-4" />
                            <span>Become a Tutor</span>
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    {user.role === "TUTOR" && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href="/tutor/sessions">
                            <BookOpen className="mr-2 h-4 w-4" />
                            <span>My Sessions</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/tutor/availability">
                            <Search className="mr-2 h-4 w-4" />
                            <span>Availability</span>
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                {/* Guest Buttons */}
                <Button asChild variant="outline" size="sm">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild size="sm" className="bg-primary hover:from-primary/90 hover:to-secondary/90">
                  <Link href="/register">Sign up</Link>
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold bg-primary bg-clip-text text-transparent"
            >
              <BookOpen className="w-6 h-6 text-primary" />
              SkillBridge
            </Link>

            <div className="flex items-center gap-2">
              <ModeToggle />
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>
                      <Link
                        href="/"
                        className="flex items-center gap-2 text-xl font-bold bg-primary bg-clip-text text-transparent"
                      >
                        <BookOpen className="w-6 h-6 text-primary" />
                        SkillBridge
                      </Link>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col gap-6 mt-6">
                    {/* User Info (if logged in) */}
                    {user && (
                      <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={user.image || ""} alt={user.name} />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {getUserInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary mt-1">
                            {user.role}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Navigation Links */}
                    <Accordion
                      type="single"
                      collapsible
                      className="flex w-full flex-col gap-4"
                    >
                      {publicMenu.map((item) => (
                        <Link
                          key={item.title}
                          href={item.url}
                          className={cn(
                            "text-md font-semibold flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors",
                            pathname === item.url && "bg-muted text-accent-foreground"
                          )}
                        >
                          {item.icon}
                          {item.title}
                        </Link>
                      ))}
                    </Accordion>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 border-t pt-6">
                      {user ? (
                        <>
                          <Button asChild variant="outline" className="w-full">
                            <Link href={getDashboardUrl()}>
                              <LayoutDashboard className="mr-2 h-4 w-4" />
                              Dashboard
                            </Link>
                          </Button>
                          {user.role === "STUDENT" && (
                            <Button asChild variant="outline" className="w-full">
                              <Link href="/student/become-tutor">
                                <BookOpen className="mr-2 h-4 w-4" />
                                Become a Tutor
                              </Link>
                            </Button>
                          )}
                          <Button
                            variant="destructive"
                            className="w-full"
                            onClick={handleLogout}
                          >
                            <LogOut className="mr-2 h-4 w-4" />
                            Log out
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button asChild variant="outline" className="w-full">
                            <Link href="/login">Login</Link>
                          </Button>
                          <Button asChild className="w-full bg-primary ">
                            <Link href="/register">Sign up</Link>
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Navbar };