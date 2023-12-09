import {useLoaderData, useRevalidator} from "react-router-dom";
import CompetitionTaskCard from "../../components/competitionTasks/CompetitionTaskCard";
import {fetchData, postData} from "../../fetchUtils";
import {useState} from "react";

export const competitionTasksPageLoader = ({params}) => {
    return fetchData(`/api/competition-tasks/by_competition/?competition_slug=${params.competitionSlug}`)
}

const CompetitionTasksPage = () => {
    const tasks = useLoaderData()
    const revalidator = useRevalidator()
    const [flagState, setFlagState] = useState(null)

    const handleFlagSubmit = async ({flag, task_pk}: {flag: string, task_pk: string}) => {
        setFlagState(null)
        const response = await postData(`/api/submit-flag/`, {
            method: 'POST',
            body: JSON.stringify({flag, task_pk})
        }).then(res => res.json())
        if(response.wrong_flag)
            setFlagState('wrong')
        else if(response.success) {
            revalidator.revalidate()
            setTimeout(() => {
                setFlagState(null)
            }, 500)
        } else
            setFlagState('error')
    }


    return (
        <div>
            <div className="mb-10">
                {
                    flagState === 'correct' && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Flaga poprawna!</strong>
                        </div>
                    )
                }
                {
                    flagState === 'wrong' && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Flaga niepoprawna!</strong>
                        </div>
                    )
                }
                {
                    flagState === 'error' && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Wystąpił błąd!</strong>
                        </div>
                    )
                }
            </div>
            <div className="grid gap-y-5 pb-10">
                {
                    tasks && tasks.map(task => <CompetitionTaskCard task={task} onFlagSubmit={handleFlagSubmit} /> )
                }
            </div>
        </div>
    )
}

export default CompetitionTasksPage