import { MainLayout } from '@/app/layout'
import { ArticleDetiled } from '@/entities/article-detiled'
import { api } from '@/shared/utils/api'
import { IArticle } from '@/widgets/articles/interfaces'
import { GetServerSideProps } from 'next'
import React from 'react'

interface ArticleProps {
    id?: any
}

function Article({ id }: ArticleProps) {
    const [article, setArticle] = React.useState<IArticle | undefined>(undefined)
    React.useEffect(() => {
        api.get('/article/' + id)
            .then(res => setArticle(res.data))
    }, [id])
    return (
        <MainLayout>
            <div className="col-8 m-auto">
            {
                article !== undefined && <ArticleDetiled article={article} />
            }
            </div>
        </MainLayout>
    )
}

export const getServerSideProps: GetServerSideProps<ArticleProps> = async (context) => {
    return {
        props: {
            id: context.params?.id
        },
    };
}


export default Article