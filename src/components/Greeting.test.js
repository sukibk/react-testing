import Greeting from "./Greeting";
import {render} from "@testing-library/react";
import { screen} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
describe('Greeting component', () => {
    test('renders Hello world as a text',
        () => {
            // Arrange
            render(<Greeting />);
            // Act
            /// ... nothing

            // Assert (get -> throw error if element is not found,
            // query -> don't do that, and find -> returns promise)
            const helloWorldElement = screen.getByText('Hello World', {exact: false})
            expect(helloWorldElement).toBeInTheDocument() //not.toBeInTheDocument but I also need to use query
        });

    test('renders good to see you if the button was NOT clicked', () => {
        render(<Greeting />);

        const paragraphElement = screen.getByText('good to see you', {exact: false});
        expect(paragraphElement).toBeInTheDocument()
    })

    test('renders Changed if the button was clicked', () => {
        // Arrange
        render(<Greeting />)

        // Act
        const buttonElement = screen.getByRole('button'); // but I can also get it with text
        userEvent.click(buttonElement)

        // Assert
        const paragraphElement = screen.getByText('Changed', {exact: false})
        expect(paragraphElement).toBeInTheDocument()
    })

    test('not renders good to see you after the button was clicked', () => {
        // Arrange
        render(<Greeting />);

        // Act
        const buttonElement = screen.getByRole('button');
        userEvent.click(buttonElement)

        // Assert
        const paragraphElement = screen.queryByText('good to see you', {exact: false});
        expect(paragraphElement).toBeNull()
    })
})

