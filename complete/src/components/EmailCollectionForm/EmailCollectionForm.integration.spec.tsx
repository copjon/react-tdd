import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EmailCollectionForm from './EmailCollectionForm'
import { act } from 'react-dom/test-utils';

describe('EmailCollectionForm',() => {
    it('should receive ID from 3rd party api sevice after submit', async () => {
        //Arrange
        const goodName = 'Hello World';
        const goodEmail = 'email@example.com';
        render(<EmailCollectionForm />);

        //Act
        await act(async () => {
            fireEvent.change(await screen.findByTestId('nameInput'), { target: { value: goodName } });
            fireEvent.change(await screen.findByTestId('emailInput'), { target: { value: goodEmail } });
            fireEvent.click(await screen.findByTestId('submitButton'));
        });

        await waitFor(async () => expect(await screen.findByTestId('contactId')).toBeInTheDocument());
        
        //Assert
        expect(await screen.findByTestId('contactId')).toHaveTextContent('testid');
    });
});