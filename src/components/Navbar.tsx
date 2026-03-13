"use client";
import Link from "next/link";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";
import ToggleTheme from "./ToggleTheme";

const Navbar = () => {
    const { data: session } = useSession();
    const user: User = session?.user as User;

    return (
        <nav className="p-4 md:p-6 dark:bg-[#141414] shadow-md border-b-2">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <a className="text-3xl font-bold mb-4 md:mb-0" href="#">
                    Mystery Message
                </a>
                {session ? (
                    <>
                        <span className="text-base font-medium">
                            Welcome {user?.username || user?.email}
                        </span>
                        <div className="flex items-center gap-3">
                            <ToggleTheme />
                            <Button
                                className="w-auto"
                                onClick={() => {
                                    signOut();
                                }}
                            >
                                Logout
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center gap-3">
                        <ToggleTheme />
                        <Link href="/sign-in">
                            <Button className="w-full md:m-auto">Login</Button>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
