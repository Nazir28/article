import { path } from '@/app/consts'
import { useAppDispatch, useAppSelector } from '@/app/hooks/redux'
import { MainLayout } from '@/app/layout'
import { AddArticles } from '@/features/add-articles'
import { Articles, articleActions } from '@/widgets/articles'
import { useRouter } from 'next/router'
import React from 'react'

const PortfolioArticles = () => {
    const userId = useAppSelector(state => state.main.userId)
    const isAuth = useAppSelector(state => state.main.isAuth)
    const articles = useAppSelector(state => state.article.articles)
    const dispatch = useAppDispatch()
    const router = useRouter()
    React.useEffect(() => {
        if (!isAuth) router.push(path.MAIN)
    }, [isAuth, router])

    React.useEffect(() => {
        if (userId !== null)
            dispatch(articleActions.fetchUserArticles(userId))
    }, [dispatch, userId])

    return (
        <MainLayout>
            <div className='mt-5'>
                <div className='d-flex align-items-center justify-content-between'>
                    <h1>Мои статьи</h1>
                    <AddArticles />
                </div>
                <div className='mt-4'>
                    {
                        articles !== undefined ? <Articles articles={articles} /> : 'loading...'
                    }
                </div>
            </div>
        </MainLayout>
    )
}

export default PortfolioArticles