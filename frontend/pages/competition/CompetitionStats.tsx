import Markdown from "react-markdown";
import React from "react";
import {useLoaderData} from "react-router-dom";
import CompetitionScoreboardChart from "../../components/competitionTasks/CompetitionScoreboardChart";

export const competitionStatsPageLoader = ({params}) => {
    return fetch(`/api/competition-scoreboard?competition_slug=${params.competition_slug}`)
}

const CompetitionStatsPage = () => {
    const stats = useLoaderData()
    const teamsAndPoints = stats.teams;
    return (
        <div className="bg-white rounded-lg shadow px-10 py-5">
            <div className="mb-10">
                <CompetitionScoreboardChart teamsAndPoints={teamsAndPoints}/>
            </div>
            <table className="table-auto w-full">
                <thead>
                <tr>
                    <th className=" text-left">Miejsce</th>
                    <th className="text-center">Nazwa</th>
                    <th className="text-right">Punkty</th>
                </tr>
                </thead>
                <tbody>
                {
                    teamsAndPoints.map((team, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td className="text-center">{team.name}</td>
                            <td className="text-right">{team.total_score}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}

export default CompetitionStatsPage