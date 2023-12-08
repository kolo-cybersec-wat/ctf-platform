import React, {FC, PropsWithChildren, useContext} from "react";
import {Context} from "@reactivated"
import {Helmet} from "react-helmet-async";
import '../styles/global.css'

const BaseLayout: FC<PropsWithChildren<{}>> = ({children}) => {
    const context: any = useContext(Context)
    return (
        <>
            <Helmet>
                <link rel="stylesheet" type="text/css" href={`${context.STATIC_URL}dist/index.css`}/>
                <link rel="stylesheet" type="text/css" href={`${context.STATIC_URL}assets/css/fonts.css`}/>
                <script defer crossOrigin="anonymous" src={`${context.STATIC_URL}dist/index.js`}/>
                .
            </Helmet>
            {children}
        </>
    )
}

export default BaseLayout