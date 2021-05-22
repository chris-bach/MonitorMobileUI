import axios from 'axios';
import {MONITOR_URL} from "../constants/MonitorConstants";

export const getAllByEquipmentMonitorId= async (equipmentMonitorId) => {
    return await axios.get(`${MONITOR_URL}/api/breakdown/reports/getAllByEquipmentMonitorId/value=${equipmentMonitorId}`)
}

/**
 * @author Matthew Belgre
 * @param id the ID of the equipmentMonitor being searched
 * @return {Promise<AxiosResponse<any>>}The status of the equipment monitor associated with "id"
 */
export const getStatusById = async (id) => {
    return await axios.get(`${MONITOR_URL}/api/equipment/monitor/getStatusById/value=${id}`)
}
