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
