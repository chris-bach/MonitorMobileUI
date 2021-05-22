import axios from "axios";
import {MONITOR_URL} from "../constants/MonitorConstants";

/**
 * @author Matthew Belgre
 * @param id the ID of the equipmentMonitor being searched
 * @return {Promise<AxiosResponse<any>>}The status of the equipment monitor associated with "id"
 */
export const getNotificationsByUserId = async (userId) => {
    return await axios.get(`${MONITOR_URL}/api/notification/getNotification/byUserId/value=${userId}`)
}

/**
 * @author Matthew Belgre
 * @param notificationId the ID of the notification being updated
 * @return {Promise<AxiosResponse<any>>} An acknowledgement that the notification with the corresponding ID has been marked as read
 */
export const markNotificationAsRead = async (notificationId) => {
    return await axios.put(`${MONITOR_URL}/api/notification/mark/read/value=${notificationId}`)
}
