# DOM MASTERCLASS — COMPREHENSIVE TRAINER NOTES
## Full Stack Edition | Beginner → Junior Full-Stack

---

## TARGET AUDIENCE
Beginners transitioning to Junior Full-Stack developers

## COURSE GOAL
Build complete mastery of the browser environment, DOM APIs, event system, rendering, manipulation, traversal, debugging, and professional development patterns.

---

# MODULE 0 — PREREQUISITES CHECK

Before beginning DOM instruction, verify students understand:

## ✔ HTML Structure
- Semantic tags (`<header>`, `<nav>`, `<main>`, `<footer>`)
- Tag hierarchy and nesting
- Attributes (id, class, data-*)
- Form elements (`<input>`, `<select>`, `<textarea>`, `<button>`)
- Common elements (`<div>`, `<span>`, `<p>`, `<a>`, `<img>`)

## ✔ CSS Basics
- Selectors (element, class, ID, attribute)
- Box model (margin, padding, border, content)
- Positioning (static, relative, absolute, fixed, sticky)
- Display properties (block, inline, flex, grid)
- Transitions and basic animations
- Colors and typography

## ✔ JavaScript Fundamentals
- Variables (var, let, const)
- Data types (string, number, boolean, null, undefined, object, array)
- Functions (declarations, arrow functions, parameters, return)
- Control flow (if/else, switch, loops)
- Objects and arrays
- Template literals
- Arrow functions and callback functions

---

# MODULE 1 — THE BROWSER ENVIRONMENT

## What is the DOM?

### Definition
**DOM = Document Object Model**

The DOM is NOT HTML. The DOM is a **live, hierarchical object representation** of your HTML **after the browser has parsed and processed it**. It's an API that allows JavaScript to interact with HTML elements programmatically.

### Key Distinction
```
HTML (Static)           → Browser Parsing → DOM (Dynamic Object Tree)
<p>Hello</p>           →                  → {tagName: "P", textContent: "Hello", ...}
```

### The DOM Tree Structure
```
Document
├── html (HTMLHtmlElement)
│   ├── head (HTMLHeadElement)
│   │   ├── title
│   │   ├── meta
│   │   └── link
│   └── body (HTMLBodyElement)
│       ├── header
│       ├── main
│       │   └── div.container
│       │       └── p.text
│       └── footer
```

### Why This Matters for Full-Stack Developers
1. **Real-time Manipulation**: Change content, structure, styling without page reload
2. **Event Handling**: Respond to user interactions immediately
3. **Data Binding**: Synchronize data with UI
4. **State Management**: Manage application state through DOM representation

## The Browser Rendering Pipeline

### Step 1: Parsing
- Browser reads HTML sequentially
- Constructs DOM tree
- Stops at `<script>` tags (blocking)

### Step 2: CSSOM Construction
- Browser reads CSS
- Constructs CSS Object Model (CSSOM)
- Merges with DOM tree

### Step 3: Render Tree Creation
- Combines DOM + CSSOM
- Only includes visible elements
- Elements with `display: none` excluded

### Step 4: Layout (Reflow)
- Browser calculates position and size
- Creates layout tree
- Runs on initial load and when layout changes

### Step 5: Paint (Repaint)
- Converts layout tree to pixels
- Rasterizes elements
- Creates bitmap images

### Step 6: Composite
- Combines layers
- Displays on screen

### Performance Impact: Reflow vs Repaint

**Reflow (Layout Recalculation)**
- Triggered by: width, height, position, display, box-model changes
- EXPENSIVE - affects entire tree
- Example: `element.style.width = "100px"`

**Repaint (Visual Update)**
- Triggered by: color, background, opacity (color properties)
- LESS expensive than reflow
- Example: `element.style.color = "red"`

### Trainer Talking Point
"Minimize reflows, they're the biggest performance bottleneck. Repaints are okay."

---

## Exercise 1: Understanding the Rendering Pipeline

### Question
Explain what happens when the browser loads this HTML:
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    p { color: blue; }
  </style>
</head>
<body>
  <p>Hello World</p>
</body>
</html>
```

### Expected Answer
1. **Parsing**: Browser creates DOM tree with p element
2. **CSSOM**: Browser applies CSS rule (color: blue)
3. **Render Tree**: Creates render node for p element with blue color
4. **Layout**: Calculates text position and size
5. **Paint**: Renders blue text to pixels
6. **Composite**: Displays on screen

---

# MODULE 2 — DOM SELECTION (THE CORE SKILL)

## Why Selection Matters
You cannot manipulate what you cannot select. DOM selection is the gateway to all DOM operations.

## Selection Methods by Category

### 1. Single Element Selection

#### `getElementById()`
```javascript
const element = document.getElementById("myId");
```
- **Returns**: HTMLElement or null
- **Speed**: Fastest (uses internal hash map)
- **Use Case**: When you have a unique ID
- **Warning**: Returns null if not found

#### `querySelector()`
```javascript
const element = document.querySelector(".myClass");
const element = document.querySelector("#myId");
const element = document.querySelector("div > p");
```
- **Returns**: First matching element or null
- **Supports**: CSS selector syntax
- **Speed**: Fast enough for most cases
- **Flexibility**: Highest - works with any CSS selector
- **Warning**: Only returns first match

### 2. Multiple Elements Selection

#### `querySelectorAll()`
```javascript
const elements = document.querySelectorAll(".item");
const elements = document.querySelectorAll("p");
const elements = document.querySelectorAll(".container > div");
```
- **Returns**: NodeList (static)
- **Supports**: All CSS selectors
- **Speed**: Good
- **Iteration**: Use forEach(), for, or convert to array

#### `getElementsByClassName()`
```javascript
const elements = document.getElementsByClassName("active");
```
- **Returns**: HTMLCollection (live - updates dynamically)
- **Speed**: Very fast
- **Note**: Class names are space-separated

#### `getElementsByTagName()`
```javascript
const paragraphs = document.getElementsByTagName("p");
const divs = document.getElementsByTagName("div");
```
- **Returns**: HTMLCollection (live)
- **Speed**: Very fast
- **Use**: When selecting by tag only

## Critical Distinction: Live vs Static Collections

### Live Collections (Update automatically)
```javascript
const live = document.getElementsByClassName("item");
console.log(live.length); // 3

const newItem = document.createElement("div");
newItem.className = "item";
document.body.appendChild(newItem);

