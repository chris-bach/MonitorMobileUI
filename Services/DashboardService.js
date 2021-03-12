import axios from 'axios';

//used to populate the wide chart
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