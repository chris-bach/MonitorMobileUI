import axios from "axios";
import {MONITOR_URL} from "../constants/MonitorConstants";

export const updateUser = async (data) => {
    return await axios.put(`${MONITOR_URL}/api/user/update`, {data})
}

export const login = async (data) => {
    console.log ("Data from service", data)
    return await axios.post(`${MONITOR_URL}/api/login`, {data})
}