console.log(live.length); // 4 - automatically updated!
```

### Static Collections (Don't update)
```javascript
const static = document.querySelectorAll(".item");
console.log(static.length); // 3

const newItem = document.createElement("div");
newItem.className = "item";
document.body.appendChild(newItem);

console.log(static.length); // still 3 - NOT updated
```

## Selection Best Practices

| Scenario | Method | Why |
|----------|--------|-----|
| Single element by ID | `getElementById()` | Fastest |
| Single element by selector | `querySelector()` | Flexible |
| Multiple elements | `querySelectorAll()` | Flexible, predictable |
| Performance-critical | `getElementsByTagName()` | Fastest for tags |
| Don't use | `getElementsByName()` | Rarely needed, confusing |

---

## Exercise 2: DOM Selection Practice

### HTML
```html
<div id="container" class="wrapper">
  <h1 class="title">Products</h1>
  <div class="product" data-id="1">Product 1</div>
  <div class="product" data-id="2">Product 2</div>
  <div class="product" data-id="3">Product 3</div>
  <button id="addBtn">Add Product</button>
</div>
```

### Questions
1. Select the container by ID
2. Select all products
3. Select the button using querySelector
4. Select all divs on the page
5. Select elements with data-id attribute

### Answers
```javascript
const container = document.getElementById("container");
const products = document.querySelectorAll(".product");
const button = document.querySelector("#addBtn");
const divs = document.querySelectorAll("div");
const withDataId = document.querySelectorAll("[data-id]");
```

---

# MODULE 3 — DOM MANIPULATION

## Understanding Content vs Element

Before manipulating, understand the difference:

### Content Properties

#### `textContent`
```javascript
element.textContent = "New text";
console.log(element.textContent); // "New text"
```
- Sets/gets text only (no HTML parsing)
- Faster than innerHTML
- Safe from XSS attacks
- Includes hidden text
- **Best for**: User input, simple text updates

#### `innerText`
```javascript
element.innerText = "Visible text";
```
- Sets/gets visible text only
- Slower (requires layout calculation)
- Respects CSS visibility
- Excludes hidden elements
- **Avoid**: For performance, use textContent instead

#### `innerHTML`
```javascript
element.innerHTML = "<strong>Bold text</strong>";
```
- Sets/gets HTML and text
- Parses HTML tags
- SECURITY RISK with untrusted data
- Slower than textContent
- **Use carefully**: Only with trusted content

### Comparison Table
| Property | HTML Parsing | Performance | XSS Safe | Use Case |
|----------|-------------|-------------|----------|----------|
| textContent | No | Fastest | Yes | Simple text |
| innerText | No | Slow | Yes | Visible text only |
| innerHTML | Yes | Medium | No | Complex HTML |

## Styling Manipulation

### Via Style Property
```javascript
element.style.color = "red";
element.style.backgroundColor = "blue"; // camelCase
element.style.fontSize = "20px";
element.style.padding = "10px 20px";
```

### Via classList (Recommended)
```javascript
// Add single class
element.classList.add("active");

// Remove single class
element.classList.remove("active");

// Toggle (add if not present, remove if present)
element.classList.toggle("active");

// Check if has class
if (element.classList.contains("active")) {
  console.log("Active!");
}

// Multiple operations
element.classList.add("class1", "class2");
element.classList.remove("class1", "class2");
```

### Why classList is Better Than Direct Style
```javascript
// ❌ Avoid: Direct inline styles (hard to maintain)
element.style.color = "red";
element.style.fontSize = "16px";
element.style.fontWeight = "bold";

// ✅ Use: CSS classes (separation of concerns)
element.classList.add("error-text");
// CSS handles styling
```

## Attribute Manipulation

### `setAttribute()` / `getAttribute()`
```javascript
element.setAttribute("data-status", "active");
const status = element.getAttribute("data-status");
element.removeAttribute("data-status");

// Check if exists
if (element.hasAttribute("data-status")) {
  console.log("Has status");
}
```

### Dataset API (For data-* attributes)
```javascript
// HTML: <div data-user-id="123" data-role="admin"></div>

const div = document.querySelector("div");

// Get
console.log(div.dataset.userId); // "123"
console.log(div.dataset.role);   // "admin"

// Set
div.dataset.status = "active";
// Becomes: data-status="active"

// Remove
delete div.dataset.status;
```

### Common Attributes
```javascript
// Input elements
element.disabled = true;
element.checked = true;
element.placeholder = "Enter name...";

// Visibility
element.hidden = true; // equivalent to display: none

// Standard attributes
element.id = "newId";
element.className = "class1 class2"; // replaces all classes
element.title = "Tooltip text";
```

---

## Complete Module 3 Example

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .highlight { background: yellow; padding: 5px; }
    .error { color: red; border: 2px solid red; }
    .success { color: green; border: 2px solid green; }
  </style>
</head>
<body>
  <h1 id="title">Welcome</h1>
  <p class="description">Original description</p>
  <button id="updateBtn">Update Content</button>
  <button id="styleBtn">Add Style</button>
  <button id="attrBtn">Set Attribute</button>

  <script>
    const title = document.getElementById("title");
    const desc = document.querySelector(".description");
    const updateBtn = document.getElementById("updateBtn");
    const styleBtn = document.getElementById("styleBtn");
    const attrBtn = document.getElementById("attrBtn");

    // Update content
    updateBtn.addEventListener("click", () => {
      title.textContent = "Title Updated!";
      desc.innerHTML = "<strong>New description with HTML</strong>";
    });

    // Add styles via classList
    styleBtn.addEventListener("click", () => {
      title.classList.toggle("highlight");
      desc.classList.add("error");
    });

    // Set attributes
    attrBtn.addEventListener("click", () => {
      title.setAttribute("data-status", "important");
      title.dataset.level = "high";
      console.log(title.dataset.status); // "important"
    });
  </script>
</body>
</html>
```

---

## Exercise 3: DOM Manipulation Challenge

### HTML
```html
<div id="card">
  <h2>Title</h2>
  <p>Description</p>
  <button id="editBtn">Edit Card</button>
</div>
```

### Requirements
1. On button click, change the title to "Edited Title"
2. Add red text color to the paragraph
3. Add a 2px solid blue border to the card
4. Set data-edited="true" on the card
5. Disable the button after click

