import axios from "axios";
import {MONITOR_URL} from "../constants/MonitorConstants";

/**
 * @author Matthew Belgre and Manik Bagga
 * @param userId the id of the user being used to search
 * @return {Promise<AxiosResponse<any>>} A list of jobs that the searched user is associated with
 */
export const getJobsByUserId = async (userId) => {
    return await axios.get(`${MONITOR_URL}/api/jobDTO/getJobsByUserId/value=${userId}`)
}

/**
 * @author Matthew Belgre and Manik Bagga
 * @param jobId the Id of the Job that is being used to search
 * @param userId the Id of the used that is being used to search
 * @return {Promise<AxiosResponse<any>>} Details about the Equipment and its associated EquipmentMonitor found through the search parameters
 */
export const getJobsDetailsByJobId = async (id, userId) => {
    return await axios.get(`${MONITOR_URL}/api/jobDTO/getJobsDetailsByJobId/value=${id}/value=${userId}`)
}
