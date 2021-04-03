import axios from "axios";

export const getDocumentsByOrganisationId = async (organisationId) => {
    return await axios.get(`http://192.168.20.13:8080/api/document/getDocInfo/value=${organisationId}`)
}


export const createDocument =  (formData) => {
    return axios.post('http://localhost:8080/api/document/upload', formData );
}