### Answer
```javascript
const editBtn = document.getElementById("editBtn");
const card = document.getElementById("card");

editBtn.addEventListener("click", () => {
  card.querySelector("h2").textContent = "Edited Title";
  card.querySelector("p").style.color = "red";
  card.style.border = "2px solid blue";
  card.dataset.edited = "true";
  editBtn.disabled = true;
});
```

---

# MODULE 4 — CREATING & REMOVING ELEMENTS

## Creating Elements

### `document.createElement()`
```javascript
const div = document.createElement("div");
const button = document.createElement("button");
const li = document.createElement("li");

// Set properties
div.className = "container";
div.id = "main";
button.textContent = "Click me";
```

## Inserting Elements

### `appendChild()` - Add to end
```javascript
const parent = document.getElementById("list");
const newItem = document.createElement("li");
newItem.textContent = "New item";

parent.appendChild(newItem); // Adds to end
```

### `prepend()` - Add to beginning
```javascript
const parent = document.getElementById("list");
const newItem = document.createElement("li");
newItem.textContent = "First item";

parent.prepend(newItem); // Adds to beginning
```

### `insertBefore()` - Insert at specific position
```javascript
const parent = document.getElementById("list");
const newItem = document.createElement("li");
const referenceItem = parent.children[1];

parent.insertBefore(newItem, referenceItem);
// Inserts before the second child
```

### `insertAdjacentHTML()` - Insert HTML string
```javascript
const element = document.getElementById("target");

element.insertAdjacentHTML("beforebegin", "<div>Before</div>");
element.insertAdjacentHTML("afterbegin", "<div>Inside before</div>");
element.insertAdjacentHTML("beforeend", "<div>Inside after</div>");
element.insertAdjacentHTML("afterend", "<div>After</div>");
```

Position options:
- `beforebegin`: Before the element itself
- `afterbegin`: Inside the element, before first child
- `beforeend`: Inside the element, after last child
- `afterend`: After the element itself

### `insertAdjacentElement()` - Insert element object
```javascript
const newDiv = document.createElement("div");
const target = document.getElementById("target");

target.insertAdjacentElement("afterend", newDiv);
```

## Removing Elements

### `remove()` - Modern approach
```javascript
const element = document.getElementById("item");
element.remove(); // Removes from DOM
```

### `removeChild()` - Traditional approach
```javascript
const parent = document.getElementById("list");
const child = parent.children[0];

parent.removeChild(child);
```

## Cloning Elements

### `cloneNode()`
```javascript
const original = document.getElementById("template");
const clone = original.cloneNode(false); // Shallow copy (no children)
const deepClone = original.cloneNode(true); // Deep copy (with children)

document.body.appendChild(clone);
```

---

## Complete Module 4 Example

```html
<!DOCTYPE html>
<html>
<body>
  <button id="addBtn">Add Item</button>
  <button id="removeBtn">Remove Last</button>
  <ul id="list">
    <li>Item 1</li>
  </ul>

  <script>
    const addBtn = document.getElementById("addBtn");
    const removeBtn = document.getElementById("removeBtn");
    const list = document.getElementById("list");
    let counter = 2;

    // Add item
    addBtn.addEventListener("click", () => {
      const li = document.createElement("li");
      li.textContent = `Item ${counter}`;
      
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "✕";
      deleteBtn.style.marginLeft = "10px";
      
      deleteBtn.addEventListener("click", () => {
        li.remove();
      });
      
      li.appendChild(deleteBtn);
      list.appendChild(li);
      counter++;
    });

    // Remove last item
    removeBtn.addEventListener("click", () => {
      const lastItem = list.lastElementChild;
      if (lastItem) lastItem.remove();
    });
  </script>
</body>
</html>
```

---

## Exercise 4: Dynamic List Creation

### Requirements
1. Create 5 list items dynamically
2. Each item has a delete button
3. Click delete removes that item
4. Add CSS class "item" to each li

### Answer
```javascript
const list = document.getElementById("list");

for (let i = 1; i <= 5; i++) {
  const li = document.createElement("li");
  li.className = "item";
  li.textContent = `Item ${i}`;
  
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => li.remove());
  
  li.appendChild(deleteBtn);
  list.appendChild(li);
}
```

---

# MODULE 5 — DOM TRAVERSAL

## Understanding Node Relationships

```
        <div id="parent">
          <p>Sibling 1</p>
          <span id="target">Target</span>  ← current element
          <p>Sibling 2</p>
        </div>
```

## Parent Navigation

### `parentElement`
```javascript
const target = document.getElementById("target");
const parent = target.parentElement; // <div id="parent">

// Chain navigation
const grandparent = target.parentElement.parentElement;
```

### `closest()` - Find nearest ancestor matching selector
```javascript
const button = document.querySelector("button");

// Find nearest div ancestor
const divAncestor = button.closest("div");

// Find nearest element with class
const container = button.closest(".container");

// Traverse up looking for matching ancestor
const form = button.closest("form");
```

**Why closest() matters**:
```javascript
// ❌ Brittle - assumes structure
const form = button.parentElement.parentElement.parentElement;

// ✅ Robust - works regardless of depth
const form = button.closest("form");
```

## Children Navigation

### `children` - Direct children only
```javascript
const parent = document.getElementById("container");

console.log(parent.children);        // HTMLCollection
console.log(parent.children.length); // number of children
console.log(parent.children[0]);     // first child element
```

### `firstElementChild` / `lastElementChild`
```javascript
const parent = document.getElementById("container");

const first = parent.firstElementChild;
const last = parent.lastElementChild;

// Useful for lists
const firstItem = list.firstElementChild;
```

### `childNodes` - All nodes including text nodes
```javascript
const parent = document.getElementById("container");

// Includes text nodes and comment nodes
console.log(parent.childNodes);

// Usually not what you want - use children instead
```

## Sibling Navigation

### `nextElementSibling` / `previousElementSibling`
```javascript
const current = document.getElementById("item2");

const next = current.nextElementSibling;     // item3
const prev = current.previousElementSibling; // item1
```

### Practical sibling examples
```javascript
// Get all siblings
function getSiblings(element) {
  return Array.from(element.parentElement.children)
    .filter(child => child !== element);
}

const siblings = getSiblings(element);

// Get next 3 siblings
function getNextSiblings(element, count) {
  const siblings = [];
  let sibling = element.nextElementSibling;
  
  while (sibling && siblings.length < count) {
    siblings.push(sibling);
    sibling = sibling.nextElementSibling;
  }
  
  return siblings;
}
```

