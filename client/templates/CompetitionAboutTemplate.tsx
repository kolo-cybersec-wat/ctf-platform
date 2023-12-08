import React from "react";
import CompetitionLayout from "@client/layouts/CompetitionLayout";
import Markdown from 'react-markdown'

const CompetitionPage = ({competition}) => {
    return (
        <CompetitionLayout competitionName={competition.name} date="9 grudnia 2023" slug={competition.slug}>
           <div className="bg-white rounded-lg shadow px-10 py-5">
                    <div className="prose">
                        <Markdown>
                        {competition.about}
                    </Markdown>
                    </div>
                </div>
        </CompetitionLayout>
    )
}

export default CompetitionPage