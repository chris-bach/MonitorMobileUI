import  {Component} from 'react';

class Role extends Component {
    constructor(props){
      super(props)
        this.state = {
            roleId: null,
            roleTitle: null,
            manageUsers: null,
            manageEquipment: null,
            manageJob: null,
            createInvite: null,
            manageDocuments: null,
            manageServiceType: null,
            manageOrganisation: null,
            manageRoles: null,
        }
    }
}

export default Role;