## Filtering and Searching Within Elements

### `querySelector()` from element (scoped search)
```javascript
const container = document.getElementById("container");

// Search only within container
const firstButton = container.querySelector("button");
const allParagraphs = container.querySelectorAll("p");
```

### `matches()` - Check if element matches selector
```javascript
const element = document.querySelector("button");

if (element.matches(".active")) {
  console.log("Element has active class");
}

if (element.matches("button[disabled]")) {
  console.log("Button is disabled");
}
```

### `contains()` - Check if element contains another
```javascript
const parent = document.getElementById("container");
const child = document.getElementById("item");

if (parent.contains(child)) {
  console.log("Container has this child");
}
```

---

## Complete Module 5 Example

```html
<!DOCTYPE html>
<html>
<body>
  <div id="container" class="wrapper">
    <h1>Products</h1>
    <div class="product" data-id="1">
      <h3>Product 1</h3>
      <p>Description</p>
      <button class="details">View Details</button>
    </div>
    <div class="product" data-id="2">
      <h3>Product 2</h3>
      <p>Description</p>
      <button class="details">View Details</button>
    </div>
  </div>

  <script>
    // Select button and traverse to product container
    const firstButton = document.querySelector(".details");
    const productCard = firstButton.closest(".product");
    console.log(productCard.dataset.id); // "1"

    // Get parent container
    const container = productCard.parentElement;

    // Get all product siblings
    const allProducts = productCard.parentElement.querySelectorAll(".product");

    // Get next sibling
    const nextProduct = productCard.nextElementSibling;
    if (nextProduct && nextProduct.classList.contains("product")) {
      console.log("Next product found");
    }

    // Iterate through children
    Array.from(productCard.children).forEach(child => {
      console.log(child.textContent);
    });
  </script>
</body>
</html>
```

---

## Exercise 5: DOM Traversal Challenge

### HTML
```html
<div id="main" class="container">
  <header>
    <h1>Store</h1>
  </header>
  <main>
    <div class="product">
      <h2>Laptop</h2>
      <p>$999</p>
      <button class="buy">Buy Now</button>
    </div>
  </main>
</div>
```

### Questions
1. From the button, get the product container
2. From the button, get the price paragraph
3. From the button, get the h1 in header
4. Find all buttons inside main
5. Check if the button is inside the product div

### Answers
```javascript
const btn = document.querySelector(".buy");

// 1. Get product container
const product = btn.closest(".product");

// 2. Get price
const price = btn.closest(".product").querySelector("p");

// 3. Get h1
const h1 = btn.closest("#main").querySelector("h1");

// 4. Find all buttons in main
const buttons = document.querySelector("main").querySelectorAll("button");

// 5. Check containment
const productDiv = document.querySelector(".product");
console.log(productDiv.contains(btn)); // true
```

---

# MODULE 6 — EVENTS (THE BACKBONE OF INTERACTIVITY)

## Event Fundamentals

### What is an Event?
An event is a signal that something has happened in the browser (user action, browser action, etc).

### Event Types Reference

| Category | Events |
|----------|--------|
| **Click Events** | click, dblclick, mousedown, mouseup |
| **Mouse Events** | mouseover, mouseout, mousemove, mouseenter, mouseleave |
| **Keyboard Events** | keydown, keyup, keypress |
| **Form Events** | submit, change, input, focus, blur, reset |
| **Document Events** | load, unload, DOMContentLoaded, readystatechange |
| **Window Events** | resize, scroll, beforeunload |
| **Touch Events** | touchstart, touchend, touchmove |
| **Drag Events** | dragstart, drag, dragend, drop |

## Attaching Event Listeners

### Method 1: `addEventListener()` - Recommended
```javascript
element.addEventListener("click", (event) => {
  console.log("Clicked!");
});

// With named function
function handleClick(event) {
  console.log("Clicked!");
}
element.addEventListener("click", handleClick);

// Remove listener
element.removeEventListener("click", handleClick);
```

### Method 2: Inline event handler (Old, avoid)
```html
<button onclick="handleClick()">Click</button>
```

### Method 3: Property assignment (Avoid)
```javascript
element.onclick = function() {
  console.log("Clicked!");
};
```

**Why use addEventListener()?**
- Can attach multiple listeners
- Can remove listeners
- Supports event phases
- Better practice

## The Event Object

### Common Event Properties
```javascript
element.addEventListener("click", (event) => {
  console.log(event.type);           // "click"
  console.log(event.target);         // element clicked
  console.log(event.currentTarget);  // element with listener
  console.log(event.timeStamp);      // time event occurred
  console.log(event.preventDefault); // method to cancel default
  console.log(event.stopPropagation); // method to stop bubbling
});
```

### event.target vs event.currentTarget
```javascript
// HTML: <div id="parent"><button id="child">Click</button></div>

const parent = document.getElementById("parent");
parent.addEventListener("click", (event) => {
  console.log(event.target);        // <button> (what was clicked)
  console.log(event.currentTarget);  // <div> (element with listener)
});
```

## Event Bubbling and Capturing

### Event Propagation Phases

```
    Capturing Phase (down)
         |
         v
    ┌─────────────┐
    │  document   │
    ├─────────────┤
    │   body      │
    ├─────────────┤
    │  container  │
    ├─────────────┤
    │   button    │ ← event target
    └─────────────┘
         |
         v
    Bubbling Phase (up)
```

### Phase 1: Capturing (rarely used)
```javascript
// Capture phase (third parameter = true)
element.addEventListener("click", handler, true);
// Fires on the way DOWN to the target
```

### Phase 2: Target
```javascript
// Target phase - listener on the clicked element
element.addEventListener("click", handler);
// Fires when reaching the target
```

### Phase 3: Bubbling (most common)
```javascript
// Bubble phase (third parameter = false, default)
element.addEventListener("click", handler, false);
// Fires on the way UP from the target
```

### Practical Bubbling Example
```html
<div id="outer">
  <div id="middle">
    <button id="inner">Click</button>
  </div>
</div>

<script>
document.getElementById("outer").addEventListener("click", () => {
  console.log("Outer clicked");
});

document.getElementById("middle").addEventListener("click", () => {
  console.log("Middle clicked");
});

document.getElementById("inner").addEventListener("click", () => {
  console.log("Inner clicked");
});

// Click button outputs:
// Inner clicked
// Middle clicked
// Outer clicked
</script>
```

