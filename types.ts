export interface CreatedUser {
    phone: string,
    name: string,
    email: string,
    password: string
}

export interface User {
    _id: string,
    phone: string,
    name: string,
    email: string,
    token: string,
    description: string,
    status: string,
    profession: string
}

export interface LoginUser {
    password: string
    email: string
}

export interface Notice {
    _id: string
    title: string
    description: string
    images: string[]
    createdAt: Date
    updatedAt: Date
}

export interface FileType {
    _id: string
    title: string
    file: string
    createdAt: Date
    updatedAt: Date
}

export interface SubTaskType {
    title: string,
    status: string,
    _id?: string
}

export interface TaskType {
    _id: string,
    email?: string
    folderId: string
    images: string[]
    title: string,
    description: string
    status: string,
    priority: string
    dueDate: string
    subTasks: SubTaskType[]
    createdAt: Date
    updatedAt: Date
}

export interface FolderType {
    _id: string,
    title: string,
    type: string,
    color: string,
    tasks: TaskType[],
    isFavourite: boolean,
    createdAt: Date,
    updatedAt: Date
}

export interface SearchedItems {
    folders: FolderType[]
    notices: Notice[]
    tasks: TaskType[]
    files: FileType[]
}