import MaskedInput from "react-text-mask";
import { Form, Field, ErrorMessage } from "formik";
import styled from "styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const FormOneSC = styled.section`
    padding: 20px 15px;
    @media (max-width: 720px){
        padding: 0px;
    }
    form{
        background: #ffffff;
        border: #CCCCCC solid 1px;
        margin-bottom: 20px;
        border-radius: 3px;
        width: 100%;

        padding: 15px 10px;

        @media (max-width: 720px){
            border: none;
            border-top: #CCCCCC solid 1px;
            border-radius: 0px;
        }
    }
    #row{
        margin-right: 0px;
        margin-left: 0px;
    }
`;

const GroupOneSC = styled(Col)`
    padding: 0px 5px;
    label {
        color: #333333 !important;
        font-size: 12px !important;
        font-family: ${({ theme }) => theme.font.family.medium};
        white-space: nowrap;
    }
    label:after {
        color: #F00;
        content: '*';
        display: ${({ required }) => required ? 'inline' : 'none'};
    }
    
    
    input, select {
        margin-top: 2px;
        display: block;
        width: 100%;
        height: 34px;
        padding: 6px 12px;
        font-size: 13px;
        color: #555555;
        background-color: #ffffff;
        background-image: none;
        border: 1px solid #cccccc;
        border-radius: 4px;
        box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
        transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;

        &:focus{
            border-color: #0C1B25 !important;
        }
    }

    small {
        margin-left: 3px;
        color: #fe316c;
    }
`;

const FormOne = ({ children }) => {
    return (
        <FormOneSC>
            <Form>
                <Row id="row">{children}</Row>
            </Form>
        </FormOneSC>
    );
};
const GroupOne = ({ name, label, type = "text", required = false, autocomplete = "off", maxlength = 255, mask = false, placeholder, disabled, xs, sm, md, lg, xl, xxl }) => {
    const propsGroup = {
        xs,
        sm,
        md,
        lg,
        xl,
        xxl,
    };
    return (
        <GroupOneSC {...propsGroup} required={required}>
            <label htmlFor={name}>{label}</label>
            {!mask && (
                <Field name={name}>
                    {({ field }) => (
                        <input
                            {...field}
                            id={name}
                            type={type}
                            maxLength={maxlength}
                            autoComplete={autocomplete}
                            placeholder={placeholder}
                            disabled={disabled}
                            required={required}
                            value={field.value || ''}
                        />
                    )}
                </Field>
            )}
            {!!mask && (
                <Field name={name}>
                    {({ field }) => (
                        <MaskedInput
                            {...field}
                            id={name}
                            type={type}
                            maxLength={maxlength}
                            autoComplete={autocomplete}
                            mask={mask}
                            guide={false}
                            showMask={false}
                            placeholder={placeholder}
                            disabled={disabled}
                            required={required}
                            value={field.value || ''}
                        />
                    )}
                </Field>
            )}
            <small>
                <ErrorMessage name={name} />
            </small>
        </GroupOneSC>
    );
};
const GroupSelectOne = ({ name, label, required = false, data = [], xs, sm, md, lg, xl, xxl }) => {
    const propsGroup = {
        xs,
        sm,
        md,
        lg,
        xl,
        xxl,
    };
    return (
        <GroupOneSC {...propsGroup} required={required}>
            <label htmlFor={name}>{label}</label>
            <Field children name={name}>
                {({ field }) => (
                    <select
                        {...field}
                        id={name}
                        name={name}
                        required={required}
                        value={field.value || ''}
                    >
                        {data.map((item, key) => {
                            return <option key={key} value={item.value}>{item.name}</option>
                        })}
                    </select>
                )}
            </Field>
            <small>
                <ErrorMessage name={name} />
            </small>
        </GroupOneSC>
    );
};

export { FormOne, GroupOne, GroupSelectOne }