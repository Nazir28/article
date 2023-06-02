import React from 'react'
import { IArticle } from '../interfaces'
import { ArticleItem } from '@/entities/article-item'

interface ArticlesProps {
    articles: IArticle[]
}

export const Articles: React.FC<ArticlesProps> = ({ articles }) => {
    return (
        <>
            <div className="row">
                {
                    articles.length === 0 && <h2>нет статей</h2>
                }
                {
                    articles.map(article => <ArticleItem key={article.id} article={article} />)
                }
            </div>
        </>
    )
}
