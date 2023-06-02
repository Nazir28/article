import { FC, memo, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from './modal.module.scss'

const ReactPortal = ({ children, wrapperId = "react-portal-wrapper" }: any) => {
    let element = document?.getElementById(wrapperId);
    if (!element) {
        element = createWrapperAndAppendToBody(wrapperId);
    }

    return createPortal(children, element);
}

const createWrapperAndAppendToBody = (wrapperId: any) => {
    const wrapperElement = document.createElement('div');
    wrapperElement.setAttribute("id", wrapperId);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
}

interface ModalIn {
    children: ReactNode,
    closeModal: Function,
}

const Modal: FC<ModalIn> = ({ children, closeModal }) => {
    useEffect(() => {
        const closeOnEscapeKey = (e: any) => e.key === "Escape" ? closeModal() : null;
        document.body.addEventListener("keydown", closeOnEscapeKey);
        return () => {
            document.body.removeEventListener("keydown", closeOnEscapeKey);
        };
    }, [closeModal]);

    const modalBgClickHandler = (e: any) => {
        const target = e.target as HTMLInputElement;
        if (target.id === 'background') {
            closeModal()
        }
    }

    return <ReactPortal>
        <div className={styles.modalBg} id='background' onClick={modalBgClickHandler}>
            <div className={styles.modalWrapper}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    </ReactPortal>
};

export default memo(Modal);
