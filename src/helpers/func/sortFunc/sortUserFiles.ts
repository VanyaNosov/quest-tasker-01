import { FileType } from "../../../../types";

export const sortUserFiles = (userFiles: FileType[] | undefined, isDesc: boolean, filterMethod: string) => {
    if (!userFiles) {
        return []
    }

    switch (filterMethod) {
        case "Uploaded At":
            switch (isDesc) {
                case false:
                    return [...userFiles].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                case true:
                    return [...userFiles].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            }
            break;
        case "Title":
            switch (isDesc) {
                case false: return [...userFiles].sort((a, b) => a.title.localeCompare(b.title))
                case true: return [...userFiles].sort((a, b) => b.title.localeCompare(a.title))
            }
            break;
        default:
            return userFiles
    }
}