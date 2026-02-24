1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
ans: getElementById, getElementsByClassName, and querySelector / querySelectorAll are DOM elements. 
getElementById: It is a DOM method that targets a single element based on a unique id
getElementsByClassName: A DOM method that returns all elements with the specified class name.
querySelector: It is a DOM method that targets the first element that matches a specified CSS selector.
querySelectorAll: It is a DOM method that targets all elements that match a specified CSS selector.

2. How do you create and insert a new element into a dome?
Ans: A new element is created using document.createElement().
It is then modified by adding content or attributes.
Finally, it is inserted into the DOM using methods like appendChild(), append()

3. What is Event Bubbling? And how does it work?
Ans: When an event happens on an element, it first runs on that element, then automatically moves up to its parent, then the parent's parent, and continues until it reaches the document root.

4. What is event delegation in JavaScript? Is it useful?
Ans: Event Delegation is a JavaScript technique where a single event listener is attached to a parent element to manage events for multiple child elements

5. What is the difference between the PreventDefault() and StopPropagation() methods?
Ans: StopPropagation() is a method of the Event object that stops the event from moving up or down
