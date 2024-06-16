import axios from "axios";
import { serverUrl } from "../../constants";

export const updateFolderFavouriteStatus = async (id: string, token: string, userId: string) => {
    try {
        const { data } = await axios.patch(`${serverUrl}/api/folders/status/${id}?userId=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return data
    } catch (err) {
        console.log(err);
    }
}