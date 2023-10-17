import { ReactNode } from "react";
/**
 * 
 * TODO:
 * Add classname prop to div
 */
export default function TaskFlowProvider({className, children}: {className?: string, children: JSX.Element}){

    return (
        <div className="mx-auto flex flex-col justify-center px-4 md:px-24">
            {children}
        </div>
    )
}