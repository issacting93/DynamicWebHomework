how to create a controlled component in React, specifically for an input field like a search bar.

## The core process involves:

Using State: A piece of state is created (e.g., term with a setter function setTerm) to store the value of the input field.

Event Handling: An onChange event handler is attached to the input. This function is triggered every time the user types a key.

Updating State: Inside the onChange handler, the current value from the input (event.target.value) is captured and used to update the state via setTerm.

Binding the Value: The value attribute of the input element is explicitly bound to the term state variable.

This creates a loop: the user types, the onChange event updates the state, and the state update causes the input field to display the new value. The main reason for this setup is to ensure that React "controls" the input's value, making it reliably accessible within the component's state for other actions, such as submitting the form.