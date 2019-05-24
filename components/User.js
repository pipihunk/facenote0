import React from 'react';
import UserEdit from './UserEdit'
import {req, STATUS_FAILED, STATUS_IN, deleteUser} from '../actions'

class User extends React.PureComponent {
    constructor(props){
        super(props);
        // this.clickEdit = this.clickEdit.bind(this, true);
        // this.clickCancelEdit = this.clickEdit.bind(this, false);
        this.clickDelete = this.clickDelete.bind(this);
        this.state = {isEdit:false};
    }

    clickEdit(isEdit){
        // this.props.dispatch(clickEditUser(this.props.user.email));
        this.setState({isEdit});
    }
    async clickDelete(){
        if(!window.confirm('Are you sure to delete this user?')) return;
        this.setState({status: STATUS_IN});
        let response = await req(this.props.link, 'DELETE');
        if(response.status === 204){
            this.props.dispatch(deleteUser(this.props.user.email));
        } else {
            this.setState({status: STATUS_FAILED});
        }
    }

    componentDidUpdate(prevProps) {
        console.log('componentDidUpdate', this.props.user.email)
        if (prevProps.user !== this.props.user) {
            console.log('componentDidUpdate2', this.props.user.email)
          this.setState({ isEdit: false}) // <- this is setState equivalent
        }
      }
    render() {
        
        let user = this.props.user;
        // console.log('rendering user', user.email)
        return this.state.isEdit ? (
            <tr>
                <td colSpan="3">
                    <UserEdit link={this.props.link} user={user} dispatch={this.props.dispatch} clickCancelEdit={()=>{this.clickEdit(false);}}/>
                </td>
            </tr>
        ) :
        (
            <tr>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td><button type="button" onClick={()=>{this.clickEdit(true);}}>Edit</button></td>
                <td><button type="button" onClick={()=>{this.clickDelete()}}>Delete</button></td>
            </tr>
        );
    }
}


export default User;