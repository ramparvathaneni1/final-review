import { render, fireEvent, waitFor } from '@testing-library/react';
import MyList from '../../MyList';
const toDos = ['Finish Homework', 'Plan Vacation', 'Go to the Gym', 'Prepare Presentation',
    'Clean the House', 'Organize Office', 'Repair Bike', 'Study for Exams', 'Renew Passport'];

test('Header contains the text "Things I should stop procrastinating:"', () => {
    const myList = render(<MyList theList={toDos} />);
    const heading = myList.getByRole('heading');
    expect(heading).toHaveTextContent('Things I should stop procrastinating:');
});

test('Entering text into text input and clicking "Add it!" button adds the item to the list', () => {
    const myList = render(<MyList theList={toDos} />);
    const input = myList.getByPlaceholderText('Type an item here');
    const button = myList.getByText("Add it!");

    fireEvent.change(input, { target: { value: "Renew Passport" } });
    fireEvent.click(button);

    // Wait for any asynchronous operations in the component to complete
    waitFor(() => {
        const list = myList.getByRole("list");
        const items = within(list).queryAllByRole("listitem"); // Assuming each item has a 'listitem' role
        const lastItem = items[items.length - 1]; // Get the last item in the list

        if (!lastItem) {
            console.error("No last item found. Items:", items);
        } else {
            expect(lastItem).toHaveTextContent("Renew Passport");
        }
    });
});


test('Clicking on "Finished the list!" will delete all elements in the list', () => {
    const myList = render(<MyList theList={toDos} />);
    const button = myList.getByText("Finished the list!");

    fireEvent.click(button);

    const list = myList.queryAllByRole("listitem");
    expect(list.length).toBe(0);
});
