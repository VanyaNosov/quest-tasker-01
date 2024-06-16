import axios from "axios"
import { serverUrl } from "../../constants"

export interface DataProps {
    title: string,
    description: string,
    priority: string,
    status: string,
    subTasks: {
        title: string,
        status: string,
    }[],
    userId: string,
    dueDate: string | null
    folderId: string
    images: string[]
}

export const createTaskInFolder = async (values: DataProps, token: string) => {
    try {
        const { data } = await axios.post(`${serverUrl}/api/tasks?userId=${values.userId}`, values, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return data
    } catch (err) {
        console.log(err);
    }
}