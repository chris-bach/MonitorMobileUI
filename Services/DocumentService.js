import axios from "axios";
import {MONITOR_URL} from "../constants/MonitorConstants";

/**
 * @author Matthew Belgre
 * @param organisationId the ID of the Organisation being used to search with
 * @return {Promise<AxiosResponse<any>>} A list of documents associated with the searched organisation
 */
export const getDocumentsByOrganisationId = async (organisationId) => {
    return await axios.get(`${MONITOR_URL}/api/document/getDocInfo/value=${organisationId}`)
}
