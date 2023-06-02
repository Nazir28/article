import { useAppDispatch, useAppSelector } from '@/app/hooks/redux'
import { mainActions } from '@/app/store/redusers/mainReduser'
import Input from '@/entities/input/ui/input'
import Modal from '@/shared/ui/modal/modal'
import React, { FormEvent } from 'react'

const Login = () => {
    const [showModal, setShowModal] = React.useState(false)
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const isAuth = useAppSelector(state => state.main.isAuth)

    const dispatch = useAppDispatch()

    React.useEffect(() => {
        isAuth && setShowModal(false)
    }, [isAuth])

    const submitLoginhandler = React.useCallback((evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
        dispatch(mainActions.fetchLogin({ email, password }))
    }, [dispatch, email, password])
    return (
        <>
            <button
                className="btn btn-outline-light"
                type="button"
                onClick={() => setShowModal(true)}
            >
                войти
            </button>
            {
                showModal && <Modal closeModal={() => setShowModal(false)}>
                    <div className="modal-header">
                        <h5 className="modal-title">Вход</h5>
                        <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                    </div>
                    <form onSubmit={submitLoginhandler} className="modal-body">
                        <Input label='Email' getText={(value) => setEmail(value)} className='mt-3' type='text' />
                        <Input label='Пароль' getText={(value) => setPassword(value)} className='mt-2' type='password' />
                        <button className='btn btn-primary mt-4 w-100'>Войти</button>
                    </form>
                </Modal>
            }
        </>
    )
}

export default React.memo(Login)