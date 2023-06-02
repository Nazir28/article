import React from 'react'
import styles from './header.module.scss'
import { path } from '@/app/consts'
import Link from 'next/link'
import { useRouter } from 'next/router'
import HeaderAuth from './header-auth'
import { useAppSelector } from '@/app/hooks/redux'
import { Logout } from '@/entities/logout'
import { PortfolioInfo } from '@/widgets/profile-info'

const links = [
    {
        text: 'Главная',
        path: path.MAIN
    },
]

const authLinks = [
    {
        text: 'Главная',
        path: path.MAIN
    },
    {
        text: 'Мои статьи',
        path: path.PROFILE_ARTICLES
    },
]

export const Header: React.FC = () => {
    const isAuth = useAppSelector(state => state.main.isAuth)
    const navs = isAuth ? authLinks : links
    const router = useRouter()
    return (
        <header className={styles.header}>
            <div className="container">
                <nav className="navbar navbar-expand-lg border-bottom-dark" data-bs-theme="dark">
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                            <Link className={"navbar-brand " + styles.logo} href={path.MAIN}>Tech <span>Exchange</span></Link>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {
                                    navs.map(el => <li key={el.path} className="nav-item">
                                        <Link href={el.path} className={`nav-link ${router.pathname === el.path ? ' active' : ''}`}>
                                            {el.text}
                                        </Link>
                                    </li>)
                                }

                            </ul>
                            {
                                !isAuth ? <HeaderAuth /> : <PortfolioInfo />
                            }

                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}