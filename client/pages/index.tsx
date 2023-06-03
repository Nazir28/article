import React from 'react'
import { MainLayout } from '@/app/layout'
import { Articles, articleActions } from '@/widgets/articles'
import { useAppDispatch, useAppSelector } from '@/app/hooks/redux'


interface IndexProps {
}

const Index: React.FC<IndexProps> = () => {
    const articles = useAppSelector(state => state.article.articles)
    const dispatch = useAppDispatch()
    
    React.useEffect(() => {
        dispatch(articleActions.fetchArticles())
    }, [dispatch])

    return (
        <MainLayout>
            <h1 className='mt-5 mb-3 col-10'>На этом сайте пользователи могут обмениваться знаниями и опытом в области технологий</h1>
            {
                articles !== undefined ? <Articles articles={articles} /> : 'loading...'
            }

        </MainLayout>
    )
}

export default Index