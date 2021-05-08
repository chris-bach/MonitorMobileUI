import axios from 'axios';
import {MONITOR_URL} from "../constants/MonitorConstants";

export const getAllByEquipmentMonitorId= async (equipmentMonitorId) => {
    return await axios.get(`${MONITOR_URL}/api/breakdown/reports/getAllByEquipmentMonitorId/value=${equipmentMonitorId}`)
}

export const getStatusById = async (id) => {
    return await axios.get(`${MONITOR_URL}/api/equipment/monitor/getStatusById/value=${id}`)
}
