export const PROXY = 'http://localhost:8081';

export function validate(values){
    let errors = {};
    for(let key in values){
        if(!values[key]){
            errors[key] = 'Required';
        } else if(key === 'email'){
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }
        } else if(key === 'firstName' || key === 'lastName'){
        if(values[key].length < 2)
            errors[key] = 'Too short';
        if(values[key].length > 15)
            errors[key] = 'Too long';
        } else if(key === 'password'){
        if(values[key].length < 5)
            errors[key] = 'Too weak';

        }
    }

    return errors;
}