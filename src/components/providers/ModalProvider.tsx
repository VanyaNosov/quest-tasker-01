import CreateFileModal from "../modals/CreateFileModal"
import CreateFolderModal from "../modals/CreateFolderModal"
import CreateNoticeModal from "../modals/CreateNoticeModal"
import CreateTaskModal from "../modals/CreateTaskModal"
import DeleteFileModal from "../modals/DeleteFileModal"
import DeleteFolderModal from "../modals/DeleteFolderModal"
import LogOutModal from "../modals/LogOutModal"
import NoticeModal from "../modals/NoticeModal"
import SidebarModal from "../modals/SidebarModal"
import TaskModal from "../modals/TaskModal"
import UserProfileModal from "../modals/UserProfileModal"


const ModalProvider = () => {
    return (
        <>
            <LogOutModal />
            <UserProfileModal />
            <CreateNoticeModal />
            <NoticeModal />
            <CreateFolderModal />
            <CreateTaskModal />
            <TaskModal />
            <DeleteFolderModal />
            <CreateFileModal />
            <DeleteFileModal />
            <SidebarModal />
        </>
    )
}

export default ModalProvider
