import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";
import { useGetUserFoldersQuery, useGetUserNoticesQuery, useGetUserTasksQuery } from "../store/services/getItems";
import { AiFillFolder, AiFillPlusCircle } from "react-icons/ai";
import TaskItem from "../components/TaskItem";
import { useDispatch } from "react-redux";
import { setIsCreateTaksModalOpen, setIsNoticeModalOpen } from "../store/slices/modalSlice";
import { setNotice } from "../store/slices/noticeSlice";
import { setTask } from "../store/slices/taskSlice";
import { CgMore } from "react-icons/cg";
import TasksChart from "../components/charts/TasksChart";
import DashboardLoader from "../components/loaders/DashboardLoader";
import TitleLoader from "../components/loaders/TitleLoader";
import ItemLoader from "../components/loaders/ItemLoader";
import EmptyDashboardState from "../components/EmptyDashboardState";
import { sortUserTasks } from "../helpers/func/sortFunc/sortUsersTasks";
import TableHeader from "../components/TableHeader";

const Dashboard = () => {
    const user = useAppSelector((state: RootState) => state.auth.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = user?._id ? user._id : ""
    const [filterMethod, setFilterMethod] = useState("")
    const [isDesc, setIsDesc] = useState(true)

    const { data: userTasks, isLoading: taskLoading } = useGetUserTasksQuery(userId)
    const { data: userNotices, isLoading: noticesLoading } = useGetUserNoticesQuery(userId)
    const { data: userFolders, isLoading: foldersLoading } = useGetUserFoldersQuery(userId)


    useEffect(() => {
        if (!user?.email) {
            return navigate("/login")
        }

        if (!noticesLoading && userNotices) {
            dispatch(setNotice(userNotices[0]))
        }

        if (!taskLoading && userTasks) {
            dispatch(setTask(userTasks[0]))
        }
    }, [dispatch, navigate, noticesLoading, taskLoading, user?.email, userNotices, userTasks])

    const isLoading = taskLoading || noticesLoading || foldersLoading;

    const sortedTasks = sortUserTasks(userTasks, isDesc, filterMethod)

    return (
        <div className="flex-1 flex flex-col">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8">
                {`Hello, ${user?.name.split(" ")[0]}`}!
            </h2>
            <div className="flex flex-col md:grid grid-cols-10 xl:flex xl:flex-row mb-8 gap-5">
                <div className="col-span-6 xl:basis-[40%]">
                    {(isLoading || !userTasks) ? (<div className="col-span-6 xl:basis-[40%]">
                        <DashboardLoader />
                    </div>) : <TasksChart
                        tasks={userTasks}
                    />}
                </div>
                {(isLoading || !userFolders) ? (<div className="col-span-4 xl:basis-[30%]">
                    <DashboardLoader />
                </div>)
                    : userFolders.length === 0
                        ? <div className="col-span-4 xl:basis-[30%] rounded-lg bg-white h-[260px] flex">
                            <EmptyDashboardState
                                title="You don't have folders yet"
                                onClick={() => navigate("/task-manager")}
                                linkTitle="Create first folder"
                                descr="Create a folder to group together the same type of tasks."
                            />
                        </div>
                        : <div className="rounded-lg bg-white drop-shadow-sm pt-3 pb-2 col-span-4 xl:basis-[30%]">
                            <div className="flex justify-between items-center px-3 mb-3">
                                <h6 className="text-primary font-semibold text-lg">
                                    Your folders
                                </h6>
                                <Link to="/task-manager" className="transition hover:scale-125">
                                    <CgMore size={20} className="text-primary" />
                                </Link>
                            </div>
                            <div className="flex flex-col max-h-[200px] overflow-y-auto scrollbar-w-2 scrollbar-track-yellow-lighter scrollbar-thumb-yellow scrollbar-thumb-rounded">
                                {userFolders?.map((folder) => (
                                    <Link
                                        to={`/task-manager/${folder._id}`}
                                        key={folder._id}
                                        className="flex items-center text-sm sm:text-base justify-between gap-2 py-2 px-3 border-b border-content cursor-pointer
                             transition hover:bg-gray"
                                    >
                                        <div className="flex items-center gap-2">
                                            <AiFillFolder color={folder.color} size={22} />
                                            <p className="text-primary font-semibold">
                                                {folder.title.length > 20 ? `${folder.title.slice(0, 17)}...` : folder.title}
                                            </p>
                                        </div>
                                        <p className="text-content/80">Tasks: {folder.tasks.length}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>}
                {(isLoading || !userNotices) ? (<div className="col-span-10 xl:basis-[30%]">
                    <DashboardLoader />
                </div>)
                    : userNotices.length === 0
                        ? (<div className="col-span-10 xl:basis-[30%] rounded-lg bg-white h-[260px] flex"><EmptyDashboardState
                            title="You don't have notices yet"
                            onClick={() => navigate("/notices")}
                            linkTitle="Create first notice"
                            descr="Create a note so you don't forget something important."
                        />
                        </div>)
                        : <div className="rounded-lg bg-white drop-shadow-sm pt-3 pb-2 col-span-10 xl:basis-[30%]">
                            <div className="flex justify-between items-center px-3 mb-3">
                                <h6 className="text-primary font-semibold text-lg">
                                    Your notices
                                </h6>
                                <Link to="/notices" className="transition hover:scale-125">
                                    <CgMore size={20} className="text-primary" />
                                </Link>
                            </div>
                            <div className="flex flex-col max-h-[200px] overflow-y-auto scrollbar-w-2 scrollbar-track-yellow-lighter scrollbar-thumb-yellow scrollbar-thumb-rounded">
                                {userNotices?.map((notice) => (
                                    <div
                                        key={notice._id}
                                        className="flex items-center text-sm sm:text-base gap-2 py-2 px-3 border-b border-content cursor-pointer
                             transition hover:bg-gray"
                                        onClick={() => {
                                            dispatch(setNotice(notice))
                                            dispatch(setIsNoticeModalOpen(true))
                                        }}
                                    >
                                        <p className="text-content/80">
                                            {notice.title.length > 36 ? `${notice.title.slice(0, 33)}...` : notice.title}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>}
            </div>
            <div className="flex flex-col flex-1">
                <h5 className='text-content mb-3'>
                    {(isLoading || !userTasks) ? <TitleLoader /> : `Tasks (${userTasks.length})`}
                </h5>
                <div className='bg-white rounded-t-lg pt-3 flex-1'>
                    <div className='flex justify-between gap-4 items-center px-4 pb-3'>
                        {(isLoading || !userTasks) ? (<TitleLoader />) : <h4 className="text-base sm:text-lg font-semibold text-primary">
                            My Tasks
                        </h4>}
                        <button onClick={() => dispatch(setIsCreateTaksModalOpen({ isOpen: true, folderId: null }))}
                            className='flex items-center gap-2 hover:bg-content/10 border-none py-1 px-2 rounded-lg text-sm transition'
                        >
                            <AiFillPlusCircle size={20} className="text-primary" />
                            <p className="hidden sm:block">New Task</p>
                        </button>
                    </div>
                    <div className='flex flex-col bg-white overflow-y-auto scrollbar-w-2 scrollbar-track-yellow-lighter scrollbar-thumb-yellow scrollbar-thumb-rounded'>
                        <TableHeader
                            setFilterMethod={setFilterMethod}
                            setIsDesc={setIsDesc}
                            isDesc={isDesc}
                        />
                        {(isLoading || !userTasks) ? (
                            [...new Array(5)].map((_, i) => (
                                <div key={i} className="mx-5 my-3">
                                    <ItemLoader />
                                </div>
                            ))
                        ) : sortedTasks.length === 0
                            ? <div className="flex h-[160px] mt-10 sm:mt-16">
                                <EmptyDashboardState
                                    title="You don't have tasks yet!"
                                    onClick={() => dispatch(setIsCreateTaksModalOpen({ isOpen: true, folderId: null }))}
                                    linkTitle='Create first task'
                                    descr="Create a task so you don't forget to do it."
                                />
                            </div>
                            : sortedTasks.map((task, i) => (
                                <TaskItem
                                    key={task._id}
                                    task={task}
                                    i={i}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Dashboard
