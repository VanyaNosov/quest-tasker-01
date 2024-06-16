import axios from "axios"
import { serverUrl } from "../../constants"

export const deleteFolder = async (id: string, token: string, userId: string) => {
    const { data } = await axios.delete(`${serverUrl}/api/folders/${id}?userId=${userId}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return data
}