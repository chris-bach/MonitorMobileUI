import axios from "axios";
import {MONITOR_URL} from "../constants/MonitorConstants";

export const getJobsByUserId = async (userId) => {
    return await axios.get(`${MONITOR_URL}/api/jobDTO/getJobsByUserId/value=${userId}`)
}

export const getJobsDetailsByJobId = async (id, userId) => {
    return await axios.get(`${MONITOR_URL}/api/jobDTO/getJobsDetailsByJobId/value=${id}/value=${userId}`)
}
