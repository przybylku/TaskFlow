import dynamic from 'next/dynamic'

const NoSSR = dynamic(() => import('@/components/dashboard/Dashboard'), { ssr: false })
export default function DashboardPage(){
    return (
        <NoSSR/>
    )
}