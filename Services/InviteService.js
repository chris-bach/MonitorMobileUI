import axios from "axios";

export const sendContractorInvite =  (email, first, last, organisationId, contractorName) => {
    return  axios.post('http://localhost:8080/api/userInvite/contractor', {
        "organisationId": organisationId,
        "firstName": first,
        "lastName": last,
        "contractorName":contractorName,
        "email":email
    })
}

export const sendUserInvite =  (email, first, last, organisationId) => {
    return  axios.post('http://localhost:8080/api/userInvite/user', {
        "organisationId": organisationId,
        "firstName": first,
        "lastName": last,
        "email":email
    })
}
