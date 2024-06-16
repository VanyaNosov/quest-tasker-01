import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogoutModalOpen: false,
    isProfileModalOpen: false,
    isCreateNoticeModalOpen: false,
    isNoticeModalOpen: false,
    isCreateFolderModalOpen: false,
    isCreateTaskModalOpen: false,
    isTaskModalOpen: false,
    isDeleteFolderModalOpen: false,
    isCreateFileModalOpen: false,
    isDeleteFileModalOpen: false,
    isSidebarModalOpen: false,
    fileId: "",
    folderId: "",
    deleteFolderId: ""
}

const modalSlice = createSlice({
    name: "modalSlice",
    initialState,
    reducers: {
        setIsLogoutModalOpen: (state, action) => {
            state.isLogoutModalOpen = action.payload
        },
        setIsProfileModalOpen: (state, action) => {
            state.isProfileModalOpen = action.payload
        },
        setIsCreateNoticeModalOpen: (state, action) => {
            state.isCreateNoticeModalOpen = action.payload
        },
        setIsNoticeModalOpen: (state, action) => {
            state.isNoticeModalOpen = action.payload
        },
        setIsCreateFolderModalOpen: (state, action) => {
            state.isCreateFolderModalOpen = action.payload
        },
        setIsCreateTaksModalOpen: (state, action) => {
            state.isCreateTaskModalOpen = action.payload.isOpen
            state.folderId = action.payload.folderId
        },
        setIsTaskModalOpen: (state, action) => {
            state.isTaskModalOpen = action.payload
        },
        setIsDeleteFolderModalOpen: (state, action) => {
            state.isDeleteFolderModalOpen = action.payload.isOpen
            state.deleteFolderId = action.payload.folderId
        },
        setIsCreateFileModalOpen: (state, action) => {
            state.isCreateFileModalOpen = action.payload
        },
        setIsDeleteFileModalOpen: (state, action) => {
            state.isDeleteFileModalOpen = action.payload.isOpen
            state.fileId = action.payload.fileId
        },
        setIsSidebarModalOpen: (state, action) => {
            state.isSidebarModalOpen = action.payload
        },
        onClose: (state) => {
            state.isCreateFileModalOpen = false
            state.isDeleteFolderModalOpen = false
            state.isTaskModalOpen = false
            state.isCreateTaskModalOpen = false
            state.isCreateFolderModalOpen = false
            state.isNoticeModalOpen = false
            state.isCreateNoticeModalOpen = false
            state.isLogoutModalOpen = false
            state.isProfileModalOpen = false
            state.isDeleteFileModalOpen = false
            state.isSidebarModalOpen = false
        }
    }
})

export const {
    setIsLogoutModalOpen, setIsProfileModalOpen,
    setIsCreateNoticeModalOpen, setIsNoticeModalOpen, setIsCreateFolderModalOpen,
    setIsCreateTaksModalOpen, setIsTaskModalOpen, setIsDeleteFolderModalOpen,
    setIsCreateFileModalOpen, onClose,
    setIsDeleteFileModalOpen, setIsSidebarModalOpen
} = modalSlice.actions

export default modalSlice.reducer