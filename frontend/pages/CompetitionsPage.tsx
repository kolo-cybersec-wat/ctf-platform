import React from "react";
import CompetitionCard from "../components/competitionTasks/CompetitionCard";
import {useLoaderData} from "react-router-dom";

export const competitionsPageLoader = () => {
    return fetch("/api/competitions")
}

const CompetitionsPage = () => {
    const competitions = useLoaderData()

    return (
        <div>
            <div className="w-full">
                <nav className="fixed top-0 left-0 w-full">
                    <div className="w-full h-16 border-b bg-white">
                        <div className="w-4/5 mx-auto h-full flex items-center">
                            <div className="flex items-end">
                                 <span className="text-xl block">
                                 Capture the Flag
                             </span>
                                <span className="ml-2 block text-gray-500">
                                 by Koło CyberSecurity WCY WAT
                             </span>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

            <main className="mt-20">
                <section className="">
                    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                            <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Nadchodzące CTFy</h2>
                            <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">Wybierz wydarzenie, aby się zarejestrować</p>
                        </div>
                        <div className="grid gap-8 lg:grid-cols-2">
                            {
                                competitions.map(competition => (
                                    <CompetitionCard competition={competition} />
                                ))
                            }
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default CompetitionsPage