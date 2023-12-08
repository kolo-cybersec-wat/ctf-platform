import React, {FC, PropsWithChildren} from "react";
import BaseLayout from "@client/layouts/BaseLayout";

const SiteLayout: FC<PropsWithChildren<{}>> = ({children}) => (
    <BaseLayout>
             <div className="w-full">
                 <nav className="fixed top-0 left-0 w-full">
                     <div className="w-full h-16 border-b bg-white">
                         <div className="w-4/5 mx-auto h-full flex items-center">
                             <div className="flex items-end">
                                 <span className="text-xl block">
                                 Capture the Flag
                             </span>
                             <span className="ml-2 block text-gray-500">
                                 by Koło CyberSecurity WCY WAT
                             </span>
                             </div>
                         </div>
                     </div>
                 </nav>
             </div>

            <main className="min-h-full pt-20">
                {children}
            </main>
    </BaseLayout>
)

export default SiteLayout