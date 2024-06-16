import { Notice } from "../../../../types";

export const sortUserNotices = (userNotices: Notice[] | undefined, isDesc: boolean, filterMethod: string) => {
    if (!userNotices) {
        return []
    }

    switch (filterMethod) {
        case "Created At":
            switch (isDesc) {
                case false:
                    return [...userNotices].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                case true:
                    return [...userNotices].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            }
            break;
        case "Title":
            switch (isDesc) {
                case false: return [...userNotices].sort((a, b) => a.title.localeCompare(b.title))
                case true: return [...userNotices].sort((a, b) => b.title.localeCompare(a.title))
            }
            break;
        default:
            return userNotices
    }
}