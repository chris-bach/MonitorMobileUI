import axios from "axios";
import {MONITOR_URL} from "../constants/MonitorConstants";

export const getJobListByDepartment = async (serviceTypeId) => {
    return await axios.get(`${MONITOR_URL}/api/service/type/getDepartmentJobList/value=${serviceTypeId}`)
}
