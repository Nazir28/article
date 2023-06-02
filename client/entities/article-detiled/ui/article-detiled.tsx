import { IArticle } from '@/widgets/articles/interfaces'
import Image from 'next/image'
import React from 'react'
import styles from './article-detiled.module.scss'

interface ArticleDetiledProps {
    article: IArticle
}

export const ArticleDetiled: React.FC<ArticleDetiledProps> = ({ article }) => {
    return (
        <div className='mt-5 pb-5'>
            <h2>{article.title}</h2>
            <div className='mt-5'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={article.image_url}
                    alt="Picture of the author"
                    className={styles.img}
                />
            </div>
            <p className={styles.description}>{article.description}</p>

        </div>
    )
}
