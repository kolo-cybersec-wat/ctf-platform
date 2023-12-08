import Markdown from "react-markdown";
import React from "react";
import {useLoaderData, useRouteLoaderData} from "react-router-dom";

const CompetitionAboutPage = () => {
    const competition = useRouteLoaderData('competition-layout')
    console.log(competition)
    return (
        <div className="bg-white rounded-lg shadow px-10 py-5">
            <div className="prose">
                <Markdown>
                    {competition && competition.about}
                </Markdown>
            </div>
        </div>
    )
}

export default CompetitionAboutPage