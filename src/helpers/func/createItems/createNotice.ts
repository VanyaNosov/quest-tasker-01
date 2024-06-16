import axios from "axios"
import { serverUrl } from "../../constants"

interface DataProps {
    description: string,
    images?: string[],
    title: string,
    userId: string
}

export const createNotice = async (values: DataProps, token: string) => {
    try {
        const { data } = await axios.post(`${serverUrl}/api/notices`, values, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return data
    } catch (err) {
        console.log(err);
    }
}