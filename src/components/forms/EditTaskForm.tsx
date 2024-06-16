import { Dispatch, FC, SetStateAction, useState } from 'react'
import { TaskType, User } from '../../../types'
import { PiArrowsSplitFill, PiFlowerTulipBold } from 'react-icons/pi'
import { BiTrash, BiUser } from 'react-icons/bi'
import { ImCalendar } from 'react-icons/im'
import { BsBodyText, BsGraphUpArrow } from 'react-icons/bs'
import { RiAttachment2 } from 'react-icons/ri'
import { getStatusColor } from '../../helpers/getStatusColor'
import { useForm, SubmitHandler } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { AiOutlineCheckSquare, AiOutlineEdit } from 'react-icons/ai'
import DatePicker from "react-datepicker"
import moment from 'moment'
import Button from '../ui/Button'
import { priorityArray } from '../../helpers/constants'
import StatusPicker from '../StatusPicker'
import UploadTaskImages from './UploadTaskImages'
import { RxUpdate } from 'react-icons/rx'
import { CgMoveTask, CgSpinner } from 'react-icons/cg'
import { useGetUserFolderQuery, useGetUserFoldersQuery, useGetUserTasksQuery } from '../../store/services/getItems'
import toast from 'react-hot-toast'
import { useAppDispatch } from '../../store/hooks'
import { updateTask } from '../../helpers/func/updateItems/updateTask'
import { onClose } from '../../store/slices/modalSlice'
import { setTask } from '../../store/slices/taskSlice'

interface EditTaskFormProps {
    status: string
    task: TaskType
    user: User | null
    setEditMode: Dispatch<SetStateAction<boolean>>
}

const EditTaskSchema = z.object({
    title: z.string().min(2, {
        message: "Name must be more than 1 letter"
    }),
    description: z.string().min(2, {
        message: "Descr must be more than 1 letter"
    }),
})

type FormValues = z.infer<typeof EditTaskSchema>

