import axios from 'axios';

export const createEquipmentAndAssignDocuments =  (equipment, documentId, organisationId) => {
    return  axios.post('http://localhost:8080/api/equipment/create/document', {
        "organisationId": organisationId,
        "documentId": documentId,
        "manufacturer": equipment.manufacturer,
        "model": equipment.model,
        "name":equipment.name,
        "description": equipment.description,
    })
}

export const getAllByEquipmentId= async (equipmentId) => {
        return await axios.get(`http://192.168.20.13:8080/api/breakdown/reports/getAllByEquipmentId/value=${equipmentId}`)
}
