import Markdown from "react-markdown";
import React from "react";
import {useRouteLoaderData} from "react-router-dom";

const CompetitionAboutPage = () => {
    const competition = useRouteLoaderData('competition-layout')
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