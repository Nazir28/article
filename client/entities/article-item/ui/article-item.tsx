import { path } from '@/app/consts'
import { IArticle } from '@/widgets/articles/interfaces'
import styles from './article-item.module.scss'
import Link from 'next/link'
import React from 'react'
import { RemoveArticle } from '@/features/remove-article'
import { useRouter } from 'next/router'

interface ArticleItemProps {
    article: IArticle
}

export const ArticleItem: React.FC<ArticleItemProps> = ({ article }) => {
    const router = useRouter()
    return (
        <div className="col-4 mt-4">
            <div className="card mb-3 pt-4">
                {
                    router.pathname === path.PROFILE_ARTICLES && <div className={styles.actions}>
                        <RemoveArticle article={article} />
                    </div>
                }

                <div className="row g-0">
                    <div className="col-12">
                        {/* eslint-disable-next-line @next/next/no-img-element*/}
                        <img
                            src={article.image_url}
                            alt="Picture of the author"
                            className={styles.img}
                        />
                    </div>
                    <div className="col-12">
                        <div className="card-body">
                            <h5 className={"card-title " + styles.title}>
                                <Link href={path.ARTICLE + '/' + article.id}>
                                    {article.title}
                                </Link>
                            </h5>
                            <p className={"card-text " + styles.description}>{article.description}</p>
                            <div className='d-flex justify-content-between pt-3'>
                                <p className="card-text mb-0">
                                    <small className="text-body-secondary">Имя автора {article.name}</small>
                                </p>
                                <Link href={path.ARTICLE + '/' + article.id}>
                                    подробнее
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
