"use client";

import Image from "next/image";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { useSession, signIn, signOut } from "next-auth/react";
import { LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  const { data: session } = useSession();
  const isAdmin = session?.user?.email === "harshit15gg@gmail.com";

  return (
    <div className="sticky top-0 z-100 h-14 inset-x-0 border-b border-gray-200 bg-white/20 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-0 group">
              <div className="p-1.5 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  title="CV Craft Logo"
                  width={24}
                  height={24}
                />
              </div>
              <span className="text-xl font-bold tracking-tight ml-2">
                CVCraft
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-primary transition-colors"
                >
                  <LayoutDashboard size={16} className="md:hidden" />
                  <span className="hidden md:inline">Dashboard</span>
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-primary transition-colors"
                  >
                    <span className="hidden md:inline">Admin</span>
                  </Link>
                )}
                <div className="h-4 w-px bg-gray-200" />
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">
                      User
                    </span>
                    <span className="text-sm font-bold text-gray-700 leading-none">
                      {session.user?.name?.split(" ")[0]}
                    </span>
                  </div>
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="Avatar"
                      title="User Profile"
                      width={32}
                      height={32}
                      className="rounded-full ring-2 ring-gray-100"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                      {session.user?.name?.charAt(0)}
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => signOut()}
                    className="h-9 px-3 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all gap-2 border border-transparent hover:border-red-100"
                  >
                    <LogOut size={16} />
                    <span className="hidden md:inline font-bold uppercase tracking-tight text-[11px]">
                      Sign Out
                    </span>
                  </Button>
                </div>
              </>
            ) : (
              <Button
                onClick={() => signIn("google")}
                className="rounded-full px-6 font-bold shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-95"
              >
                Get Started
              </Button>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;
