import { useAppDispatch } from '@/app/hooks/redux'
import { mainActions } from '@/app/store/redusers/mainReduser'
import { Header } from '@/widgets/header'
import React from 'react'

interface MainLayoutProps {
    children: React.ReactNode
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        dispatch(mainActions.fetchCheckAuth())
    }, [dispatch])
    return (
        <>
            <Header />
            <main className='container pb-5'>
                {children}
            </main>
        </>
    )
}
