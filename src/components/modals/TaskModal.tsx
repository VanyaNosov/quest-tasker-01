import { IoIosArrowBack } from "react-icons/io"
import Button from "../ui/Button"
import { onClose } from "../../store/slices/modalSlice"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { RootState } from "../../store/store"
import { getStatusColor } from "../../helpers/getStatusColor"
import { ImCalendar } from "react-icons/im"
import { BiEdit, BiUser } from "react-icons/bi"
import { PiArrowsSplitFill, PiFlowerTulipBold } from "react-icons/pi"
import { BsBodyText, BsGraphUpArrow } from "react-icons/bs"
import { RiAttachment2 } from "react-icons/ri"
import moment from "moment"
import { FaTrash } from "react-icons/fa"
import toast from "react-hot-toast"
import { deleteTaskInFolder } from "../../helpers/func/deleteItems/deleteTaskInFolder"
import { setTask } from "../../store/slices/taskSlice"
import { useGetUserFolderQuery, useGetUserFoldersQuery, useGetUserTasksQuery } from "../../store/services/getItems"
import { useState } from "react"
import StatusPicker from "../StatusPicker"
import EditTaskForm from "../forms/EditTaskForm"
import { statusTaskArray } from "../../helpers/constants"
import { useModal } from "../../helpers/func/utils/modalUtils"
import { CgSpinner } from "react-icons/cg"



