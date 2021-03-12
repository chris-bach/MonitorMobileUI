import axios from 'axios';

export const getSubordinatesByManagerId = async (managerId) => {
    return await axios.get(`http://localhost:8080/api/subordinates/getSubordinates/value=${managerId}`)
}
