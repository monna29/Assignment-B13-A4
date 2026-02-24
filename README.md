Answers....

1. getElementById() selects a single element  id.
getElementsByClassName() selects a multiple elements by class.
querySelector() retrieves the first matching element and querySelectorAll() retrieves all matching elements.


2. First need to create the element with document.createElement().
Then  need to provide the content with innerText or innerHTML.
Finally,  add it to the DOM with appendChild().

3. Event Bubbling is when an event occurs on an element, it first acts on that element, then moves to its parent.

4. Event Delegation is the process of handling events of child elements by placing an event listener on the parent element.

5. preventDefault() stops the browser's default behavior.
stopPropagation() stops event bubbling, so that the event does not go to the parent.