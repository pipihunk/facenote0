import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Formik, Form, Field, ErrorMessage} from 'formik'
import {Redirect} from 'react-router-dom'
import {validate} from '../Constants'
import {login, req} from '../actions'
import {STATUS_IN, STATUS_FAILED, STATUS_SUCC} from '../actions'
import '../App.css'


class Login extends Component {
    state = {}
    render() {
        return (
            <Formik
            validateOnBlur={false}
            validateOnChange={false}
            initialValues={{email:'', password:''}}
            validate={validate}
            onSubmit={async (values, { setSubmitting })=>{
                // let status = await this.props.dispatch(login(values));
                // if(status === 200){
                //     let from = this.props.from || '/users';
                //     this.props.history.push(from);
                // }

                this.setState({status: STATUS_IN});
      
                let response = await req('/login', 'POST', JSON.stringify(values));
                let data = await response.json();
                if(response.status === 404){
                    this.setState({status: STATUS_FAILED, msg: data.msg});
                } else {
                    this.props.dispatch(login(data));
                    sessionStorage.setItem('login', JSON.stringify(login(data).payload.user));

                   
                    let from = this.props.from || '/users';
                    console.log('from:', from)
                    
                    this.props.history.push(from);
                }



            }}
            render={()=>{
                return (
                    
                    sessionStorage.getItem('login') ? 'Please logout first!' : 
                    <div>
                        {false && this.props.status === STATUS_SUCC && <Redirect to="/users"/>}
                        <h1>Login</h1>
                        <Form>
                            <table>
                                <tbody>
                                <tr>
                                    <td><label htmlFor="email">Email: </label></td>
                                    <td><Field type="email" name="email" id="email"/></td>
                                    <td><ErrorMessage name="email" component="div" className="errorMsg"/></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="password">Password: </label></td>
                                    <td><Field type="password" name="password" id="password"/></td>
                                    <td><ErrorMessage name="password" component="div" className="errorMsg"/></td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                    {this.state.status === STATUS_FAILED && <div>{this.state.msg}</div>}
                                    <button type="submit" disabled={this.state.status === STATUS_IN}>
                                        Login
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

const mapStateToProps = (state, ownProps) => {
    let props = state['login'] || {};
    return {...props};
}

export default connect(mapStateToProps)(Login);
