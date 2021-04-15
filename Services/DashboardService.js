import axios from 'axios';
import {MONITOR_URL} from "../constants/MonitorConstants";

export const getMonthlyBreakdowns = async (userId) => {
    return await axios.get(`${MONITOR_URL}/api/login/getMonthlyBreakdowns/value=${userId}`)
}

export const getBreakdownsPerBuilding = async (userId) => {
    return await axios.get(`${MONITOR_URL}/api/login/getBreakdownsPerBuilding/value=${userId}`)
}