## Controlling Event Propagation

### `stopPropagation()` - Stop bubbling
```javascript
document.getElementById("middle").addEventListener("click", (e) => {
  e.stopPropagation();
  console.log("Middle clicked");
  // Outer listener won't fire
});
```

### `preventDefault()` - Cancel default behavior
```javascript
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault(); // Don't submit form
  // Perform validation instead
  console.log("Form prevented");
});

// Link example
document.querySelector("a").addEventListener("click", (e) => {
  e.preventDefault(); // Don't navigate
  console.log("Navigation prevented");
});
```

### `stopImmediatePropagation()` - Stop all propagation
```javascript
element.addEventListener("click", (e) => {
  e.stopImmediatePropagation();
  console.log("First listener");
});

element.addEventListener("click", () => {
  console.log("Second listener"); // Won't fire
});
```

## Event Delegation - Professional Pattern

### Problem: Many listeners = Memory overhead
```javascript
// ❌ Inefficient - 1000 listeners for 1000 items
const items = document.querySelectorAll(".item");
items.forEach(item => {
  item.addEventListener("click", handleClick);
});
```

### Solution: Single listener on parent
```javascript
// ✅ Efficient - 1 listener on parent
const list = document.getElementById("list");

list.addEventListener("click", (event) => {
  // Check if click was on an .item
  if (event.target.classList.contains("item")) {
    handleClick(event.target);
  }
});

function handleClick(itemElement) {
  console.log("Item clicked:", itemElement.textContent);
}
```

### Real-world example with delegation
```html
<ul id="todoList">
  <li class="todo">Task 1 <button class="delete">×</button></li>
  <li class="todo">Task 2 <button class="delete">×</button></li>
  <li class="todo">Task 3 <button class="delete">×</button></li>
</ul>

<script>
const list = document.getElementById("todoList");

list.addEventListener("click", (event) => {
  const deleteBtn = event.target.closest(".delete");
  
  if (deleteBtn) {
    const todoItem = deleteBtn.closest(".todo");
    todoItem.remove();
  }
});
</script>
```

**Advantages of Delegation:**
- Single event listener (memory efficient)
- Works with dynamically added elements
- Cleaner code
- Professional pattern

## Keyboard Events

```javascript
document.addEventListener("keydown", (event) => {
  console.log(event.key);        // "a", "Enter", "Shift", etc
  console.log(event.code);       // "KeyA", "Enter", "ShiftLeft"
  console.log(event.keyCode);    // Deprecated - don't use
  console.log(event.ctrlKey);    // true/false
  console.log(event.shiftKey);   // true/false
  console.log(event.altKey);     // true/false
});

// Practical: Keyboard shortcuts
document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key === "s") {
    event.preventDefault();
    console.log("Save triggered");
  }
});
```

## Form Events

```javascript
const form = document.getElementById("myForm");

// Submit
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  console.log(formData.get("username"));
});

// Input (fires on every keystroke)
const input = document.querySelector("input");
input.addEventListener("input", (event) => {
  console.log(event.target.value);
});

// Change (fires when value committed)
input.addEventListener("change", (event) => {
  console.log("Value changed to:", event.target.value);
});

// Focus/Blur
input.addEventListener("focus", () => console.log("Focused"));
input.addEventListener("blur", () => console.log("Blurred"));
```

---

## Complete Module 6 Example

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .highlight { background: yellow; }
    .error { color: red; }
  </style>
</head>
<body>
  <form id="contactForm">
    <input type="text" name="name" placeholder="Name" required>
    <input type="email" name="email" placeholder="Email" required>
    <button type="submit">Send</button>
  </form>

  <ul id="items">
    <li class="item">Item 1 <button class="delete">Delete</button></li>
    <li class="item">Item 2 <button class="delete">Delete</button></li>
  </ul>

  <script>
    // Form submission
    document.getElementById("contactForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.querySelector("input[name='name']").value;
      console.log("Form submitted:", name);
    });

    // Event delegation for item deletion
    document.getElementById("items").addEventListener("click", (event) => {
      if (event.target.classList.contains("delete")) {
        const item = event.target.closest(".item");
        item.remove();
      }
    });

    // Input event
    document.querySelector("input[name='name']").addEventListener("input", (e) => {
      console.log("User typed:", e.target.value);
    });
  </script>
</body>
</html>
```

---

## Exercise 6: Event Handling Challenge

### HTML
```html
<div id="container">
  <input type="text" id="taskInput" placeholder="New task...">
  <button id="addBtn">Add Task</button>
  <ul id="taskList"></ul>
</div>
```

### Requirements
1. On button click, add new task to list
2. Each task has a delete button
3. Use event delegation for delete buttons
4. Prevent default form submission if used
5. Clear input after adding task

### Answer
```javascript
const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Add task
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  if (!taskInput.value.trim()) return;
  
  const li = document.createElement("li");
  li.innerHTML = `
    ${taskInput.value}
    <button class="delete">×</button>
  `;
  
  taskList.appendChild(li);
  taskInput.value = "";
}

// Delete task (event delegation)
taskList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
});
```

---

# MODULE 7 — ADVANCED DOM CONCEPTS

## DOM Properties and Measurements

### Node Properties

```javascript
const element = document.querySelector("div");

// Node information
console.log(element.nodeType);   // 1 (ELEMENT_NODE), 3 (TEXT_NODE), etc
console.log(element.nodeName);   // "DIV"
console.log(element.nodeValue);  // null for elements, text for text nodes
```

Node types:
- 1 = ELEMENT_NODE
- 3 = TEXT_NODE
- 8 = COMMENT_NODE
- 9 = DOCUMENT_NODE

### Size and Position Properties

#### Offset Properties (Position relative to offsetParent)
```javascript
const element = document.querySelector("div");

