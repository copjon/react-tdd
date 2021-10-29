import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EmailCollectionForm from './EmailCollectionForm'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { act } from 'react-dom/test-utils';

jest.mock('axios');
const axiosPostMock = axios.post as jest.MockedFunction<(url: string, data?: any, config?: AxiosRequestConfig | undefined) => Promise<AxiosResponse>>;

describe('EmailCollectionForm', () => {
    it('should render fields to collect name and email', async () => {
        //Arrange
        //Act
        render(<EmailCollectionForm />);

        expect(await screen.findByTestId('nameInput')).toBeInTheDocument();
        expect(await screen.findByTestId('emailInput')).toBeInTheDocument();
        expect(await screen.findByTestId('submitButton')).toBeInTheDocument();
    });

    it('should not be submitable if the name is empty', async () => {
        //Arrange
        //Act
        //Our form should have a blank name to begin with.
        render(<EmailCollectionForm />);

        //Assert
        expect(await screen.findByTestId('submitButton')).toHaveAttribute('disabled');
    });


    it('should not be submitable if the name is invalid', async () => {
        //Arrange
        const badName = '1234';
        render(<EmailCollectionForm />);
        
        //Act
        fireEvent.change(await screen.findByTestId('nameInput'), { target: { value: badName}});

        //Assert
        expect(await screen.findByTestId('nameInput')).toHaveValue(badName);
        expect(await screen.findByTestId('submitButton')).toBeDisabled();

    });

    it('should not be submitable if the email is empty', async () =>{
        //Arrange
        const goodName = 'Hello World';
        const badEmail = "";
        render(<EmailCollectionForm />);

        //Act
        fireEvent.change(await screen.findByTestId('nameInput'), { target: { value: goodName } });
        fireEvent.change(await screen.findByTestId('emailInput'), { target: { value: badEmail } });

        //Assert
        expect(await screen.findByTestId('nameInput')).toHaveValue(goodName);
        expect(await screen.findByTestId('submitButton')).toBeDisabled();
    });

    it('should not be submitable if the email is invalid', async () => {
        //Arrange
        const goodName = 'Hello World';
        const badEmail = "notanemail";
        render(<EmailCollectionForm />);

        //Act
        fireEvent.change(await screen.findByTestId('nameInput'), { target: { value: goodName } });
        fireEvent.change(await screen.findByTestId('emailInput'), { target: { value: badEmail } });

        //Assert
        expect(await screen.findByTestId('nameInput')).toHaveValue(goodName);
        expect(await screen.findByTestId('submitButton')).toBeDisabled();
    });

    it('should be submitable if the name and email are valid', async () => {
        //Arrange
        const goodName = 'Hello World';
        const goodEmail = 'email@example.com';
        render(<EmailCollectionForm />);

        //Act
        fireEvent.change(await screen.findByTestId('nameInput'), { target: { value: goodName } });
        fireEvent.change(await screen.findByTestId('emailInput'), { target: { value: goodEmail } });

        //Assert
        expect(await screen.findByTestId('nameInput')).toHaveValue(goodName);
        expect(await screen.findByTestId('emailInput')).toHaveValue(goodEmail);
        expect(await screen.findByTestId('submitButton')).not.toBeDisabled();
    });

    it('should call 3rd party email service on submit', async () => {
        //Arrange
        const response : AxiosResponse = {
            data: {
                id: 'expectedId'
            },
            status: 200,
            statusText: '',
            headers: {},
            config: {}
        };

        axiosPostMock.mockImplementationOnce(() => Promise.resolve(response));

        const goodName = 'Hello World';
        const goodEmail = 'email@example.com';
        render(<EmailCollectionForm />);

        //Act
        await act(async () => {
            fireEvent.change(await screen.findByTestId('nameInput'), { target: { value: goodName } });
            fireEvent.change(await screen.findByTestId('emailInput'), { target: { value: goodEmail } });
            fireEvent.click(await screen.findByTestId('submitButton'));
        });

        //Assert
        expect(axiosPostMock).toHaveBeenCalledTimes(1);
    });
});