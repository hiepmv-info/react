import * as yup from 'yup';

export function validateSchema(column: any) {
    let schema = yup.object().shape({});
    column.row.forEach((item: any) => {
        let validator: any;
        let password: any;

        if (item.type === 'checkbox') {
            validator = yup.boolean();
        } else if (item.type === 'number') {
            validator = yup.number();
        } else if (item.type === 'email') {
            validator = yup.string().email('Must be a valid email');
        } else if (item.type === 'url') {
            validator = yup.string().url('Must be a valid URL');
        } else {
            validator = yup.string();
        }

        item.validation?.forEach((validation: string) => {
            if (validation === 'required') {
                validator = validator.required('This field is required');
            } else if (item.type !== 'checkbox') { // Apply these rules only for non-boolean fields
                if (validation.startsWith('min')) {
                    const min = parseInt(validation.split(':')[1]);
                    validator = validator.min(min, `This field must be at least ${min} characters`);
                } else if (validation.startsWith('max')) {
                    const max = parseInt(validation.split(':')[1]);
                    validator = validator.max(max, `This field must be at most ${max} characters`);
                } else if (validation === 'email') {
                    validator = validator.email('Must be a valid email');
                } else if (validation === 'url') {
                    validator = validator.url('Must be a valid URL');
                } else if (validation.startsWith('matches')) {
                    const regex = new RegExp(validation.split(':')[1]);
                    validator = validator.matches(regex, 'Does not match the required pattern');
                } else if (validation === 'password') {
                    validator = validator.matches(/(?=.*[0-9])/, 'This field must contain at least one number')
                        .matches(/(?=.*[a-z])/, 'This field must contain at least one lowercase letter')
                        .matches(/(?=.*[A-Z])/, 'This field must contain at least one uppercase letter')
                        .matches(/(?=.*[!@#$%^&*])/, 'This field must contain at least one special character');
                } else if (validation === 'confirmPassword') {
                    password = yup.ref('password');
                    validator = validator.oneOf([password, null], 'Passwords must match');
                }
            }
        });

        schema = schema.shape({ [item.property]: validator });
    });

    return schema;
}