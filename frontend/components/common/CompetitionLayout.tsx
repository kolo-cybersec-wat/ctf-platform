import React, {FC, PropsWithChildren} from "react";
import {Link, LoaderFunctionArgs, Outlet, useLoaderData, useLocation} from "react-router-dom";
import {fetchData} from "../../fetchUtils";

export const competitionLayoutLoader = ({params}: LoaderFunctionArgs) => {
    return fetchData(`/api/competitions/${params.competitionSlug}/`);
}

const navigation = [
    ["O CTFie", "/"],
    ["Zadania", "/tasks"],
    ["Statystyki", "/stats"],
]

const CompetitionLayout: FC<PropsWithChildren<any>> = () => {
    const competition = useLoaderData()
    const location = useLocation()

    return (
        <div className="h-full w-1/2 mx-auto">
            <div className="pt-10">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900">{competition.name}</h2>
                    <p className="text-gray-500 sm:text-xl dark:text-gray-400">{competition.short_description}</p>
                </div>

                <ul className="mt-10 grid grid-cols-3 border-b">
                    {navigation.map(([label, href]) => (
                        <li className="block py-2 px-4 text-center">
                            <Link
                                to={`/competition/${competition.slug}${href}`}
                                className={[
                                    " text-center rounded-lg",
                                    location.pathname === `/competition/${competition.slug}${href}` ? 'font-bold' : ''
                                ].join(' ')}>
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-10">
                <Outlet />
            </div>
        </div>
    )
}

export default CompetitionLayout