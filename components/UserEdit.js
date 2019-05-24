import React, { Component } from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik'
import {validate} from '../Constants'
import {STATUS_IN, STATUS_FAILED, OK_USER, okEditUser, req} from '../actions'

class UserEdit extends React.PureComponent {
    state = {}
    render() {
        let {user : {firstName='', lastName='', email=''}} = this.props;
        let status = this.state.status;
        console.log('clickCancelEdit', this.props.clickCancelEdit)
        return (
            <Formik
                validateOnBlur={false}
                validateOnChange={false}
                initialValues={{firstName, lastName}}
                validate={validate}
                onSubmit={async (values, { setSubmitting })=>{
                    this.setState({status: STATUS_IN});
                    let response = await req(this.props.link, 'PATCH', JSON.stringify(values));
                    //let data = await response.json();
                    if(response.status === 200){
                        //dispatch({type: OK_EDIT_USER, payload:{status: STATUS_SUCC, email, user}});
                        this.props.dispatch(okEditUser(email, values));
                    } else {
                        this.setState({status: STATUS_FAILED});
                    }
                }}
                render={()=>{
                    return (
                        <Form>
                            <table>
                                <tbody>
                                <tr>
                                    <td><Field type="text" name="firstName" id="firstName"/><ErrorMessage name="firstName" component="div" className="errorMsg"/></td>
                                    <td><Field type="text" name="lastName" id="lastName"/><ErrorMessage name="lastName" component="div" className="errorMsg"/></td>
                                    <td>{email}</td>
                                    <td>
                                        {status === STATUS_FAILED && <div>Editing Failed; please try again!</div>}
                                        <button type="submit" disabled={status === STATUS_IN}>
                                            Ok
                                        </button>
                                        <button type="button" onClick={this.props.clickCancelEdit} disabled={status === STATUS_IN}>
                                            Cancel
                                        </button>
                                    </td> 
                                </tr>
                                </tbody>
                            </table>
                        </Form>
                    )
                }}

            />
        )
    }
}

export default UserEdit;