console.log(element.offsetWidth);   // width including border
console.log(element.offsetHeight);  // height including border
console.log(element.offsetTop);     // distance from top of offsetParent
console.log(element.offsetLeft);    // distance from left of offsetParent
console.log(element.offsetParent);  // parent element used for calculation
```

#### Client Properties (Content + padding, NO border)
```javascript
console.log(element.clientWidth);   // width including padding, no border
console.log(element.clientHeight);  // height including padding, no border
console.log(element.clientTop);     // border top thickness
console.log(element.clientLeft);    // border left thickness
```

#### Scroll Properties
```javascript
console.log(element.scrollWidth);   // total scrollable width
console.log(element.scrollHeight);  // total scrollable height
console.log(element.scrollTop);     // pixels scrolled down
console.log(element.scrollLeft);    // pixels scrolled right
```

#### getBoundingClientRect() - Position relative to viewport
```javascript
const rect = element.getBoundingClientRect();

console.log(rect.top);      // distance from top of viewport
console.log(rect.left);     // distance from left of viewport
console.log(rect.bottom);   // distance from bottom of viewport
console.log(rect.right);    // distance from right of viewport
console.log(rect.width);    // element width
console.log(rect.height);   // element height
```

**Practical use**: Check if element is in viewport
```javascript
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= window.innerHeight &&
    rect.right <= window.innerWidth
  );
}
```

### scrollIntoView()
```javascript
const element = document.querySelector("#target");
element.scrollIntoView(); // Smooth scroll into view
element.scrollIntoView({ behavior: "smooth" });
```

---

## DOM Performance Optimization

### 1. Document Fragments
```javascript
// ❌ Bad: Multiple reflows
const list = document.getElementById("list");
for (let i = 0; i < 1000; i++) {
  const li = document.createElement("li");
  li.textContent = `Item ${i}`;
  list.appendChild(li); // Reflows every iteration!
}

// ✅ Good: Single reflow
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const li = document.createElement("li");
  li.textContent = `Item ${i}`;
  fragment.appendChild(li);
}
list.appendChild(fragment); // Single reflow!
```

### 2. Batch DOM Updates
```javascript
// ❌ Bad: Multiple reflows
element.style.width = "100px";
element.style.height = "100px";
element.style.backgroundColor = "blue";

// ✅ Good: Single reflow
element.style.cssText = "width: 100px; height: 100px; background-color: blue;";

// Or use classList
element.classList.add("large", "blue");
```

### 3. requestAnimationFrame() vs setTimeout()
```javascript
// ❌ Less efficient for animations
setTimeout(() => {
  element.style.transform = "translateX(10px)";
}, 16);

// ✅ Optimized for animations
requestAnimationFrame(() => {
  element.style.transform = "translateX(10px)";
});
```

---

## Custom Events

### Creating and Dispatching Events

```javascript
// Create custom event
const event = new Event("myEvent", { bubbles: true, cancelable: true });

// Dispatch from element
element.dispatchEvent(event);

// Listen for custom event
element.addEventListener("myEvent", () => {
  console.log("Custom event fired!");
});

// Practical: User action triggers custom event
element.addEventListener("click", () => {
  const customEvent = new Event("itemSelected", { bubbles: true });
  element.dispatchEvent(customEvent);
});

document.addEventListener("itemSelected", () => {
  console.log("Item was selected!");
});
```

### Custom Events with Data

```javascript
// Create event with custom data
const event = new CustomEvent("productAdded", {
  detail: { id: 123, name: "Laptop", price: 999 },
  bubbles: true
});

// Dispatch
element.dispatchEvent(event);

// Listen
document.addEventListener("productAdded", (event) => {
  console.log(event.detail); // { id: 123, name: "Laptop", price: 999 }
});
```

---

## Form Data API

### Working with Forms
```javascript
const form = document.getElementById("myForm");

// Get all form data
const formData = new FormData(form);

// Iterate through data
for (let [key, value] of formData.entries()) {
  console.log(key, value);
}

// Get specific field
console.log(formData.get("username"));

// Modify data
formData.set("username", "newName");
formData.append("tag", "important");

// Send to server
fetch("/api/submit", {
  method: "POST",
  body: formData
});
```

### Form Validation
```javascript
const form = document.getElementById("myForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const email = form.querySelector("input[name='email']");
  const password = form.querySelector("input[name='password']");
  
  // HTML5 validation
  if (!form.checkValidity()) {
    console.log("Form is invalid");
    return;
  }
  
  // Custom validation
  if (password.value.length < 8) {
    password.classList.add("error");
    console.log("Password too short");
    return;
  }
  
  // Submit valid form
  console.log("Form is valid, submitting...");
});
```

---

# MODULE 8 — DEBUGGING DOM ISSUES

## Chrome DevTools for DOM

### Element Inspector
1. Right-click element → "Inspect"
2. View HTML structure
3. Live edit elements and styles
4. Check element dimensions (computed values)

### Console Methods for DOM Debugging
```javascript
// Select and log element
const el = document.querySelector(".item");
console.log(el);

// Log with label
console.log("Element:", el);

// Detailed object view
console.table(el);

// View all listeners on element
getEventListeners(el); // Chrome DevTools only
```

### Performance Profiling
1. Chrome DevTools → Performance tab
2. Record user interaction
3. Identify reflows and repaints
4. Optimize bottlenecks

### Common DOM Issues and Solutions

#### Issue 1: Elements Not Found
```javascript
// ❌ Returns null, causes error
const el = document.querySelector(".nonexistent");
el.addEventListener("click", handler); // Error!

// ✅ Check existence first
const el = document.querySelector(".nonexistent");
if (el) {
  el.addEventListener("click", handler);
}

// ✅ Or use optional chaining (modern)
el?.addEventListener("click", handler);
```

#### Issue 2: Event Not Firing
```javascript
// Common causes:
// 1. Element not found
// 2. Event name misspelled
// 3. Listener attached before element exists
// 4. Element removed from DOM

// Debug:
const button = document.querySelector("button");
console.log("Button found:", button); // Check if null
console.log("Button events:", getEventListeners(button)); // Chrome DevTools
```

#### Issue 3: Performance - Too Many Listeners
```javascript
// ❌ 1000 listeners attached
items.forEach(item => {
  item.addEventListener("click", handler);
});

