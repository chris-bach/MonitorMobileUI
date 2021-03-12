import axios from 'axios';

export const getUserByEmail = async (email) => {
    return await axios.get(`http://localhost:8080/api/user/findByEmail/value=${email}`)
}

export const getOrganisationStaffList = async (organisationId) => {
    return await axios.get(`http://localhost:8080/api/staff/list/getByOrganisationId/value=${organisationId}`)
}
