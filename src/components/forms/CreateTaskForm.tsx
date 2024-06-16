import { BiTask, BiTrash, BiUser } from "react-icons/bi"
import { PiArrowsSplitFill, PiFlowerTulipBold } from "react-icons/pi"
import { ImCalendar } from "react-icons/im"
import { useState } from "react";
import moment from "moment";
import DatePicker from 'react-datepicker';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import { BsBodyText, BsGraphUpArrow } from "react-icons/bs";
import StatusPicker from "../StatusPicker";
import { AiFillPlusCircle } from "react-icons/ai";
import Button from "../ui/Button";
import { CgMoveTask, CgSpinner } from "react-icons/cg"
import * as z from "zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { onClose, setIsCreateTaksModalOpen } from "../../store/slices/modalSlice";
import { createTaskInFolder } from "../../helpers/func/createItems/createTaskInFolder";
import { useGetUserFolderQuery, useGetUserFoldersQuery, useGetUserTasksQuery } from "../../store/services/getItems";
import { RiAttachment2 } from "react-icons/ri"
import UploadTaskImages from "./UploadTaskImages";
import { priorityArray } from "../../helpers/constants";



const CreateTaskSchema = z.object({
    title: z.string().min(2, {
        message: "Name must be more than 1 letter"
    }),
    description: z.string().min(2, {
        message: "Descr must be more than 1 letter"
    }),
})

type FormValues = z.infer<typeof CreateTaskSchema>


