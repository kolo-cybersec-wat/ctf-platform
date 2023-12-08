import React, {useEffect, useState} from "react";
import Markdown from "react-markdown";

import * as Dialog from '@radix-ui/react-dialog';
import {Cross2Icon} from '@radix-ui/react-icons';
import {CheckCircledIcon} from '@radix-ui/react-icons'
import {useLocation, useNavigate} from "react-router-dom";
import {postData} from "../../fetchUtils";

const FlagModal = ({isOpen, taskPk, onClose, onFlagSubmit}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const formData = new FormData(e.currentTarget);
        const flagData = {
            flag: formData.get('flag'),
            task_pk: taskPk
        }
        onFlagSubmit(flagData)
    }
    return (
        <Dialog.Root open={isOpen}>
            <Dialog.Portal>
                <Dialog.Overlay
                    onClick={onClose}
                    className="bg-black/70 backdrop-blur-sm fixed inset-0"/>
                <Dialog.Content
                    className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <Dialog.Title className="text-xl font-bold m-0 text-[17px] font-medium">
                        Wprowadź flagę
                    </Dialog.Title>
                    <form onSubmit={handleSubmit}>
                    <div className="mt-2">
                        <input type="hidden" name="task_pk" value={taskPk}/>
                        <fieldset className="mb-[15px] gap-5">
                            <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="flag">
                                Flaga
                            </label>
                            <input type="text" name="flag" id="flag"
                                   autoComplete="off"
                                   className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="ABC@{123}" required={true}/>
                        </fieldset>
                        <div className="mt-[25px] flex justify-end">
                            <Dialog.Close asChild>
                                <button
                                    type="submit"
                                    className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                                    Zatwierdź
                                </button>
                            </Dialog.Close>
                        </div>
                    </div>
                    </form>
                    <Dialog.Close asChild>
                        <button
                            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                            aria-label="Zamknij"
                            onClick={onClose}
                        >
                            <Cross2Icon/>
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

const CompetitionTaskCard = ({task, onFlagSubmit}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const isCompleted = task.is_completed

    const handleFlagSubmit = (flagData) => {
        setIsModalOpen(false)
        onFlagSubmit(flagData)
    }

    return (
        <>
            <div className={[
                "bg-white rounded-lg shadow px-10 py-5 border-2",
                isCompleted ? "border-green-200" : "border-transparent"
            ].join(" ")}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                             <span className={[
                                 "text-xl font-bold flex items-center",
                                 isCompleted ? "text-green-800" : ""
                             ].join(' ')}>
                                 {isCompleted && <CheckCircledIcon className="mr-2 w-6 h-6"/>}
                                 {task.title}
                             </span>
                        <span
                            className="ml-3 block px-3 py-1 rounded-2xl bg-blue-100 text-blue-600 text-sm">{task.category}</span>
                        <span className={[
                            "ml-5 pl-5 border-l block",
                            isCompleted ? "text-green-800" : ""
                        ].join(' ')}>{task.points} pkt</span>
                    </div>

                </div>
                <div className="mt-3 pt-3 border-t prose max-w-full">
                    <Markdown>
                        {task.description}
                    </Markdown>
                </div>
                {
                    !isCompleted && (
                        <div className="mt-5" onClick={() => setIsModalOpen(true)}>
                            <button
                                className="border-2 text-green-600 font-bold border-green-200 px-3 py-1 rounded-xl">Wprowadź
                                flagę
                            </button>
                        </div>
                    )
                }

            </div>
            <FlagModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onFlagSubmit={handleFlagSubmit}
                taskPk={task.pk}/>
        </>
    )
}

export default CompetitionTaskCard