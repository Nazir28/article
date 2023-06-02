import { useAppDispatch, useAppSelector } from '@/app/hooks/redux'
import Input from '@/entities/input/ui/input'
import Modal from '@/shared/ui/modal/modal'
import { api } from '@/shared/utils/api'
import { articleActions } from '@/widgets/articles'
import React, { ChangeEvent, FormEvent } from 'react'

export const AddArticles = () => {
    const [showModal, setShowModal] = React.useState(false)
    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [image, setImage] = React.useState<File | null>(null)
    const [imagePreviewUrl, setImagePreviewUrl] = React.useState<string | null>(null)
    const userId = useAppSelector(state => state.main.userId)
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        setImage(null)
        setDescription('')
        setTitle('')
        setImagePreviewUrl(null)
    }, [showModal])
    const submitCreateArticleHandler = React.useCallback(async (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault()

        if (image !== null) {
            const formData = new FormData()
            formData.append('img', image)
            formData.append('title', title)
            formData.append('description', description)


            api.post('/article', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            )
                .then(res => {
                    if (userId !== null)
                        dispatch(articleActions.fetchUserArticles(userId))
                            .then(() => {
                                setShowModal(false)
                            })
                })
                .catch(rej => console.log(rej))
        }
    }, [dispatch, image, title, description, userId])


    const handleFileSelect = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files?.length === 0) {
            setImage(null)
            setImagePreviewUrl(null)
            return;
        }
        const file: File = event.target.files[0];
        setImage(event.target.files[0]);


        const reader = new FileReader();
        reader.onloadend = (): void => {
            setImagePreviewUrl(reader.result as string);
        }
        reader.readAsDataURL(file);
    }, [setImage])
    return (
        <>
            <button className='btn btn-primary' onClick={() => setShowModal(true)}>
                Добавить статью
            </button>
            {
                showModal && <Modal closeModal={() => setShowModal(false)}>
                    <div className="modal-header">
                        <h5 className="modal-title">Добавить статью</h5>
                        <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                    </div>
                    <form onSubmit={submitCreateArticleHandler} className="modal-body">
                        <Input required={true} label='Заголовок' getText={value => setTitle(value)} />
                        <div className="mt-3">
                            <label htmlFor="">Описание</label>
                            <textarea required={true} className='form-control' name="" id="" rows={4}
                                onChange={(evt: ChangeEvent<HTMLTextAreaElement>) => setDescription(evt.target.value)}
                                value={description}></textarea>
                        </div>
                        <div className='mt-4 ' >
                            <label htmlFor="image" className='btn btn-warning'>Загрузить фото</label>
                            <input type="file" id='image' onChange={handleFileSelect} className='d-none' accept=".jpg,.jpeg,.png, .svg" />
                            {imagePreviewUrl && (
                                // 
                                <div className=' rounded border p-3 mt-4'>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={imagePreviewUrl} width={150} height={100} alt="Selected Photo" />
                                </div>
                            )}
                        </div>
                        <button className='btn btn-primary mt-4 w-100'>Добавить</button>
                    </form>
                </Modal>
            }
        </>
    )
}
