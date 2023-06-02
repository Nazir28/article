import { useAppSelector } from '@/app/hooks/redux'
import React from 'react'
import styles from './portfolio-info.module.scss'
import { Logout } from '@/entities/logout'

const PortfolioInfo = () => {
    const [isShow, setShow] = React.useState(false)
    const { email, userId, name } = useAppSelector(state => state.main)
    return (
        <div className={styles.wrapper}>
            <button className='btn' onClick={() => setShow(!isShow)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
                    <g id="User / User_02">
                        <path id="Vector" d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                </svg>
            </button>
            {
                isShow && <div className={styles.dropdown}>
                    <div className='d-flex align-items-center justify-content-between'>
                        <div>
                            <h5 className='mb-0'>{name}</h5>
                            <p className='mb-0'>email: {email} id: {userId}</p>
                        </div>
                        <Logout />
                    </div>
                </div>
            }

        </div>
    )
}

export default React.memo(PortfolioInfo)