
import { Login, Register } from '@/features/auth'
import Modal from '@/shared/ui/modal/modal'
import React from 'react'

const HeaderAuth = () => {

    return (
        <div className="d-flex g-g-10">
            <Login />
            <Register />
        </div>
    )
}

export default React.memo(HeaderAuth)