import { RxCross1 } from "react-icons/rx"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { onClose } from "../../store/slices/modalSlice"
import { RootState } from "../../store/store"
import CreateNoticeForm from "../forms/CreateNoticeForm"
import { useModal } from "../../helpers/func/utils/modalUtils"

const CreateNoticeModal = () => {
    const isOpen = useAppSelector((state: RootState) => state.modal.isCreateNoticeModalOpen)
    const dispatch = useAppDispatch()

    const { handleModalClick } = useModal()

    return (
        <div
            onClick={handleModalClick}
            className={`${isOpen ? "block" : "hidden"} h-[100dvh] absolute top-0 left-0 w-full flex items-center justify-center bg-black/70 z-[45]`}
        >
            <div className='bg-white rounded-lg pt-5 relative max-w-[90dvw] sm:w-[70dvw] md:w-[700px] max-h-[80dvh] overflow-y-auto overflow-x-hidden scrollbar-w-2 scrollbar-track-yellow-lighter scrollbar-thumb-yellow scrollbar-thumb-rounded'>
                <button
                    className="absolute top-4 right-4"
                    onClick={() => dispatch(onClose())}
                >
                    <RxCross1 size={16} className="text-primary" />
                </button>
                <h2 className="text-xl sm:text-2xl text-primary font-bold mb-3 px-3 sm:px-7">
                    Create your notice
                </h2>
                <p className="text-content mb-6 px-3 sm:px-7 text-sm sm:text-base">
                    Create your own notice that will further help you accomplish your most important tasks while keeping the details in mind!
                </p>
                <CreateNoticeForm />
            </div>
        </div>
    )
}

export default CreateNoticeModal
