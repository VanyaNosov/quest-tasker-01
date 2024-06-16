import { FC } from 'react'
import { TaskType } from '../../types'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { RootState } from '../store/store'
import { getStatusColor } from '../helpers/getStatusColor'
import { FaEdit } from "react-icons/fa"
import moment from 'moment'
import { AiOutlineDelete } from 'react-icons/ai'
import { PiArrowsSplitFill } from 'react-icons/pi'
import { setTask } from '../store/slices/taskSlice'
import { setIsTaskModalOpen } from '../store/slices/modalSlice'

interface TaskItemProps {
    task: TaskType
    i: number
}

const TaskItem: FC<TaskItemProps> = ({ task, i }) => {
    const user = useAppSelector((state: RootState) => state.auth.user)
    const dispatch = useAppDispatch();

    const doneSubTasks = Math.round((task.subTasks.filter((task) => task.status === "Done").length / task.subTasks.length) * 100)

    const dueDate = moment(task.dueDate).startOf('hour').fromNow().includes("ago")
        ? "Overdue"
        : moment(task.dueDate).startOf('hour').fromNow()

    const onTaskClick = () => {
        dispatch(setTask(task))
        dispatch(setIsTaskModalOpen(true))
    }

    return (
        <div
            className={`flex items-center px-5 py-3 cursor-pointer border-b ${i === 0 && "border-t"} border-content/70 duration-200 transition hover:bg-content/10`}
            onClick={onTaskClick}
        >
            <div className='basis-[95%] sm:basis-[60%] xl:basis-5/12'>
                <div className='flex gap-3'>
                    <div className='min-w-[24px] w-6 h-6 bg-primary text-sm sm:text-base flex items-center justify-center rounded-full'>
                        <p className='text-white'>{user?.name[0]}</p>
                    </div>
                    <h6 className='text-primary font-semibold text-sm sm:text-base'>
                        {task.title.length > 50 ? `${task.title.slice(0, 47)}...` : task.title}
                    </h6>
                </div>
                {task.subTasks && task.subTasks.length > 0 ? (
                    <div className='flex items-center gap-2 ml-9 mr-20 mt-1'>
                        <div className="flex items-center gap-1">
                            <p className='text-primary text-sm font-bold'>
                                {task.subTasks.length}
                            </p>
                            <PiArrowsSplitFill size={16} className="text-content -rotate-90" />
                        </div>
                        <div className='relative flex-1'>
                            <div className={`w-full h-1 rounded-xl bg-content/10`} />
                            <div
                                className={`absolute top-0 left-0 rounded-xl h-1 bg-primary z-10`}
                                style={{ width: `${doneSubTasks}%` }}
                            />
                        </div>
                        <p className='text-content/80 text-sm'>
                            {doneSubTasks}% <span className='hidden md:inline-block'>Completed</span>
                        </p>
                    </div>
                ) : null}
            </div>
            <div className='gap-2 flex items-center basis-[5%] sm:basis-[20%] xl:basis-2/12'>
                <div className={`${getStatusColor(task.status)} w-3 h-3 rounded-full`} />
                <p className='text-primary font-semibold text-sm hidden sm:block'>
                    {task.status}
                </p>
            </div>
            <div className='hidden xl:block basis-2/12'>
                <p className={`py-0.5 px-2 rounded-xl ${getStatusColor(task.priority)} w-fit text-sm font-semibold text-primary`}>
                    {task.priority}
                </p>
            </div>
            <div className='text-right xl:text-left hidden sm:block basis-[20%] xl:basis-2/12'>
                <p className='text-primary font-semibold text-sm leading-4'>
                    {moment(task.dueDate).format("MMM Do")}
                </p>
                <p className={`${task.status === "Done"
                    ? "text-green-400" : dueDate === "Overdue" ? "text-red-400"
                        : "text-content"} text-sm`
                }>
                    {task.status === "Done" ? "Done" : dueDate}
                </p>
            </div>
            <div className='hidden xl:flex items-center gap-3 ml-auto'>
                <FaEdit className="text-sky-500" size={24} />
                <AiOutlineDelete className="text-rose-500" size={24} />
            </div>
        </div>
    )
}

export default TaskItem