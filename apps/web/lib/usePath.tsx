"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function usePath(): string{
    const [path, setPath] = useState<string>("/" + usePathname())
    const pathname = usePathname()
    useEffect(() => {
        console.log(pathname.split("/")[1])
        setPath(pathname.split("/")[1])
    }, [pathname])
    return path;
}