import axios from "axios"
import { serverUrl } from "../../constants"

export const deleteTaskInFolder = async (id: string, token: string, userId: string) => {
    const { data } = await axios.delete(`${serverUrl}/api/tasks/${id}?userId=${userId}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return data
}