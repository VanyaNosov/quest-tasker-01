import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useGetFavouriteFoldersQuery, useGetUserFolderQuery } from "../store/services/getItems";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";
import Button from "../components/ui/Button";
import { AiFillFolderOpen, AiFillPlusCircle, AiFillStar, AiOutlineDelete, AiOutlineStar } from "react-icons/ai";
import { setIsCreateTaksModalOpen, setIsDeleteFolderModalOpen } from "../store/slices/modalSlice";
import TaskItem from "../components/TaskItem";
import { setTask } from "../store/slices/taskSlice";
import toast from "react-hot-toast";
import { updateFolderFavouriteStatus } from "../helpers/func/updateItems/updateFolderFavouriteStatus";
import { CgSpinner } from "react-icons/cg";
import TitleLoader from "../components/loaders/TitleLoader";
import ItemLoader from "../components/loaders/ItemLoader";
import UserFolder from "../components/loaders/UserFolder";
import { sortUserTasks } from "../helpers/func/sortFunc/sortUsersTasks";
import TableHeader from "../components/TableHeader";



const FolderPage = () => {
    const { folderId } = useParams();
    const user = useAppSelector((state: RootState) => state.auth.user)
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [loading, setIsLoading] = useState(false)
    const userId = user?._id ? user._id : ""
    const [filterMethod, setFilterMethod] = useState("")
    const [isDesc, setIsDesc] = useState(true)

    const { data: folder, isLoading, error, refetch } = useGetUserFolderQuery({
        userId,
        folderId: folderId ? folderId : ""
    })

    const { refetch: refetchSidebar } = useGetFavouriteFoldersQuery(userId)


    useEffect(() => {
        if (!user) {
            return navigate("/login")
        }

        if (!isLoading && folder) {
            dispatch(setTask(folder.tasks[0]))
        }

        if (error) {
            navigate("/task-manager")
            return
        }
    }, [dispatch, error, folder, isLoading, navigate, user])

    const addOrRemoveFavouriteFolder = async (folderId: string | undefined) => {
        if (!folderId || !user) {
            return
        }

        try {
            setIsLoading(true)
            const res = await updateFolderFavouriteStatus(folderId, user.token, user._id)
            if (res?.message === "Folder status updated successfully") {
                toast.success(res.message)
                refetch();
                refetchSidebar();
            } else {
                toast.error("Something went wrong! Try again.")
            }
        } catch (err) {
            console.log(err);
            toast.error("Internal Server Error")
        } finally {
            setIsLoading(false)
        }
    }

    const sortedTasks = sortUserTasks(folder?.tasks, isDesc, filterMethod)

    return (
        <>
            <div className="flex items-center gap-1 mb-4">
                <Link to="/task-manager" className="text-content duration-200 hover:text-content/70 transition">
                    Task Manager
                </Link>
                <p className="text-content">
                    /
                </p>
                {(isLoading || !folder)
                    ? <TitleLoader />
                    : < p className="text-primary">
                        {folder.title}
                    </p>
                }
            </div >
            <div className="flex items-start justify-between mb-5 sm:mb-10">
                {(isLoading || !folder) ? (<UserFolder />)
                    : <div className="flex items-center gap-3">
                        <div
                            className="flex items-center justify-center w-14 h-14 rounded-xl"
                            style={{ background: folder.color }}
                        >
                            <AiFillFolderOpen size={40} className="text-primary" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h2 className="text-primary font-semibold text-2xl leading-7">
                                    {folder.title}
                                </h2>
                                {loading ? (<CgSpinner className="animate-spin" size={20} />) : <button
                                    className="hover:scale-125 transition"
                                    onClick={() => addOrRemoveFavouriteFolder(folderId)}
                                >
                                    {folder.isFavourite
                                        ? <AiFillStar
                                            size={20}
                                            className="text-yellow-400"
                                        />
                                        : <AiOutlineStar
                                            size={20}
                                            className="text-primary"
                                        />}
                                </button>}
                            </div>
                            <div className="flex text-sm gap-1 text-content">
                                <p>{user?.name}</p>
                                <p>|</p>
                                <p>{folder.tasks.length} tasks</p>
                            </div>
                        </div>
                    </div>}
                <Button
                    bgColor='bg-transparent'
                    color='text-primary'
                    className='flex items-center gap-2 hover:bg-content/10 border-none py-1 px-2 rounded-lg'
                    onClick={() => dispatch(setIsDeleteFolderModalOpen({isOpen: true, folderId}))}
                >
                    <AiOutlineDelete size={24} className="text-primary" />
                    <p className="hidden sm:block">Delete Folder</p>
                </Button>
            </div>
            <div className="flex-1 flex flex-col">
                {(isLoading || !folder)
                    ? <div className="mb-3"><TitleLoader /></div>
                    : <h5 className='text-content mb-3'>
                        Tasks ({folder.tasks.length})
                    </h5>
                }
                <div className='bg-white rounded-t-lg pt-3 flex-1'>
                    <div className='flex justify-between gap-4 items-center px-4 pb-3'>
                        {(isLoading || !folder)
                            ? <TitleLoader />
                            : <h4 className="text-base sm:text-lg font-semibold text-primary">
                                My Tasks
                            </h4>
                        }
                        <Button
                            bgColor='bg-transparent'
                            color='text-primary'
                            className='flex ml-auto items-center gap-2 hover:bg-content/10 border-none py-1 px-2 rounded-lg text-sm'
                            onClick={() => dispatch(setIsCreateTaksModalOpen({ isOpen: true, folderId }))}
                        >
                            <AiFillPlusCircle size={20} className="text-primary" />
                            <p className="hidden sm:block">New Task</p>
                        </Button>
                    </div>
                    <div className='flex flex-col bg-white overflow-y-auto scrollbar-w-2 scrollbar-track-yellow-lighter scrollbar-thumb-yellow scrollbar-thumb-rounded'>
                        <TableHeader
                            setFilterMethod={setFilterMethod}
                            setIsDesc={setIsDesc}
                            isDesc={isDesc}
                        />
                        {(isLoading || !folder)
                            ? [...new Array(5)].map((_, i) => (
                                <div className="mx-5 my-3" key={i}>
                                    <ItemLoader />
                                </div>
                            ))
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
        </>
    )
}

export default FolderPage
