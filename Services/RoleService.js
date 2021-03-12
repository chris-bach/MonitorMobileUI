import axios from 'axios';

export const getRoleByRoleIdAndOrgId = async (roleId, orgId) => {
    return await axios.get(`http://localhost:8080/api/role/getByRole/value=${roleId}/value=${orgId}`)
}

export const createRole =  (role, organisationId) => {
    return  axios.post('http://localhost:8080/api/role', {
        "organisationId": organisationId,
        "roleTitle": role.roleTitle,
        "manageUsers": role.manageUsers,
        "manageEquipment": role.manageEquipment,
        "manageRoles":role.manageRoles,
        "createInvite": role.createInvite,
        "manageJob": role.manageJob,
        "manageDocuments": role.manageDocuments,
        "manageServiceType": role.manageServiceType,
        "manageOrganisation": role.manageOrganisation
    })
}

export const getAllRolesByOrganisationId = (organisationId) => {
    return axios.get(`http://localhost:8080/api/role//getAll/value=${organisationId}`)
}

export const getAssignedRoleInfoByManagerId = (managerId) => {
    return axios.get(`http://localhost:8080/api/assigned/role/getAssignedRoleInfo/byMangerId/value=${managerId}`)
}

export const assignRoleToMultipleUsers =  (roleId, userList) => {
    return  axios.post('http://localhost:8080/api/assigned/role/assignUsers', {
        "roleId": roleId,
        "userList": userList
    })
}
