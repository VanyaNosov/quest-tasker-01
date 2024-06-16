import axios from "axios";
import { serverUrl } from "../../constants";

export interface DataProps {
    title: string,
    description: string,
    priority: string,
    status: string,
    subTasks: {
        title: string,
        status: string,
    }[],
    images: string[]
}

export const updateTask = async (values: DataProps, token: string, userId: string, id: string) => {
    try {
        const { data } = await axios.patch(`${serverUrl}/api/tasks/${id}?userId=${userId}`, values, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return data
    } catch (err) {
        console.log(err);
    }
}