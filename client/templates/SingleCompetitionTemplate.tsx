import React from "react";
import BaseLayout from "@client/layouts/BaseLayout";
import SiteLayout from "@client/layouts/SiteLayout";
import CompetitionLayout from "@client/layouts/CompetitionLayout";
import {templates} from '@reactivated'


const CompetitionPage = ({competition}) => {
    return (
        <CompetitionLayout competitionName={competition.name} date="9 grudnia 2023" slug={competition.slug}>
            <div className="">
                <div className="bg-white rounded-lg shadow px-10 py-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                             <span className="text-xl font-bold">Mapa Waciaków</span>
                            <span className="ml-3 block px-3 py-1 rounded-2xl bg-blue-100 text-blue-600 text-sm">Reverse engineering</span>
                        <span className="ml-5 pl-5 border-l block">200 pkt</span>
                        </div>

                    </div>
                    <div className="mt-3 pt-3 border-t prose max-w-full">
                        Na terenie Akademii został zlokalizowany serwer tcp, którego używają studenci do przekazywania sobie informacji o oficerach kontrolujących zaprawy. Jednemu z dowódców plutonu udało się przechwycić skompilowany kod serwera. Odkryj ich sekrety. Adress  serwera: 20.105.193.226:8989
                    </div>
                    <div className="mt-3">
                        <button className="border-2 text-green-600 font-bold border-green-200 px-3 py-1 rounded-xl">Wprowadź flagę</button>
                    </div>

                </div>
            </div>
        </CompetitionLayout>
    )
}

export default CompetitionPage