// ✅ Use event delegation
parent.addEventListener("click", (e) => {
  if (e.target.closest(".item")) {
    handler(e.target);
  }
});
```

---

# MODULE 9 — REAL PROJECT: EXPENSE TRACKER

## Project Overview
Build a complete expense tracking application that demonstrates all DOM concepts.

## Features Required
- ✅ Add income/expense transactions
- ✅ Display running total
- ✅ Delete transactions
- ✅ Dynamic styling based on transaction type
- ✅ Persistent data (localStorage)
- ✅ Responsive design

## Complete Code

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Expense Tracker</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }

    .container {
      background: white;
      border-radius: 10px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      padding: 30px;
      width: 100%;
      max-width: 600px;
    }

    h1 {
      color: #333;
      margin-bottom: 30px;
      text-align: center;
    }

    .summary {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 30px;
    }

    .summary-card {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      border-left: 4px solid;
    }

    .summary-card.income {
      border-left-color: #10b981;
    }

    .summary-card.expense {
      border-left-color: #ef4444;
    }

    .summary-card h3 {
      color: #666;
      font-size: 14px;
      margin-bottom: 10px;
      text-transform: uppercase;
    }

    .summary-card .amount {
      font-size: 24px;
      font-weight: bold;
    }

    .summary-card.income .amount {
      color: #10b981;
    }

    .summary-card.expense .amount {
      color: #ef4444;
    }

    .input-form {
      display: grid;
      gap: 15px;
      margin-bottom: 30px;
      padding-bottom: 30px;
      border-bottom: 2px solid #e5e7eb;
    }

    .input-group {
      display: flex;
      gap: 10px;
    }

    input, select {
      flex: 1;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 14px;
    }

    input:focus, select:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 5px rgba(102, 126, 234, 0.1);
    }

    button.add-btn {
      background: #667eea;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
      transition: background 0.3s;
    }

    button.add-btn:hover {
      background: #5568d3;
    }

    .transactions-list {
      max-height: 400px;
      overflow-y: auto;
    }

    .transaction-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 5px;
      margin-bottom: 10px;
      border-left: 4px solid;
      animation: slideIn 0.3s ease;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .transaction-item.income {
      border-left-color: #10b981;
    }

    .transaction-item.expense {
      border-left-color: #ef4444;
    }

    .transaction-info {
      flex: 1;
    }

    .transaction-description {
      font-weight: 500;
      color: #333;
      margin-bottom: 5px;
    }

    .transaction-type {
      font-size: 12px;
      color: #999;
      text-transform: uppercase;
    }

    .transaction-amount {
      font-size: 18px;
      font-weight: bold;
      margin-right: 15px;
    }

    .transaction-item.income .transaction-amount {
      color: #10b981;
    }

    .transaction-item.expense .transaction-amount {
      color: #ef4444;
    }

    button.delete-btn {
      background: #ef4444;
      color: white;
      border: none;
      padding: 8px 15px;
      border-radius: 3px;
      cursor: pointer;
      font-size: 12px;
      transition: background 0.3s;
    }

    button.delete-btn:hover {
      background: #dc2626;
    }

    .empty-state {
      text-align: center;
      color: #999;
      padding: 40px 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>💰 Expense Tracker</h1>

    <div class="summary">
      <div class="summary-card income">
        <h3>Total Income</h3>
        <div class="amount" id="totalIncome">KES 0</div>
      </div>
      <div class="summary-card expense">
        <h3>Total Expense</h3>
        <div class="amount" id="totalExpense">KES 0</div>
      </div>
    </div>

    <div class="input-form">
      <div class="input-group">
        <input type="text" id="description" placeholder="Description" required>
        <input type="number" id="amount" placeholder="Amount" required>
        <select id="type">
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <button class="add-btn" id="addBtn">Add Transaction</button>
    </div>

    <div class="transactions-list" id="transactionsList"></div>
    <div class="empty-state" id="emptyState">
      No transactions yet. Add one to get started!
    </div>
  </div>

  <script>
    // Application State
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    // DOM Elements
    const descriptionInput = document.getElementById("description");
    const amountInput = document.getElementById("amount");
    const typeSelect = document.getElementById("type");
    const addBtn = document.getElementById("addBtn");
    const transactionsList = document.getElementById("transactionsList");
    const emptyState = document.getElementById("emptyState");
    const totalIncomeEl = document.getElementById("totalIncome");
    const totalExpenseEl = document.getElementById("totalExpense");

    // Event Listeners
    addBtn.addEventListener("click", addTransaction);
    descriptionInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") addTransaction();
    });

    // Event delegation for delete buttons
    transactionsList.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-btn")) {
        const id = parseInt(e.target.dataset.id);
        deleteTransaction(id);
      }
    });

    // Add Transaction
    function addTransaction() {
      const description = descriptionInput.value.trim();
      const amount = parseFloat(amountInput.value);
      const type = typeSelect.value;

      // Validate
      if (!description || !amount || amount <= 0) {
        alert("Please fill all fields with valid data");
        return;
      }

      // Create transaction object
      const transaction = {
        id: Date.now(),
        description,
        amount,
        type,
        date: new Date().toLocaleDateString()
      };

      // Add to array and save
      transactions.unshift(transaction);
      localStorage.setItem("transactions", JSON.stringify(transactions));

      // Clear inputs
      descriptionInput.value = "";
      amountInput.value = "";
      typeSelect.value = "income";

      // Render
      render();
    }

    // Delete Transaction
    function deleteTransaction(id) {
      transactions = transactions.filter(t => t.id !== id);
      localStorage.setItem("transactions", JSON.stringify(transactions));
      render();
    }

    // Render Transactions
    function render() {
      // Clear list
      transactionsList.innerHTML = "";

      if (transactions.length === 0) {
        emptyState.style.display = "block";
        totalIncomeEl.textContent = "KES 0";
        totalExpenseEl.textContent = "KES 0";
        return;
      }

      emptyState.style.display = "none";

      // Render each transaction
      transactions.forEach(transaction => {
        const div = document.createElement("div");
        div.className = `transaction-item ${transaction.type}`;
        div.innerHTML = `
          <div class="transaction-info">
            <div class="transaction-description">${transaction.description}</div>
            <div class="transaction-type">${transaction.type} • ${transaction.date}</div>
          </div>
          <div class="transaction-amount">
            ${transaction.type === "income" ? "+" : "-"} KES ${transaction.amount}
          </div>
          <button class="delete-btn" data-id="${transaction.id}">Delete</button>
        `;
        transactionsList.appendChild(div);
      });

      // Calculate totals
      const totalIncome = transactions
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

      const totalExpense = transactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

      // Update display
      totalIncomeEl.textContent = `KES ${totalIncome.toLocaleString()}`;
      totalExpenseEl.textContent = `KES ${totalExpense.toLocaleString()}`;
    }

    // Initial render
    render();
  </script>
</body>
</html>
```

