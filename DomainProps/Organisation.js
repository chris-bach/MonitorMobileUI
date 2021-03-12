import {Component} from 'react';

class Organisation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            organisationName: null,
            email: null,
            contactNumber: null,
            address: null,
        }
    }
}

export default Organisation;
