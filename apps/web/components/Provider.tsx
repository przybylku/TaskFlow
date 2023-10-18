"use client"
import { useState, useEffect } from "react";
import {usePathname} from "next/navigation"
import { Provider } from 'react-redux'
import {store} from '@/store/store'
/**
 * 
 * TODO:
 * Add classname prop to div
 */

export default function TaskFlowProvider({className, children}: {className?: string, children: JSX.Element}){
    const [path, setPath] = useState<string>("/" + usePathname())
    const pathname = usePathname()
    useEffect(() => {
        console.log(pathname.split("/")[1])
        setPath(pathname.split("/")[1])
    }, [pathname])
    return (
        <div className={`mx-auto flex flex-col justify-center ${path === 'auth' || path === 'dashboard' ? "px-0" : "px-4 md:px-24"}`}>
            <Provider store={store}>{children}</Provider>
        </div>
    )
}