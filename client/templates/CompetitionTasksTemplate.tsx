import React from "react";
import BaseLayout from "@client/layouts/BaseLayout";
import SiteLayout from "@client/layouts/SiteLayout";
import CompetitionLayout from "@client/layouts/CompetitionLayout";
import CompetitionTaskCard from "@client/components/CompetitionsTemplate/CompetitionTaskCard";
import {CheckCircledIcon} from "@radix-ui/react-icons";
import {useForm} from "@reactivated";

const InfoText = ({text, colorClassName}) => (
    <span className={`mb-6 block text-center text-lg font-bold ${colorClassName}`}>
        {text}
    </span>
)

const TasksList = ({tasks}) => (
    <div className="">
        {
            tasks.map(task => (
                <CompetitionTaskCard task={task} />
            ))
        }
    </div>
)

const getAccessForbiddenText = (areTasksVisible) => {
    if(!areTasksVisible)
        return "Zadania nie są jeszcze dostępne"
    return "Zadania są dostępne tylko dla zalogowanych użytkowników zgłoszonych do konkursu"
}


const CompetitionPage = ({competition, tasks, form: djangoForm, does_user_have_access, are_tasks_visible, completed_task}) => {
    const form = useForm({form: djangoForm})
    return (
        <CompetitionLayout competitionName={competition.name} date="9 grudnia 2023" slug={competition.slug}>
            {
                completed_task && (
                    <InfoText colorClassName="text-green-600" text="Flaga poprawna"/>
                )
            }
            {
                form.errors && (
                    <InfoText colorClassName="text-red-600" text="Flaga niepoprawna"/>
                )
            }
            {
                (!does_user_have_access || !are_tasks_visible) ? (
                    <InfoText text={getAccessForbiddenText(are_tasks_visible)} colorClassName="black" />
                ) : <TasksList tasks={tasks} />
            }
            
        </CompetitionLayout>
    )
}

export default CompetitionPage