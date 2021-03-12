import  {Component} from 'react';

class DocUpload extends Component {
    constructor(props){
        super(props)
        this.state = {
            organisation: null,
            organisationId: null,
            name: null,
            description: null
        }
    }
}

export default DocUpload;