const CreateTaskForm = () => {
    const user = useAppSelector((state: RootState) => state.auth.user)
    const folderId = useAppSelector((state: RootState) => state.modal.folderId)

    const [selectedDate, setSelectedDate] = useState<string | null>(moment().format('YYYY-MM-DD HH:mm'));
    const [status, setStatus] = useState(priorityArray[0])
    const [isStatusOpen, setIsStatusOpen] = useState(false)
    const [isCreateSubtaskOpen, setIsCreateSubtaskOpen] = useState(false)
    const [subtask, setSubtask] = useState("")
    const [subtasks, setSubtasks] = useState<string[]>([])
    const [images, setImages] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const dispatch = useAppDispatch();

    const userId = user?._id ? user._id : ""

    const { refetch } = useGetUserFolderQuery({
        userId,
        folderId
    })
    const { refetch: refetchUserTasks } = useGetUserTasksQuery(userId)
    const { refetch: refetchUserFolders } = useGetUserFoldersQuery(userId)

    const { register, handleSubmit, reset,
        formState: { isSubmitting, isValid }
    } = useForm<FormValues>({
        resolver: zodResolver(CreateTaskSchema), defaultValues: {
            title: "",
            description: ""
        }
    })

    const addSubtask = () => {
        setSubtasks([...subtasks, subtask])
        setSubtask("")
    }

    const deleteSubtasks = (task: string) => {
        const filteredSubtasks = subtasks.filter((subtask) => subtask !== task)
        setSubtasks(filteredSubtasks)
    }

    const handleDateChange = (date: Date) => {
        if (date) {
            setSelectedDate(moment(date).format('YYYY-MM-DD HH:mm'));
        } else {
            setSelectedDate(null);
        }
    };

    const onSubmit: SubmitHandler<FormValues> = async (values) => {

        if (!user) {
            return
        }

        const fullSubtasks = subtasks.length > 0 ? subtasks.map((subtask) => ({
            title: subtask,
            status: "In progress"
        })) : []

        const data = {
            title: values.title,
            description: values.description,
            priority: status,
            images,
            status: "Open",
            subTasks: fullSubtasks,
            userId,
            dueDate: selectedDate,
            folderId: folderId ? folderId : "Dashboard"
        }

        try {
            const res = await createTaskInFolder(data, user.token)

            if (res?.message === "Task was created sucessfully") {
                toast.success("Task was created sucessfully")
                setStatus(priorityArray[0])
                setIsStatusOpen(false)
                setIsCreateSubtaskOpen(false)
                setSubtask("")
                setSubtasks([])
                setImages([])
                reset();
                refetchUserTasks();
                refetchUserFolders()
                if (folderId) {
                    refetch()
                }
                dispatch(onClose())
                dispatch(setIsCreateTaksModalOpen({ isOpen: false, folderId: null }))
            } else {
                toast.error("Something went wrong! Try again.")
            }
        } catch (err) {
            toast.error("Internal server error")
            console.log(err);
        }
    }

    return (
        <form className="w-full sm:w-[550px] flex flex-col flex-1" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex-1">
                <div className="mb-4 sm:mb-8 px-4 sm:px-8">
                    <p className="text-content mb-2">
                        Create task title
                    </p>
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 min-w-[40px] sm:min-w-[48px] sm:w-12 sm:h-12 flex items-center justify-center rounded-xl bg-sky-500">
                            <BiTask size={26} className="text-black" />
                        </div>
                        <input
                            type="text"
                            placeholder="Type task title ..."
                            className="sm:p-2 w-full border-none bg-transparent focus:outline-none text-xl sm:text-2xl placeholder:text-content"
                            {...register("title")}
                        />
                    </div>
                </div>
                <div className="bg-white pt-4 pb-3 sm:pt-8 sm:pb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-8 justify-between px-4 sm:px-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-yellow-400">
                                <PiFlowerTulipBold size={26} className="text-black" />
                            </div>
                            <div>
                                <p className="text-content text-sm leading-4">
                                    Folder location
                                </p>
                                <p className="text-primary font-semibold">
                                    {folderId ? "In folder" : "Dashboard"}
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
                            <div className="w-[140px]">
                                <p className="text-content text-sm text-left">
                                    Due date
                                </p>
                                <DatePicker
                                    selected={selectedDate ? moment(selectedDate, 'YYYY-MM-DD HH:mm').toDate() : null}
                                    onChange={handleDateChange}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={60}
                                    minDate={new Date()}
                                    minTime={moment().toDate()}
                                    maxTime={moment().endOf('day').toDate()}
                                    dateFormat="yyyy-MM-dd HH:mm"
                                    className={`w-full hover:bg-gray transition border border-dashed px-2 py-1 rounded-xl border-primary outline-none focus:outline-none cursor-pointer text-sm text-primary`}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center mb-5 gap-5 sm:gap-10 px-4 sm:px-8">
                        <div className="flex items-center gap-2">
                            <BsGraphUpArrow size={16} className="text-content" />
                            <p className="text-content">Priority</p>
                        </div>
                        <StatusPicker
                            status={status}
                            statusArray={priorityArray}
                            setStatus={setStatus}
                            isStatusOpen={isStatusOpen}
                            setIsStatusOpen={setIsStatusOpen}
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-10 px-4 sm:px-8">
                        <div className="flex items-center gap-2">
                            <BsBodyText size={16} className="text-content" />
                            <p className="text-content">Description</p>
                        </div>
                        <textarea
                            placeholder="Type task description..."
                            className="border-none focus:outline-none h-20 resize-none w-full"
                            {...register("description")}
                        />
                    </div>
                    {isCreateSubtaskOpen ?
                        <div className="bg-gray px-4 sm:px-8 py-2 sm:py-4">
                            <div className="flex items-center gap-3 mb-2 sm:mb-4">
                                <PiArrowsSplitFill size={20} className="text-content -rotate-90" />
                                <p className="text-content">Sub-tasks</p>
                            </div>
                            {subtasks.length > 0 ? (
                                <div className="flex flex-col gap-2 sm:gap-4 mb-2 sm:mb-4">
                                    {subtasks.map((subtaks, i) => (
                                        <div className="bg-white rounded-xl p-2 pl-4" key={subtaks + i}>
                                            <div className="flex gap-4 justify-between items-center">
                                                <p className="text-primary">
                                                    {subtaks}
                                                </p>
                                                <button
                                                    type="button"
                                                    className="hover:scale-110 transition"
                                                    onClick={() => deleteSubtasks(subtaks)}
                                                >
                                                    <BiTrash size={20} color="red" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : null}
                            <div className="bg-white rounded-lg px-2 py-2 sm:py-4">
                                <div className="flex gap-2 items-center">
                                    <div className="flex items-center justify-center min-w-[32px] w-8 h-8 bg-rose-500 rounded-lg">
                                        <CgMoveTask size={20} />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Type sub-task title ..."
                                        className="w-full text-primary p-1 border-none focus:outline-none placeholder:text-content"
                                        value={subtask}
                                        onChange={(e) => setSubtask(e.target.value)}
                                    />
                                    <Button
                                        bgColor="bg-primary"
                                        color="text-white"
                                        disabled={false}
                                        className="hover:bg-primary/80 px-1 py-0.5 text-sm"
                                        onClick={addSubtask}
                                        type="button"
                                    >
                                        Create
                                    </Button>
                                </div>
                            </div>
                        </div> : null}
                    <div className="px-4 sm:px-8 -ml-3">
                        <Button
                            bgColor='bg-transparent'
                            color='text-primary'
                            className='flex items-center gap-2 border-none rounded-lg text-sm font-semibold group hover:bg-transparent mb-4'
                            onClick={() => setIsCreateSubtaskOpen(true)}
                            type="button"
                        >
                            <AiFillPlusCircle size={24} className="text-primary group-hover:text-primary/80" />
                            <p className="text-primary group-hover:text-primary/80">
                                Add sub-task
                            </p>
                        </Button>
                    </div>
                    <div className="px-4 sm:px-8 mb-5">
                        <div className="flex items-center gap-1 mb-4">
                            <RiAttachment2 size={18} className="text-content" />
                            <p className="text-content">Attachments</p>
                        </div>
                        <UploadTaskImages
                            images={images}
                            setImages={setImages}
                            setImageLoading={setIsLoading}
                            user={user}
                        />
                    </div>
                    <p className="text-right text-content mx-8">
                        Task will be create: {moment(Date.now()).format('MMMM Do YYYY, h:mm a')}
                    </p>
                </div>
            </div>
            <div className="px-4 sm:px-8 py-3">
                <Button
                    className="w-full rounded-xl hover:bg-primary/80 disabled:text-white"
                    bgColor="bg-primary"
                    color="text-white"
                    disabled={!isValid || isSubmitting || !selectedDate || isLoading}
                >
                    {(isSubmitting || isLoading) ? <div className="flex items-center justify-center">
                        <CgSpinner size={24} className="animate-spin text-primary" />
                    </div> : "Create Task"}
                </Button>
            </div>
        </form>
    )
}

export default CreateTaskForm
