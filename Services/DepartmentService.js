import axios from "axios";

export const getStaffListByDepartment = async (managerId) => {
    return await axios.get(`http://localhost:8080/api/service/type/getDepartmentStaffList/value=${managerId}`)
}

export const getJobListByDepartment = async (serviceTypeId) => {
    return await axios.get(`http://192.168.56.1:8080/api/service/type/getDepartmentJobList/value=${serviceTypeId}`)
}

export const createDepartment =  (department) => {
    return  axios.post('http://localhost:8080/api/service/type/create', {
        "organisationId": department.organisationId,
        "name": department.name,
        "email": department.email,
        "supervisorId": department.supervisorId,
    })
}
