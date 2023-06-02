import { useAppDispatch } from '@/app/hooks/redux'
import { mainActions } from '@/app/store/redusers/mainReduser'
import React from 'react'
import Cookies from 'cookies-ts'
const cookies = new Cookies()
const Logout = () => {
    const dispatch = useAppDispatch()
    const logoutClickHandler = React.useCallback(() => {
        cookies.remove('access_token')
        dispatch(mainActions.fetchCheckAuth())
    }, [])
    return (
        <button className='btn btn-danger' onClick={logoutClickHandler}>выйти</button>
    )
}

export default Logout