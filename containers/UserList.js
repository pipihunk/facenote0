import React from 'react';
import User from '../components/User'
import {fetchUsersIfNeeded, STATUS_AUTH_FAILED, STATUS_IN, STATUS_SUCC, req, logout, STATUS_FAILED} from '../actions'
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux';

class UserList extends React.Component{
    // constructor(props){
    //     super(props);
    // }

    state = {}

    async componentDidMount(){
        this.setState({status:STATUS_IN})
        let res = await this.props.dispatch(fetchUsersIfNeeded());
        this.setState({...res});
    }


    render(){
        return (
            <>
            {this.state.status === STATUS_IN && <span>Loading...</span>}
            {this.state.status === STATUS_FAILED && <span>{this.state.msg}</span>}
            {this.state.status === STATUS_SUCC && this.props.users && 
            <table>
                <tbody>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                    {this.props.users.map(
                        user =>{
                            const link = user._links.self.href;
                            // if(user.isEdit){
                            //     user = {...user, ...(this.props.editUsers[user.email] || {})};
                            // }
                            return <User key={link} user={user} link={link} dispatch={this.props.dispatch}/>;
                        }
                    )}
                </tbody>
            </table>
            }
            </>
            
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    let userList = state['userList'] || {};
    // let userEdit = state['userEdit'] || {};
    return {status: userList.status, users:userList.users};
}

export default connect(mapStateToProps)(UserList);
