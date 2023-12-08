import {useState} from "react";

const useCompetitionTasksContext = (initialTasks) => {
    const [tasks, setTasks] = useState(initialTasks)

    return tasks
};

export default useCompetitionTasksContext