import { useState } from "react"
import { IoIosArrowBack } from 'react-icons/io'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { RootState } from '../../store/store'
import { onClose } from '../../store/slices/modalSlice'
import moment from 'moment'
import Button from '../ui/Button'
import { BiTrash } from 'react-icons/bi'
import toast from 'react-hot-toast'
import { deleteNotice } from '../../helpers/func/deleteItems/deleteNotice'
import { setNotice } from '../../store/slices/noticeSlice'
import { useGetUserNoticesQuery } from '../../store/services/getItems'
import { useModal } from '../../helpers/func/utils/modalUtils'
import { CgSpinner } from "react-icons/cg"

const NoticeModal = () => {
    const notice = useAppSelector((state: RootState) => state.notice.notice)
    const isOpen = useAppSelector((state: RootState) => state.modal.isNoticeModalOpen)
    const dispatch = useAppDispatch();
    const user = useAppSelector((state: RootState) => state.auth.user)
    const userId = user?._id ? user._id : ""
    const { refetch } = useGetUserNoticesQuery(userId)
    const [deleleNoticeLoading, setDeleteNoticeLoading] = useState(false)

    const { handleModalClick } = useModal()

    const deleteMyNotice = async (id: string) => {
        if (!user) {
            return
        }

        setDeleteNoticeLoading(true)

        try {
            const res = await deleteNotice(id, user.token, userId)

            if (res?.message === "Notice deleted successfully") {
                toast.success(res?.message)
                dispatch(setNotice(null))
                dispatch(onClose())
                refetch();
            } else {
                toast.error("Something went wrong! Try again.")
            }

        } catch (err) {
            toast.error("Something went wrong!")
            console.log(err);

        } finally {
            setDeleteNoticeLoading(false)
        }
    }

    if (!notice) {
        return null
    }

    return (
        <div
        className={`${isOpen ? "right-0" : "-right-full"} h-[100vh] duration-300 fixed top-0 w-[100vw] flex justify-end bg-black/50 z-[45] overflow-y-auto overflow-x-hidden`}
            onClick={handleModalClick}
        >
            <div className='bg-gray flex flex-col pt-5 relative w-[85dvw] sm:max-w-lg md:max-w-xl h-[100dvh] overflow-y-auto overflow-x-hidden scrollbar-w-2 scrollbar-track-yellow-lighter scrollbar-thumb-yellow scrollbar-thumb-rounded'>
                <div className="flex px-4 md:px-8 items-start justify-between gap-8 sm:gap-14 md:gap-24 mb-4 md:mb-7">
                    <h2 className='text-lg leading-6 sm:leading-7 md:leading-8 sm:text-xl md:text-2xl font-bold text-primary'>
                        {notice.title}
                    </h2>
                    <button className="hover:scale-125 transition duration-200"
                        onClick={() => dispatch(onClose())}
                    >
                        <IoIosArrowBack size={24} className="text-primary" />
                    </button>
                </div>
                <p className='text-content bg-white px-4 md:px-8 py-4 mb-3 text-sm sm:text-base min-h-[50dvh]'>
                    {notice.description}
                </p>
                <p className='text-primary text-base md:text-lg px-4 md:px-8 font-semibold mb-4'>
                    {moment(notice.createdAt).format('LLLL')}
                </p>
                {notice.images.length > 0 ? <div className='flex flex-wrap items-center gap-4 px-4 md:px-8 mb-3 sm:mb-6'>
                    {notice.images.map((image, i) => (
                        <div className='rounded-lg' key={i}>
                            <img
                                src={image}
                                alt="notice img"
                                className='max-w-[150px] sm:max-w-[250px] max-h-[150px] md:max-h-[250px] object-contain rounded-lg'
                            />
                        </div>
                    ))}
                </div> : null}
                <Button
                    bgColor='bg-rose-500'
                    color='text-white'
                    className='flex gap-2 items-center mx-4 sm:mx-8 border-none rounded-xl justify-center mt-auto mb-6 hover:bg-rose-600'
                    onClick={() => deleteMyNotice(notice._id)}
                >
                    {deleleNoticeLoading ? <div className="flex items-center justify-center">
                        <CgSpinner size={24} className="animate-spin text-white" />
                    </div> : <>
                        <BiTrash size={24} />
                        <p>Delete</p>
                    </>}
                </Button>
            </div>
        </div>
    )
}

export default NoticeModal
