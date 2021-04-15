import axios from "axios";
import {MONITOR_URL} from "../constants/MonitorConstants";

export const getDocumentsByOrganisationId = async (organisationId) => {
    return await axios.get(`${MONITOR_URL}/api/document/getDocInfo/value=${organisationId}`)
}