const TaskModal = () => {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state: RootState) => state.modal.isTaskModalOpen)
    const task = useAppSelector((state: RootState) => state.task.task)
    const user = useAppSelector((state: RootState) => state.auth.user)
    const [isEditModeOpen, setIsEditModeOpen] = useState(false)
    const [status, setStatus] = useState(task?.status ? task.status : "")
    const [isStatusOpen, setIsStatusOpen] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)

    const { handleModalClick } = useModal()

    const userId = user?._id ? user._id : ""

    const { refetch } = useGetUserFolderQuery({
        userId,
        folderId: task?.folderId ? task.folderId : ""
    })
    const { refetch: refetchUserFolders } = useGetUserFoldersQuery(userId)
    const { refetch: refetchUserTasks } = useGetUserTasksQuery(userId)

    const deleteTask = async (id: string) => {
        if (!user) {
            return
        }

        setDeleteLoading(true)

        try {
            const res = await deleteTaskInFolder(id, user.token, userId)

            if (res?.message === "Task deleted successfully") {
                toast.success(res?.message)
                dispatch(setTask(null))
                dispatch(onClose())
                if(task?.folderId !== "Dashboard") {
                    refetch();
                }

                refetchUserFolders();
                refetchUserTasks()
            } else {
                toast.error("Something went wrong! Try again.")
            }
        } catch (err) {
            toast.error("Something went wrong!")
            console.log(err);
        } finally {
            setDeleteLoading(false)
        }
    }


    if (!task) {
        return null
    }

    const doneSubTasks = Math.round((task.subTasks.filter((task) => task.status === "Done").length / task.subTasks.length) * 100)

    return (
        <div
            onClick={handleModalClick}
            className={`${isOpen ? "right-0" : "-right-full"} h-[100vh] duration-300 fixed top-0 w-[100vw] flex justify-end bg-black/50 z-[45] overflow-y-auto overflow-x-hidden`}
        >
            <div className='bg-white pb-5 flex flex-col max-w-[90dvw] sm:max-w-[565px] h-[100dvh] relative overflow-y-auto overflow-x-hidden scrollbar-w-2 scrollbar-track-yellow-lighter scrollbar-thumb-yellow scrollbar-thumb-rounded'>
                <div className="flex-1 flex flex-col">
                    <div className="bg-white drop-shadow-sm z-10 sticky top-0 flex left-0 right-0 items-center justify-between gap-6 sm:gap-16 mb-5 px-4 sm:px-8">
                        {!isEditModeOpen ? <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${getStatusColor(task.status)}`} />
                            <p className="text-primary text-sm font-bold">
                                {task.status}
                            </p>
                        </div> : (
                            <StatusPicker
                                status={status}
                                setStatus={setStatus}
                                statusArray={statusTaskArray}
                                setIsStatusOpen={setIsStatusOpen}
                                isStatusOpen={isStatusOpen}
                            />
                        )}
                        <Button
                            className="flex items-center gap-2 hover:bg-gray border-none"
                            onClick={() => {
                                dispatch(onClose())
                                setIsEditModeOpen(false)
                            }}
                            bgColor="bg-transparent"
                            color="text-primary"
                        >
                            <IoIosArrowBack size={20} className="text-primary" />
                            <p className="font-semibold">Back</p>
                        </Button>
                    </div>
                    {!isEditModeOpen ? <>
                        <div className="px-4 sm:px-8">
                            <p className="text-content">
                                Task title
                            </p>
                            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-6 text-primary">
                                {task.title}
                            </h2>
                            <p className="text-content mb-2">
                                Location / Owner / DueDate
                            </p>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mb-5 sm:mb-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-yellow-400">
                                        <PiFlowerTulipBold size={26} className="text-black" />
                                    </div>
                                    <div>
                                        <p className="text-content text-sm leading-4">
                                            Folder location
                                        </p>
                                        <p className="text-primary font-semibold">
                                            {task.folderId === "Dashboard" ? "Dashboard" : "In folder"}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-transparent border-[2px] border-dashed border-content">
                                        <BiUser size={20} className="text-black" />
                                    </div>
                                    <div>
                                        <p className="text-content text-sm leading-4 text-left">
                                            Owner
                                        </p>
                                        <p className="text-primary font-semibold">
                                            {user?.name.split(" ")[0]}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-transparent border-[2px] border-dashed border-content">
                                        <ImCalendar size={20} className="text-black" />
                                    </div>
                                    <div>
                                        <p className="text-content text-sm text-left">
                                            Due date
                                        </p>
                                        <p className="text-primary font-semibold">
                                            {task.dueDate}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-5 sm:gap-[70px] mb-2 sm:mb-4">
                                <div className="flex items-center gap-2">
                                    <BsGraphUpArrow size={16} className="text-content" />
                                    <p className="text-content">Priority</p>
                                </div>
                                <p className={`px-1 sm:px-2 sm:font-semibold text-primary py-0.5 w-fit rounded-xl ${getStatusColor(task.priority)}`}>
                                    {task.priority}
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-10 mb-5">
                                <div className="flex items-center gap-2">
                                    <BsBodyText size={16} className="text-content" />
                                    <p className="text-content">Description</p>
                                </div>
                                <p className="text-primary">
                                    {task.description}
                                </p>
                            </div>
                        </div>
                        {task.subTasks.length > 0 ?
                            <div className="bg-gray px-4 sm:px-8 py-2 sm:py-4 mb-3">
                                <div className="flex items-center gap-3 mb-2 sm:mb-4">
                                    <PiArrowsSplitFill size={20} className="text-content -rotate-90" />
                                    <p className="text-content">Sub-tasks</p>
                                </div>
                                <div className="mb-3 flex gap-4 items-center">
                                    <div className='relative flex-1'>
                                        <div className={`w-full h-1 rounded-xl bg-content/10`} />
                                        <div
                                            className={`absolute top-0 left-0 rounded-xl h-1 bg-primary z-10`}
                                            style={{ width: `${doneSubTasks}%` }}
                                        />
                                    </div>
                                    <p className='text-content/80 text-sm'>
                                        {doneSubTasks}%
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 sm:gap-4 mb-4">
                                    {task.subTasks.map((subtaks, i) => (
                                        <div className="bg-white rounded-xl p-2 px-3" key={subtaks._id}>
                                            <div className="flex gap-4 justify-between items-center">
                                                <p className="text-primary">
                                                    {i + 1}. {subtaks.title}
                                                </p>
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-3 h-3 rounded-full ${getStatusColor(subtaks.status)}`} />
                                                    <p className="text-primary text-sm font-bold hidden sm:block">
                                                        {subtaks.status}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div> : null
                        }
                        {task.images.length > 0 ? <div className="px-4 sm:px-8 mb-5">
                            <div className="flex items-center gap-1 mb-4">
                                <RiAttachment2 size={18} className="text-content" />
                                <p className="text-content">Attachments</p>
                            </div>
                            <div className="flex items-center gap-5 flex-wrap">
                                {task.images.map((image) => (
                                    <div className='w-40 h-28 rounded-lg' key={image}>
                                        <img
                                            src={image}
                                            alt="image"
                                            className='w-full h-full rounded-lg'
                                        />

                                    </div>
                                ))}
                            </div>
                        </div> : null}
                    </> : <div className="flex-1 flex flex-col">
                        <EditTaskForm
                            status={status}
                            task={task}
                            user={user}
                            setEditMode={setIsEditModeOpen}
                        />
                    </div>}
                    {!isEditModeOpen ? <p className="text-right text-content mx-8 mb-6">
                        Task created: {moment(task.dueDate).format('MMMM Do YYYY, h:mm a')}
                    </p> : null}
                </div>
                <div className="flex flex-col gap-4 items-center px-4 sm:px-8">
                    {!isEditModeOpen ? (<Button
                        onClick={() => {
                            setIsEditModeOpen(true)
                            setStatus(task.status)
                        }}
                        bgColor="bg-sky-500"
                        color="text-white"
                        className="w-full rounded-xl hover:bg-sky-400 flex items-center gap-2 border-none justify-center font-semibold"
                    >
                        <BiEdit size={20} className="text-white" />
                        <p>Edit</p>
                    </Button>) : null}
                    {!isEditModeOpen ? <Button
                        bgColor="bg-rose-500"
                        color="text-white"
                        className="w-full rounded-xl hover:bg-rose-400 flex items-center gap-2 border-none justify-center font-semibold"
                        onClick={() => deleteTask(task._id)}
                    >
                        {deleteLoading ? <div className="flex items-center justify-center">
                            <CgSpinner size={24} className="animate-spin text-white" />
                        </div> : <>
                            <FaTrash size={20} className="text-white" />
                            <p>Delete</p>
                        </>}
                    </Button> : null}
                </div>
            </div>
        </div>
    )
}

export default TaskModal
