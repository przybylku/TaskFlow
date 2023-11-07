"use client"
import { Provider } from 'react-redux'
import {store} from '@/store/store'
import { NextUIProvider } from '@nextui-org/react'
import useCookiedUser from "./useCookiedUser";
import usePath from "@/lib/usePath";
import { cookies } from 'next/headers';

/**
 * 
 * TODO:
 * Add classname prop to div
 */

export default function TaskFlowProvider({className, children}: {className?: string, children: JSX.Element}){
    const path = usePath()
    return (
        <div className={`mx-auto flex flex-col justify-center ${path === 'auth' || path === 'dashboard' ? "px-0" : "px-4 md:px-24"}`}>
            <NextUIProvider><Provider store={store}>{children}</Provider></NextUIProvider>
        </div>
    )
}