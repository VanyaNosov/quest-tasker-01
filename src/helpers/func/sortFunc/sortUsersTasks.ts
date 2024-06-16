import { TaskType } from "../../../../types";
import { priorityOrder, statusOrder } from "../../constants";

export const sortUserTasks = (userTasks: TaskType[] | undefined, isDesc: boolean, filterMethod: string) => {
    if (!userTasks) {
        return []
    }

    switch (filterMethod) {
        case "Due date":
            switch (isDesc) {
                case false:
                    return [...userTasks].sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
                case true:
                    return [...userTasks].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
            }
            break;
        case "Title":
            switch (isDesc) {
                case false: return [...userTasks].sort((a, b) => a.title.localeCompare(b.title))
                case true: return [...userTasks].sort((a, b) => b.title.localeCompare(a.title))
            }
            break;
        case "Status":
            switch (isDesc) {
                case false: return [...userTasks].sort((a, b) => {
                    const statusA = statusOrder[a.status] || Number.MAX_SAFE_INTEGER;
                    const statusB = statusOrder[b.status] || Number.MAX_SAFE_INTEGER;

                    return statusA - statusB;
                });
                case true: return [...userTasks].sort((a, b) => {
                    const statusA = statusOrder[a.status] || Number.MAX_SAFE_INTEGER;
                    const statusB = statusOrder[b.status] || Number.MAX_SAFE_INTEGER;

                    return statusB - statusA;
                });
            }
            break;
        case "Priority":
            switch (isDesc) {
                case false: return [...userTasks].sort((a, b) => {
                    const priorityA = priorityOrder[a.priority] || Number.MAX_SAFE_INTEGER;
                    const priorityB = priorityOrder[b.priority] || Number.MAX_SAFE_INTEGER;

                    return priorityA - priorityB;
                });
                case true: return [...userTasks].sort((a, b) => {
                    const priorityA = priorityOrder[a.priority] || Number.MAX_SAFE_INTEGER;
                    const priorityB = priorityOrder[b.priority] || Number.MAX_SAFE_INTEGER;

                    return priorityB - priorityA;
                });
            }
            break;
        default:
            return userTasks
    }
}