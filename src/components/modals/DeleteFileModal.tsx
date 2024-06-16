import {useState} from "react"
import { RxCross1 } from "react-icons/rx"
import Button from "../ui/Button"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { onClose } from "../../store/slices/modalSlice";
import { RootState } from "../../store/store";
import { deleteUploadedFile } from "../../helpers/func/deleteItems/deleteUploadedFile";
import toast from "react-hot-toast";
import { useGetUserFilesQuery } from "../../store/services/getItems";
import { useModal } from "../../helpers/func/utils/modalUtils";
import { CgSpinner } from "react-icons/cg";


const DeleteFileModal = () => {
    const [deleteFileLoading, setIsDeleteFileLoading] = useState(false)
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state: RootState) => state.modal.isDeleteFileModalOpen)
    const fileId = useAppSelector((state: RootState) => state.modal.fileId)
    const user = useAppSelector((state: RootState) => state.auth.user)
    const userId = user?._id ? user._id : ""
    const { refetch } = useGetUserFilesQuery(userId)

    const { handleModalClick } = useModal()

    const deleteFile = async (id: string) => {
        if (!user || !id) {
            return
        }

        setIsDeleteFileLoading(true)

        try {
            const res = await deleteUploadedFile(id, user.token, userId)

            if (res?.message === "File deleted successfully") {
                toast.success(res?.message)
                dispatch(onClose())
                refetch();
            } else {
                toast.error("Something went wrong! Try again.")
            }

        } catch (err) {
            toast.error("Something went wrong!")
            console.log(err);
        } finally {
            setIsDeleteFileLoading(false)
        }
    }

    return (
        <div 
        className={`${isOpen ? "block" : "hidden"} h-[100dvh] absolute top-0 left-0 w-full flex items-center justify-center bg-black/50 z-[45]`}
        onClick={handleModalClick}
        >
            <div className='bg-white rounded-lg pt-5 relative w-[80dvw] sm:max-w-md'>
                <button
                    className="absolute top-2 right-2 transition hover:scale-125"
                    onClick={() => dispatch(onClose())}
                >
                    <RxCross1 size={16} className="text-primary" />
                </button>
                <h2 className="text-lg leading-5 sm:leading-6 sm:text-xl text-primary font-bold mb-3 px-4 sm:px-7">
                    Are you sure you want to delete this file?
                </h2>
                <p className="text-content mb-4 px-4 sm:px-7 text-sm sm:text-base">
                You confirm the deletion of this file without the possibility of restoring it from our storage!
                </p>
                <div className="bg-gray px-5 sm:px-7 py-3 sm:py-5 rounded-br-lg rounded-bl-lg">
                    <div className="flex items-center gap-5 justify-end">
                        <Button
                            bgColor="bg-transparent"
                            color="text-primary"
                            className="hover:bg-content/20 px-2 py-1 border-none"
                            onClick={() => dispatch(onClose())}
                        >
                            Cancel
                        </Button>
                        <Button
                            bgColor="bg-rose-500"
                            color="text-white"
                            className="border-none hover:bg-rose-400"
                            onClick={() => deleteFile(fileId)}
                        >
                            {(deleteFileLoading) ? <div className="flex items-center justify-center">
                            <CgSpinner size={24} className="animate-spin text-white" />
                        </div> : "Confirm"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteFileModal
