import axios from "axios"
import { serverUrl } from "../../constants"

interface DataProps {
    title: string,
    userId: string,
    type: string,
    color: string,
}

export const createFolder = async (values: DataProps, token: string) => {
    try {
        const { data } = await axios.post(`${serverUrl}/api/folders`, values, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return data
    } catch (err) {
        console.log(err);
    }
}