import axios from 'axios';

export const getOrgByName = async (organisationName) => {
    return await axios.get(`http://localhost:8080/api/organisation/getByName/value=${organisationName}`)
}

export const updateOrganisationDetails =  (org) => {
    return  axios.put('http://localhost:8080/api/organisation/update', {
        "organisationId": org.organisationId,
        "organisationName": org.organisationName,
        "address":org.address,
        "contactNumber":org.contactNumber,
        "email": org.email
    })
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

export const getDepartmentsByOrganisationId = async (organisationId) => {
    return await axios.get(`http://localhost:8080/api/service/type/provided/getByOrganisationId/value=${organisationId}`)
}

export const getOrganisationByOrganisationId = async (organisationId) => {
    return await axios.get(`http://localhost:8080/api/organisation/getById/value=${organisationId}`)
}


export const getEquipmentByOrganisation = async (organisationId) => {
    return await axios.get(`http://localhost:8080/api/organisation/getEquipmentByOrganisationIdId/value=${organisationId}`)
}
