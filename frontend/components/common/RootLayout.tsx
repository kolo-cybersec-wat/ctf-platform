import {Link, Outlet, useLoaderData} from "react-router-dom";
import React from "react";
import {getSessionData} from "../../fetchUtils";
import {PersonIcon} from "@radix-ui/react-icons";

export const rootLayoutLoader = () => {
    return getSessionData()
}

const RootLayout = () => {
    const session = useLoaderData()
    return (
        <div>
            <div className="w-full">
                <nav className="fixed top-0 left-0 w-full">
                    <div className="w-full h-16 border-b bg-white">
                        <div className="w-4/5 mx-auto h-full flex items-center justify-between">
                            <div className="flex items-end">
                                 <span className="text-xl block">
                                 Capture the Flag
                             </span>
                                <span className="ml-2 block text-gray-500">
                                 by Koło CyberSecurity WCY WAT
                             </span>
                            </div>
                            {session.is_authenticated ? (
                                <div className="flex items-center text-gray-500">
                                    <span>
                                        <PersonIcon className="w-4 h-4 mr-2" />
                                    </span>
                                    <span>{session.username}</span>
                                    <span className="mx-4 block h-7 w-[1px] bg-gray-400" />
                                    <Link to="/auth/logout/">Wyloguj się</Link>
                                </div>
                            ) : (
                                <div className="flex items-center text-gray-500">
                                    <Link to="/auth/login/">Zaloguj się</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>
            </div>

            <main className="min-h-full pt-20">
                <Outlet/>
            </main>
        </div>
    )
}

export default RootLayout