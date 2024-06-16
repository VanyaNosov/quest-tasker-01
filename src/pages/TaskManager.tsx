import { AiFillPlusCircle } from "react-icons/ai";
import Button from "../components/ui/Button"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { setIsCreateFolderModalOpen } from "../store/slices/modalSlice";
import EmptyState from "../components/EmptyState";
import { useGetUserFoldersQuery } from "../store/services/getItems";
import { RootState } from "../store/store";
import Folder from "../components/Folder";
import FolderLoader from "../components/loaders/FolderLoader";

const TaskManager = () => {
  const user = useAppSelector((state: RootState) => state.auth.user)
  const dispatch = useAppDispatch();
  const userId = user?._id ? user._id : ""
  const { data: folders, isLoading } = useGetUserFoldersQuery(userId)


  return (
    <>
      <div className='flex items-center justify-between mb-5 md:mb-8'>
        <h2 className='text-2xl md:text-3xl font-bold'>Task Manager</h2>
        <Button
          bgColor='bg-transparent'
          color='text-primary'
          className='flex items-center gap-2 hover:bg-content/10 border-none py-1 px-2 rounded-lg'
          onClick={() => dispatch(setIsCreateFolderModalOpen(true))}
        >
          <AiFillPlusCircle size={24} className="text-primary" />
          <p className="hidden sm:block">Add new folder</p>
        </Button>
      </div>
      {isLoading
        ? (<div className="flex items-center gap-5 flex-wrap">
          {[...new Array(4)].map((_, i) => (
            <FolderLoader key={i} />
          ))}
        </div>
        )
        : (folders?.length !== 0 && folders) ? (<div className="flex items-center gap-5 flex-wrap">
          {folders.map((folder) => (
            <Folder
              key={folder._id}
              folder={folder}
            />
          ))}
        </div>) : (
          <EmptyState
            title="This folder is empty"
            buttonText="Add new folder"
            onClick={() => dispatch(setIsCreateFolderModalOpen(true))}
          />
        )}
    </>
  )
}

export default TaskManager