const EditTaskForm: FC<EditTaskFormProps> = ({ status, task, user, setEditMode }) => {
    const [selectedDate, setSelectedDate] = useState<string | null>(moment(task.dueDate).format('YYYY-MM-DD HH:mm'));
    const [priority, setPriority] = useState(task.priority)
    const [isPriorityOpen, setIsPriorityOpen] = useState(false)
    const [images, setImages] = useState(task.images)
    const [isLoading, setIsLoading] = useState(false)
    const [subtask, setSubtask] = useState("")
    const [subtasks, setSubtasks] = useState(task.subTasks)

    const dispatch = useAppDispatch()

    const userId = user?._id ? user._id : ""

    const { refetch } = useGetUserFolderQuery({
        userId,
        folderId: task.folderId
    })
    const { refetch: refetchUserTasks } = useGetUserTasksQuery(userId)
    const { refetch: refetchUserFolders } = useGetUserFoldersQuery(userId)

    const { register, handleSubmit,
        formState: { isSubmitting, isValid }
    } = useForm<FormValues>({
        resolver: zodResolver(EditTaskSchema), defaultValues: {
            title: task.title,
            description: task.description
        }
    })

    const addSubtask = () => {
        setSubtasks((current) => [...current, { title: subtask, status: "In progress" }])
        setSubtask("")
    }

    const handleSubtaskDone = (subtaskTitle: string) => {
        const updatedSubtasks = subtasks.map((subtask) =>
            subtask.title === subtaskTitle ? { ...subtask, status: "Done" } : subtask
        );

        setSubtasks(updatedSubtasks);
    };

    const deleteSubtasks = (task: string) => {
        const filteredSubtasks = subtasks.filter((subtask) => subtask.title !== task)
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

        const data = {
            title: values.title,
            description: values.description,
            priority,
            images,
            status,
            subTasks: subtasks,
            dueDate: selectedDate,
        }

        try {
            const res = await updateTask(data, user.token, userId, task._id)

            if (res?.message === "Task updated successfully") {
                toast.success(res?.message)
                refetch();
                refetchUserFolders();
                refetchUserTasks();
                setEditMode(false)
                dispatch(onClose())
                dispatch(setTask(null))
                if(task.folderId !== "Dashboard") {
                    refetch();
                }
            } else {
                toast.error("Something went wrong! Try again.")
            }
        } catch (err) {
            toast.error("Internal server error")
            console.log(err);
        }

    }

    return (
        <form className='w-full flex flex-col flex-1' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex-1'>
                <div className="px-4 sm:px-8">
                    <div className="flex items-center gap-2 sm:gap-4 mb-5">
                        <div className="min-w-[40px] w-10 h-10 flex items-center justify-center rounded-xl bg-sky-500">
                            <AiOutlineEdit size={26} className="text-black" />
                        </div>
                        <input
                            type="text"
                            placeholder="Type task title ..."
                            className="w-full p-2 bg-gray rounded-lg border-r border-content focus:outline-none text-xl sm:text-2xl placeholder:text-content"
                            {...register("title")}
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-5 sm:mb-10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-yellow-400">
                                <PiFlowerTulipBold size={26} className="text-black" />
                            </div>
                            <div>
                                <p className="text-content text-sm leading-4">
                                    Location
                                </p>
                                <p className="text-primary font-semibold">
                                    In folder
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
                            <div className='w-[140px]'>
                                <p className="text-content text-sm text-left">
                                    Due date
                                </p>
                                <DatePicker
                                    selected={selectedDate ? moment(selectedDate, 'YYYY-MM-DD HH:mm').toDate() : null}
                                    onChange={handleDateChange}
                                    showTimeSelect
                                    minDate={new Date()}
                                    minTime={moment().toDate()}
                                    maxTime={moment().endOf('day').toDate()}
                                    timeFormat="HH:mm"
                                    timeIntervals={60}
                                    dateFormat="yyyy-MM-dd HH:mm"
                                    className={`w-full hover:bg-gray transition border border-dashed px-2 py-1 rounded-xl border-primary outline-none focus:outline-none cursor-pointer text-sm text-primary`}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 sm:gap-[70px] mb-2 sm:mb-4">
                        <div className="flex items-center gap-2">
                            <BsGraphUpArrow size={16} className="text-content" />
                            <p className="text-content">Priority</p>
                        </div>
                        <StatusPicker
                            status={priority}
                            setStatus={setPriority}
                            isStatusOpen={isPriorityOpen}
                            setIsStatusOpen={setIsPriorityOpen}
                            statusArray={priorityArray}
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-10 mb-3 sm:mb-5">
                        <div className="flex items-center gap-2">
                            <BsBodyText size={16} className="text-content" />
                            <p className="text-content">Description</p>
                        </div>
                        <textarea
                            placeholder="Type task description..."
                            className="p-2 bg-gray rounded-lg border-r border-content focus:outline-none h-20 resize-none w-full"
                            {...register("description")}
                        />
                    </div>
                </div>
                {subtasks.length > 0 ?
                    <div className="bg-gray px-4 sm:px-8 py-4 mb-3">
                        <div className="flex items-center gap-3 mb-4">
                            <PiArrowsSplitFill size={20} className="text-content -rotate-90" />
                            <p className="text-content">Sub-tasks</p>
                        </div>
                        <div className="flex flex-col gap-2 sm:gap-4 mb-2 sm:mb-4">
                            {subtasks.map((subtaks, i) => (
                                <div className="bg-white rounded-xl p-2 px-2 sm:px-3 pl-2 sm:pl-4" key={i}>
                                    <div className="flex gap-2 sm:gap-4 justify-between items-center">
                                        <p className="text-primary text-sm leading-4 sm:text-base sm:leading-5">
                                            {subtaks.title}
                                        </p>
                                        <div className='flex gap-3 items-center'>
                                            <button
                                                className='flex items-center justify-center gap-1.5 transition hover:bg-green-300 bg-green-400 text-white px-2 py-1 rounded-xl border-none disabled:bg-green-100 disabled:cursor-not-allowed'
                                                disabled={subtaks.status === "Done"}
                                                onClick={() => handleSubtaskDone(subtaks.title)}
                                                type='button'
                                            >
                                                <AiOutlineCheckSquare size={20} className="text-white" />
                                                <p className='hidden sm:block'>Check</p>
                                            </button>
                                            <div className="flex items-center gap-2">
                                                <div className={`w-3 h-3 rounded-full ${getStatusColor(subtaks.status)}`} />
                                                <p className="text-primary hidden sm:block text-sm font-bold whitespace-nowrap">
                                                    {subtaks.status}
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                className="hover:scale-110 transition"
                                                onClick={() => deleteSubtasks(subtaks.title)}
                                            >
                                                <BiTrash size={20} color="red" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
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
                    </div> : <div className="bg-gray px-4 sm:px-8 py-4 mb-3">
                        <h2 className='text-primary mb-2'>
                            Create subtasks(optional)
                        </h2>
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
                    </div>}
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
            </div>
            <div className='px-4 sm:px-8'>
                <Button
                    disabled={isSubmitting || !isValid || isLoading}
                    bgColor="bg-sky-500"
                    color="text-white"
                    type="submit"
                    className="w-full rounded-xl hover:bg-sky-400 flex items-center gap-2 border-none justify-center font-semibold"
                >
                    {(isSubmitting || isLoading) ? <div className="flex items-center justify-center">
                        <CgSpinner size={24} className="animate-spin text-white" />
                    </div> : <>
                        <RxUpdate size={20} className="text-white" />
                        <p>Update Task</p>
                    </>}
                </Button>
            </div>
        </form>)
}

export default EditTaskForm