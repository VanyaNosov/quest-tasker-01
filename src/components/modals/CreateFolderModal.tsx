import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { RootState } from "../../store/store";
import { onClose } from "../../store/slices/modalSlice";
import { IoIosArrowBack } from "react-icons/io";
import CreateFolderForm from "../forms/CreateFolderForm";
import { useModal } from "../../helpers/func/utils/modalUtils";


const CreateFolderModal = () => {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state: RootState) => state.modal.isCreateFolderModalOpen)

    const { handleModalClick } = useModal()

    return (
        <div
            onClick={handleModalClick}
            className={`${isOpen ? "right-0" : "-right-full"} h-[100vh] duration-300 fixed top-0 w-[100vw] flex justify-end bg-black/50 z-[45] overflow-y-auto overflow-x-hidden`}
        >
            <div className='flex flex-col bg-gray pt-5 sm:pt-7 relative max-w-[90dvw] sm:max-w-2xl h-[100dvh] overflow-y-auto overflow-x-hidden scrollbar-w-2 scrollbar-track-yellow-lighter scrollbar-thumb-yellow scrollbar-thumb-rounded'>
                <div className="flex px-4 sm:px-8 items-center justify-between gap-6 sm:gap-10 mb-6 sm:mb-10">
                    <h2 className="text-xl sm:text-3xl font-semibold text-primary">
                        Create new folder
                    </h2>
                    <button className="hover:scale-125 transition duration-200"
                        onClick={() => dispatch(onClose())}
                    >
                        <IoIosArrowBack size={20} className="text-primary" />
                    </button>
                </div>
                <div className="flex-1 flex flex-col">
                    <CreateFolderForm
                    />
                </div>
            </div>
        </div>
    )
}

export default CreateFolderModal
