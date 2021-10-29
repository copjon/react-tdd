import axios from 'axios';
import React, {useState} from 'react';

const EmailCollectionForm = () => {
    const [isValid, setIsValid] = useState<boolean>(false);
    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [contactId, setContactId] = useState<string>();

    const nameRegex = new RegExp('^[a-zA-Z\\s]+$')
    const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    function validate(nameInput: string | undefined , emailInput: string | undefined): void {
        if (!nameInput || !nameRegex.test(nameInput)) {
            setIsValid(false);
            return;
        }
        setName(nameInput);

        if (!emailInput || !emailRegex.test(emailInput)) {
            setIsValid(false);
            return;
        }
        setEmail(emailInput);

        setIsValid(true);
    }

    function onNameChange(event:React.ChangeEvent<HTMLInputElement>) {
        validate(event.target.value, email);
    }

    function onEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        validate(name, event.target.value);
    }

    async function onSubmit() {
        if(!isValid) {
            return;
        }

        const body = {
            email,
            name
        }

        const response = await axios.post(process.env.REACT_APP_3RD_PARTY_EMAIL_API_URL ?? "", body);
        setContactId(response.data.id);
    }

    return (
        <>
            <div className="form-group">
                <label htmlFor="nameInput">Full Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="nameInput"
                    data-testid="nameInput"
                    placeholder="John Doe"
                    onChange={onNameChange}
                />

            </div>
            <div className="form-group">
                <label htmlFor="emailInput">Email address</label>
                <input
                    type="email"
                    className="form-control"
                    id="emailInput"
                    data-testid="emailInput"
                    placeholder="email@example.com"
                    onChange={onEmailChange}
                />

            </div>
            <button
                className="btn btn-primary"
                id="submitButton"
                data-testid="submitButton"
                disabled={!isValid}
                type="submit"
                onClick={onSubmit}>
                Submit form
            </button>
            <div hidden={!contactId}>
                <label htmlFor="contactId">ContactId</label>
                <p id="contactId" data-testid="contactId">{contactId}</p>
            </div>
        </>
    );
}

export default EmailCollectionForm
