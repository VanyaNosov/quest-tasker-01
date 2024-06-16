import { RxCross1 } from "react-icons/rx"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { RootState } from "../../store/store"
import { onClose } from "../../store/slices/modalSlice"
import CreateFileForm from "../forms/CreateFileForm"
import { useModal } from "../../helpers/func/utils/modalUtils"


const CreateFileModal = () => {
    const isOpen = useAppSelector((state: RootState) => state.modal.isCreateFileModalOpen)
    const dispatch = useAppDispatch();

    const { handleModalClick } = useModal()

    return (
        <div 
        className={`${isOpen ? "block" : "hidden"} h-[100dvh] absolute top-0 left-0 w-full flex items-center justify-center bg-black/70 z-[45]`}
        onClick={handleModalClick}
        >
            <div className='bg-white rounded-lg pt-5 relative max-w-[90dvw] sm:w-[600px] max-h-[90dvh] overflow-y-auto overflow-x-hidden scrollbar-w-2 scrollbar-track-yellow-lighter scrollbar-thumb-yellow scrollbar-thumb-rounded'>
                <button
                    className="absolute top-2 right-2"
                    onClick={() => dispatch(onClose())}
                >
                    <RxCross1 size={16} className="text-primary" />
                </button>
                <h2 className="text-xl sm:text-2xl text-primary font-bold mb-3 px-4 sm:px-7">
                    Upload your PDF file
                </h2>
                <p className="text-content mb-6 px-4 sm:px-7">
                Upload your documents to secure storage so you don't forget something important (you can upload only <span className="text-primary font-semibold">pdf files</span>)
                </p>
                <CreateFileForm />
            </div>
        </div>
    )
}

export default CreateFileModal
