import axios from "axios";
import {MONITOR_URL} from "../constants/MonitorConstants";

export const getNotificationsByUserId = async (userId) => {
    return await axios.get(`${MONITOR_URL}/api/notification/getNotification/byUserId/value=${userId}`)
}

export const markNotificationAsRead = async (notificationId) => {
    return await axios.put(`${MONITOR_URL}/api/notification/mark/read/value=${notificationId}`)
}
