import React, {FC, PropsWithChildren} from "react";
import BaseLayout from "@client/layouts/BaseLayout";
import SiteLayout from "@client/layouts/SiteLayout";

const navigation = [
    ["O CTFie", "/"],
    ["Rejestracja", "/register"],
    ["Zadania", "/tasks"],
    ["Statystyki", "/stats"],
]

const CompetitionLayout: FC<PropsWithChildren<any>> = ({competitionName, date, slug, children}) => {
    return (
        <SiteLayout>
            <div className="h-full w-1/2 mx-auto">
                <div className="pt-10">
                      <div className="mx-auto max-w-screen-sm text-center">
          <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900">{competitionName}</h2>
          <p className="text-gray-500 sm:text-xl dark:text-gray-400">{date}</p>
      </div>

    <ul className="mt-10 grid grid-cols-4 border-b">
                    {navigation.map(([label, href]) => (
                        <li className="block py-2 px-4 first:font-bold">
                            <a href={`/competition/${slug}${href}`} className=" text-center rounded-lg ">
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

                <div className="mt-10">
                    {children}
                </div>
                </div>
        </SiteLayout>
    )
}

export default CompetitionLayout