import { useAppDispatch, useAppSelector } from '@/app/hooks/redux'
import { mainActions } from '@/app/store/redusers/mainReduser'
import { Input } from '@/entities/input'
import Modal from '@/shared/ui/modal/modal'
import React, { FormEvent } from 'react'

const Register = () => {
    const [showModal, setShowModal] = React.useState(false)
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [name, setName] = React.useState('')
    const isAuth = useAppSelector(state => state.main.isAuth)

    const dispatch = useAppDispatch()

    React.useEffect(() => {
        isAuth && setShowModal(false)
    }, [isAuth])

    const submitRegisterhandler = React.useCallback((evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
        dispatch(mainActions.fetchRegister({ email, password, name }))
    }, [dispatch, email, password, name])

    return (
        <>
            <button
                className="btn btn-outline-light"
                type="button"
                onClick={() => setShowModal(true)}
            >
                регистрация
            </button>

            {
                showModal && <Modal closeModal={() => setShowModal(false)}>
                    <div className="modal-header">
                        <h5 className="modal-title">Регистрация</h5>
                        <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                    </div>
                    <form onSubmit={submitRegisterhandler} className="modal-body">
                        <Input label='Email' getText={(value) => setEmail(value)} className='mt-3' type='text' />
                        <Input label='ФИО' getText={(value) => setName(value)} className='mt-2' type='text' />
                        <Input label='Пароль' getText={(value) => setPassword(value)} className='mt-2' type='password' />
                        <button className='btn btn-primary mt-4 w-100'>Зарегистрироваться</button>
                    </form>
                </Modal>
            }
        </>
    )
}

export default React.memo(Register)