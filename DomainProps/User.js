import {Component} from 'react';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: null,
            lastName: null,
            email: null,
            password: null,
        }
    }
}

export default User;
