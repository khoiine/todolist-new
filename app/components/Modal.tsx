interface ModalProps {
    modalOpen: boolean;
    setModalOpen: (open:boolean) => boolean | void;
    children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ modalOpen , setModalOpen , children }) => {
    return (
        <dialog id="my_modal_3" className={`modal ${modalOpen ? "modal-open" : ""} bg-[#92b7ff]`}>
            <div className="modal-box bg-white text-black">
                <form method="dialog">
                    <button onClick={() => setModalOpen(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                {children}
            </div>
        </dialog>
    )
}

export default Modal