## Key Concepts Demonstrated
- ✅ DOM selection and manipulation
- ✅ Event listeners and delegation
- ✅ Array methods (filter, reduce)
- ✅ localStorage API
- ✅ Dynamic element creation
- ✅ Event handling (click, keypress)
- ✅ Form validation
- ✅ Template literals for HTML
- ✅ CSS animations
- ✅ Responsive design

---

# MODULE 10 — FINAL ASSESSMENT

## Project-Based Assessment

### Part A: Code Review
Students review provided DOM code and identify:
- Performance issues
- Memory leaks
- Accessibility problems
- Best practice violations

### Part B: Building a Component
**Task**: Build a tabbed interface component
- HTML structure with tabs and content
- CSS styling and animations
- JavaScript for tab switching
- Event delegation
- Accessibility features

### Part C: Debugging Challenge
Provide broken code with:
- Event listeners not working
- Memory leaks
- Performance issues
- Logic errors
- Students must identify and fix all issues

---

# APPENDIX A — COMMON PITFALLS & SOLUTIONS

## Pitfall 1: Accessing DOM Before Page Loads
```javascript
// ❌ May fail - element might not exist yet
document.getElementById("myElement").textContent = "Hello";

// ✅ Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("myElement").textContent = "Hello";
});

// ✅ Or place script before </body>
```

## Pitfall 2: Memory Leaks with Event Listeners
```javascript
// ❌ Listener not removed, stays in memory even if element removed
const element = document.createElement("div");
const handler = () => console.log("Clicked");
element.addEventListener("click", handler);
element.remove(); // Listener still in memory!

// ✅ Remove listener before removing element
element.removeEventListener("click", handler);
element.remove();
```

## Pitfall 3: Performance: Reflow in Loops
```javascript
// ❌ Causes multiple reflows
const list = document.getElementById("list");
for (let i = 0; i < 1000; i++) {
  const li = document.createElement("li");
  list.appendChild(li); // Reflow each iteration!
}

// ✅ Use document fragment
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const li = document.createElement("li");
  fragment.appendChild(li);
}
list.appendChild(fragment); // Single reflow!
```

## Pitfall 4: XSS Vulnerability
```javascript
// ❌ Dangerous with user input
const userInput = "<img src=x onerror='alert(\"XSS\")'>";
element.innerHTML = userInput; // XSS attack!

// ✅ Use textContent for user input
element.textContent = userInput; // Safe

// ✅ Or sanitize HTML if needed
// Use a library like DOMPurify
```

## Pitfall 5: Event Capturing Confusion
```javascript
// ❌ Listeners on both capture and bubble
element.addEventListener("click", handler, true);  // Capture
element.addEventListener("click", handler2, false); // Bubble

// ✅ Be consistent and clear
element.addEventListener("click", handler); // Always bubble (default)
```

---

# APPENDIX B — DOM API REFERENCE CHEAT SHEET

## Selection
```javascript
document.getElementById("id")
document.querySelector("selector")
document.querySelectorAll("selector")
element.parentElement
element.children
element.firstElementChild
element.nextElementSibling
```

## Manipulation
```javascript
element.textContent = "text"
element.innerHTML = "<tag>html</tag>"
element.style.property = "value"
element.classList.add/remove/toggle("class")
element.setAttribute("attr", "value")
element.dataset.key = "value"
```

## Creation
```javascript
document.createElement("tag")
element.appendChild(child)
element.prepend(child)
element.insertBefore(new, ref)
element.remove()
```

## Events
```javascript
element.addEventListener("event", handler)
element.removeEventListener("event", handler)
event.preventDefault()
event.stopPropagation()
```

## Properties
```javascript
element.offsetWidth / offsetHeight
element.clientWidth / clientHeight
element.scrollTop / scrollLeft
element.getBoundingClientRect()
```

---

# TEACHING TIPS FOR INSTRUCTORS

## Day 1 Structure
- **Hour 1**: Modules 0-1 (Foundation + Browser Environment)
- **Hour 2**: Module 2 (Selection - hands-on)
- **Hour 3**: Module 3 (Manipulation - live coding)
- **Exercise Session**: Multiple practice problems

## Day 2 Structure
- **Hour 1**: Module 4 (Creating/Removing)
- **Hour 2**: Module 5 (Traversal)
- **Hour 3**: Module 6 (Events - most important)
- **Exercise Session**: Event delegation focus

## Day 3 Structure
- **Hour 1**: Module 7 (Advanced concepts)
- **Hour 2**: Module 8 (Debugging)
- **Hour 3**: Module 9 Introduction
- **Exercise Session**: Guided project work

## Day 4
- **Full Day**: Project completion and presentation

## Engagement Strategies
- Use live coding heavily - type in front of students
- Encourage questions and break understanding
- Provide broken code for debugging practice
- Celebrate small wins
- Show real-world applications (Instagram, Twitter, etc.)
- Compare before/after code

## Assessment Methods
- Live coding during exercises
- Code review of submissions
- Project demonstrations
- Debugging challenges
- Peer review sessions

---

# RESOURCES FOR STUDENTS

## Key References
- MDN Web Docs (JavaScript and DOM API)
- Can I Use (browser compatibility)
- Chrome DevTools documentation
- JavaScript.info (educational resource)

## Practice Websites
- FreeCodeCamp interactive lessons
- Codecademy
- LeetCode JavaScript problems
- Frontend Masters (some free content)

## Recommended Projects for Practice
- Todo application
- Weather dashboard (with API calls)
- Image gallery with lightbox
- Calculator app
- Chat interface
- E-commerce product filter
- Expense tracker (provided)

---

# CONCLUSION

This comprehensive DOM masterclass provides everything junior full-stack developers need to master browser-side JavaScript. The progression from basics to advanced concepts ensures deep understanding, and the practical project ties everything together.

Key takeaways for students:
1. DOM is the gateway to modern web development
2. Understanding events is crucial for interactivity
3. Performance optimization matters at scale
4. Event delegation is a professional pattern
5. Debugging skills separate junior from senior developers

By mastering these modules and completing the project, students will be confident full-stack developers ready for real-world applications.
