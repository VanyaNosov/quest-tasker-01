import { FC } from 'react'
import { TaskType } from '../../../types'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'
import { statusTaskArray } from '../../helpers/constants'
import { getStatusColor } from '../../helpers/getStatusColor'
import EmptyDashboardState from '../EmptyDashboardState'
import { useAppDispatch } from '../../store/hooks'
import { setIsCreateTaksModalOpen } from '../../store/slices/modalSlice'

interface TasksChartProps {
    tasks: TaskType[]
}

ChartJS.register(ArcElement, Tooltip);

const TasksChart: FC<TasksChartProps> = ({ tasks }) => {
    const statusTasks = tasks.map((task) => ({ status: task.status }))
    const dispatch = useAppDispatch();

    const countByStatus = statusTasks.reduce((acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const numberStatusObject = {
        "Open": countByStatus["Open"],
        "Done": countByStatus["Done"],
        "In progress": countByStatus["In progress"],
    }

    const data = {
        labels: Object.keys(numberStatusObject),
        datasets: [
            {
                data: Object.values(numberStatusObject),
                backgroundColor: ['rgb(125 211 252)', 'rgb(74 222 128)', 'rgb(3 105 161)'],
                hoverBackgroundColor: ['rgb(125 211 252)', 'rgb(74 222 128)', 'rgb(3 105 161)'],
            },
        ],
    };


    return (
        <div className='sm:h-[260px] rounded-lg bg-white drop-shadow-sm pt-3 pb-2 px-3 flex items-center md:items-start gap-4 justify-center md:justify-normal xl:gap-10'>
            {tasks.length === 0
                ?
                <div className='sm:h-[260px] flex items-center justify-center w-full'>
                    <EmptyDashboardState
                    title="You don't have tasks yet!"
                    onClick={() => dispatch(setIsCreateTaksModalOpen({isOpen: true, folderId: null}))}
                    linkTitle='Create first task'
                    descr="Create a task so you don't forget to do it."
                />
                </div> : <>
                    <div className='flex flex-col gap-2 sm:gap-4 basis-2/6'>
                        <h5 className='text-primary text-lg font-semibold whitespace-nowrap'>
                            Task status
                        </h5>
                        {statusTaskArray.map((status) => (
                            <div key={status} className='flex gap-3 md:block'>
                                <div className='flex items-center gap-2'>
                                    <div className={`w-4 h-4 rounded-full ${getStatusColor(status)}`} />
                                    <p className='whitespace-nowrap'>{status} ({countByStatus[status] || 0}) </p>
                                </div>
                                <p className='hidden sm:block'>{Math.round((countByStatus[status] / tasks.length) * 100) || 0}%</p>
                            </div>
                        ))}
                    </div>
                    <div className='w-40 h-40 sm:w-60 sm:h-60'>
                        <Doughnut
                            data={data}
                        />
                    </div>
                </>
            }
        </div>
    )
}

export default TasksChart