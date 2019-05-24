import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Formik, Form, Field, ErrorMessage} from 'formik'
import {validate} from '../Constants'
import {req} from '../actions'
import {STATUS_IN, STATUS_FAILED, STATUS_SUCC} from '../actions'
import '../App.css'


class UserRegistration extends Component {
    state = {}
    render() {
        return (
            <Formik
            validateOnBlur={false}
            validateOnChange={false}
            initialValues={{firstName:'', lastName:'', email:'', password:''}}
            validate={validate}
            onSubmit={async (values, { setSubmitting })=>{
                this.setState({status: STATUS_IN});
    
                let response = await req('/register', 'POST', JSON.stringify(values));
                let data = await response.json();
                if(response.status === 409){
                this.setState({status: STATUS_FAILED, msg: data.msg});
                } else {
                this.setState({status: STATUS_SUCC});
                }
            }}
            render={()=>{
                return (
                    <div>
                        <h1>Registration</h1>
                        <Form>
                            <table>
                                <tbody>
                                <tr>
                                    <td><label htmlFor="email">Email: </label></td>
                                    <td><Field type="email" name="email" id="email" placeholder="email address"/></td>
                                    <td><ErrorMessage name="email" component="div" className="errorMsg"/></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="firstName">First Name: </label></td>
                                    <td><Field type="text" name="firstName" id="firstName"/></td>
                                    <td><ErrorMessage name="firstName" component="div"  className="errorMsg"/></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="lastName">Last Name: </label></td>
                                    <td><Field type="text" name="lastName" id="lastName"/></td>
                                    <td><ErrorMessage name="lastName" component="div"  className="errorMsg"/></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="password">Password: </label></td>
                                    <td><Field type="password" name="password" id="password"/></td>
                                    <td><ErrorMessage name="password" component="div"  className="errorMsg"/></td>
                                </tr>
                                {this.state.status === STATUS_SUCC && 
                                <tr>
                                    <td colSpan="2">
                                        <div>Added Successfully!</div>
                                    </td>
                                </tr>
                                }
                                <tr>
                                    <td colSpan="2">
                                        {this.state.status === STATUS_FAILED && <div>{this.state.msg}</div>}
                                        <button type="submit" disabled={this.state.status === STATUS_IN}>
                                            Submit
                                        </button>
                                    </td> 
                                </tr>
                                </tbody>
                            </table>
                        </Form>
                    </div>
                )
            }}

            />

        );
    }
}


export default UserRegistration;
