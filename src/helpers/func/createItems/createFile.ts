import axios from "axios"
import { serverUrl } from "../../constants"

interface DataProps {
    file: string,
    title: string,
    userId: string
}

export const createFile = async (values: DataProps, token: string) => {
    try {
        const { data } = await axios.post(`${serverUrl}/api/files`, values, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return data
    } catch (err) {
        console.log(err);
    }
}