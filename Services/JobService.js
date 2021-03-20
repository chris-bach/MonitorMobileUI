import axios from "axios";

export const getJobsByUserId = async (userId) => {
    return await axios.get(`http://192.168.56.1:8080/api/jobDTO/getJobsByUserId/value=${userId}`)
}

export const getJobsDetailsByJobId = async (id, userId) => {
    return await axios.get(`http://192.168.56.1:8080/api/jobDTO/getJobsDetailsByJobId/value=${id}/value=${userId}`)
}
