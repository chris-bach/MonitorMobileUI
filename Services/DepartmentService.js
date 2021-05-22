import axios from "axios";
import {MONITOR_URL} from "../constants/MonitorConstants";

/**
 * @author Matthew Belgre
 * @param serviceTypeId the ID of the ServiceType(department) being used to search
 * @return {Promise<AxiosResponse<any>>} Returns a List of jobs that the that are associated with this department
 */
export const getJobListByDepartment = async (serviceTypeId) => {
    return await axios.get(`${MONITOR_URL}/api/service/type/getDepartmentJobList/value=${serviceTypeId}`)
}
