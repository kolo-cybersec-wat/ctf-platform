import React from "react";
import CompetitionCard from "../components/competitionTasks/CompetitionCard";
import {useLoaderData} from "react-router-dom";

export const competitionsPageLoader = () => {
    return fetch("/api/competitions")
}

const CompetitionsPage = () => {
    const competitions = useLoaderData()

    return (
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
    )
}

export default CompetitionsPage