import axios from "axios"
import { serverUrl } from "../../constants"

interface UpdateUserProps {
    name: string,
    phone: string,
    description: string,
    profession: string,
    status: string
}

export const updateUser = async (values: UpdateUserProps, id: string, token: string) => {
    try {
        const {data} = await axios.patch(`${serverUrl}/api/users/${id}`, values, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return data
    } catch (err) {
        console.log(err);
    }
}