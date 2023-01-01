# Avoid These Common Pitfalls of React `useState`

`useState` is the React hook that you use most often. It's everywhere. But so are some common mistakes.

You probably have experienced some of them (even if you didn't realize it): redundant, duplicate, or contradicting state. Some of those may force you to have a useEffect that is actually obsolete. And all this combined can become a big trap of unmaintainable and hard-to-read code.

Knowing about these pitfalls helps you

-   make your code easier to read and maintain
-   produce code that’s less prone to bugs
-   get rid of a lot of code complexity.

Not to forget, you won’t easily fall into an embarrassing trap in one of those coding assignments in the hiring process. **The problem is: you first need to become aware of the potential problems around `useState` in order to avoid them.**

So on this page, let's have a look at the most common pitfalls when it comes to state in React. For each of them, you'll see

-   a code example
-   a detailed problem description
-   the solution and
-   an interactive refactoring exercise.

After reading this article and working through the exercises, you'll likely look at your own code in a different way.

## Redundant State

State variables that aren’t necessary are one of the most common problems in code written by Junior developers. You can typically find them whenever one state depends on other state variables.

A simple example is probably the best way to explain the situation. So let’s dive right in.

### The Code Example

Here is a simple component that allows a user to edit their first and last name. Based on the input values their full name is rendered.

![](https://ik.imagekit.io/87wct6jq4ql/tr:w-720/https://media.graphassets.com/OdtUSovSTm6pAp1PQGyb)

Can you spot the redundant state?
```jsx
import { useState } from "react";

function RedundantState() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fullName, setFullName] = useState("");

  const onChangeFirstName = (event) => {
    setFirstName(event.target.value);
    setFullName(`${event.target.value} ${lastName}`);
  };

  const onChangeLastName = (event) => {
    setLastName(event.target.value);
    setFullName(`${firstName} ${event.target.value}`);
  };

  return (
    <>
      <form>
        <input
          value={firstName}
          onChange={onChangeFirstName}
          placeholder="First Name"
        />
        <input
          value={lastName}
          onChange={onChangeLastName}
          placeholder="Last Name"
        />
      </form>
      <div>Full name: {fullName}</div>
    </>
  );
}
```

### The Problem

Your first instinct might say: By updating e.g. the `firstName` and `fullName` states directly after one another we cause an additional render cycle.

```jsx
const onChangeFirstName = (event) => {
  setFirstName(event.target.value);
  setFullName(`${event.target.value} ${lastName}`);
};
```

But as of React 18 state updates are batched. So you don’t see separate renders for each state update.

> Note: the additional render in the screenshot below happens only in development.

![](https://ik.imagekit.io/87wct6jq4ql/tr:w-720/https://media.graphassets.com/aGGWImVZQq436UakjS4s)

So in most cases, there isn’t much of a difference performance-wise. The problem is rather the maintainability and risk of introducing bugs. For example, look at the change handlers again:

```jsx
const onChangeFirstName = (event) => {
  setFirstName(event.target.value);
  setFullName(`${event.target.value} ${lastName}`);
};
const onChangeLastName = (event) => {
  setLastName(event.target.value);
  setFullName(`${firstName} ${event.target.value}`);
};
```

Each time we update either the first or last name we have to remember to update `fullName` as well. In a more complex scenario that can easily be missed. Thus the code is harder to refactor and the risk of introducing bugs is increased.

As mentioned, in most cases you don’t need to worry about performance. But if you have to derive a variable from state that involves large arrays or heavy calculations, you can simply reach for the [useMemo](https://reactjs.org/docs/hooks-reference.html#usememo) hook.

### The Solution

The `fullName` state is simply the first and last name combined. We can directly build it from the `firstName` and `lastName` state variables.

```jsx
export function RedundantState() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const fullName = `${firstName} ${lastName}`;
  
  ...

  return (
    <>
      <form>
        ...
      </form>
      <div>Full name: {fullName}</div>
    </>
  );
}
```

We don’t even need the temporary variable here but can directly render the `firstName` and `lastName` into the JSX.

```jsx
export function RedundantState() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  ...

  return (
    <>
      <form>
        ...
      </form>
      <div>
        Full name: {firstName} {lastName}
      </div>
    </>
  );
}
```

Ok, got it. We should watch out for redundant state that we can replace with simple variables derived from other state. But what’s the problem here?

#### Exercise Time

<br >

<iframe src="https://codesandbox.io/embed/eager-black-bui7ol?view=split,preview&editorsize=60&codemirror=1&fontsize=14&hidenavigation=1&module=/Challenge-1.jsx,/Challenge-2.jsx,/Solution-1.jsx,/Solution-2.jsx&theme=dark"
     style="width:calc(100% + 100px); height:500px; margin: 0 -50px; border:0; border-radius: 4px; overflow:hidden;"
     title="eager-black-bui7ol"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## Duplicate State

Data that is duplicated in multiple state variables is another problem. You typically encounter it when transforming, sorting, or filtering (API) data. Another common case is selecting items as in the example below.

### The Code Example

Here’s a simple component that renders a list of items. The user can open an item in an (imaginary) modal by clicking on the corresponding button.

![](https://ik.imagekit.io/87wct6jq4ql/tr:w-720/https://media.graphassets.com/W3W2iGhBTi6WuungHpWv)

The code below contains a typical mistake that you can often see. Can you find it?

```jsx
import { useState } from "react";

// const items = [
//   {
//     id: "item-1",
//     text: "Item 1",
//   },
//   ...
// ]

function DuplicateState({ items }) {
  const [selectedItem, setSelectedItem] = useState();

  const onClickItem = (item) => {
    setSelectedItem(item);
  };

  return (
    <>
      {selectedItem && <Modal item={selectedItem} />}
      <ul>
        {items.map((row) => (
          <li key={row.id}>
            {row.text}
            <button onClick={() => onClickItem(row)}>Open</button>
          </li>
        ))}
      </ul>
    </>
  );
}
```

The problem is that the complete item is copied into the state.

### The Problem

This again doesn’t seem like a big change. So what’s the deal?

The problem with the duplicated data in the original code is that it violates the [Single Source Of Truth](https://en.wikipedia.org/wiki/Single_source_of_truth) principle. In fact, we have two sources of truth once the user selects any of the items: The `selectedItem` state and the corresponding entry in the `items` array.

Now imagine that the user should be able to edit the item inside the modal. This could look like this:

1.  The user changes the data in the modal and submits it.
2.  A request is sent to the server and updates the item in the database.
3.  The frontend updates the item data (either with the response of the server or by refetching the items array).
4.  The frontend re-renders with the new `items` array.
5.  Now the question is: what happens inside the `DuplicateState` component?

This is where the problem starts. The `selectedItem` state would still contain the old data. It would be out of sync. You can imagine that this can become a nasty bug in a more complex situation.

Of course, we can keep the `selectedItem` state in sync. But we would need to listen to changes in the `items` array with a `useEffect`. And that brings us to the next section.

### The Solution

A simpler solution is to only track the selected id. As you can see the solution is pretty similar to the one in the “Redundant State” section: We simply derive the `selectedItem` variable from its id.

```jsx
// const items = [
//   {
//     id: "item-1",
//     text: "Item 1",
//   },
//   ...
// ]

function DuplicateState({ items }) {
  const [selectedItemId, setSelectedItemId] = useState();
  const selectedItem = items.find(({ id }) => id === selectedItemId);

  const onClickItem = (itemId) => {
    setSelectedItemId(itemId);
  };

  return (
    <>
      {selectedItem && <Modal item={selectedItem} />}
      <ul>
        {items.map((row) => (
          <li key={row.id}>
            {row.text}
            <button onClick={() => onClickItem(row.id)}>Open</button>
          </li>
        ))}
      </ul>
    </>
  );
}
```

#### Exercise Time

## Updating State Via useEffect

Another common problem with state in React is listening to changes of variables with `useEffect`. It’s so easy to forget that [a fellow developer had to point out to me that I made this mistake myself](https://www.reddit.com/r/reactjs/comments/xak8x3/comment/invrwvr/?utm_source=share&utm_medium=web2x&context=3).

### The Code Example

Let’s take the (slightly adjusted) example from the previous section.

![](https://ik.imagekit.io/87wct6jq4ql/tr:w-720/https://media.graphassets.com/cc5xbXPFSHymLobDMQ9n)

As you can see the component has now a `useEffect` to sync the `selectedItem` state when the `items` array changes.

```jsx
import { useEffect, useState } from "react";

// const items = [
//   {
//     id: "item-1",
//     text: "Item 1",
//   },
//   ...
// ]

function DuplicateState({ items }) {
  const [selectedItem, setSelectedItem] = useState();

  useEffect(() => {
    if (selectedItem) {
      setSelectedItem(items.find(({ id }) => id === selectedItem.id));
    }
  }, [items]);

  const onClickItem = (item) => {
    setSelectedItem(item);
  };

  return (
    <>
      {selectedItem && <Modal item={selectedItem} />}
      <ul>
        {items.map((row) => (
          <li key={row.id}>
            {row.text}
            <button onClick={() => onClickItem(row)}>Open</button>
          </li>
        ))}
      </ul>
    </>
  );
}
```
This code should work properly and keep the `selectedItem` state in sync. But doesn’t it feel hacky?

### The Problem

There are multiple problems with this approach:

1.  `useEffect` isn’t easy to read and understand. So the fewer of them we have the better.
2.  Updating state inside a `useEffect` causes an additional render. This usually isn’t a big problem performance-wise but needs to be considered.
3.  In the original code, we introduced a somewhat hidden relationship between the `selectedItem` state and the `items` prop. This is easy to miss when reading or changing the code.
4.  It can be hard to trigger the code inside the `useEffect` at the right time. You can often see other workarounds with this pattern e.g. to avoid running the code on the first render. Here is an example:

```jsx
function DuplicateState({ items }) {
  const [selectedItem, setSelectedItem] = useState();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setSelectedItem(items.find(({ id }) => id === selectedItem.id));
  }, [items]);

  ...
```

The takeaway here: If you want to use a `useEffect` or see it in another dev’s code ask yourself if it’s really required. Maybe it can be avoided by de-duplicating or deriving state as shown in the previous sections.

### The Solution

You might have guessed: The solution from the previous section also helps us to remove the `useEffect`. If we only store the selected item's ID instead of the whole object there’s nothing to be synced.

```jsx
import { useState } from "react";

// const items = [
//   {
//     id: "item-1",
//     text: "Item 1",
//   },
//   ...
// ]

function DuplicateState({ items }) {
  const [selectedItemId, setSelectedItemId] = useState();
  const selectedItem = items.find(({ id }) => id === selectedItemId);

  const onClickItem = (id) => {
    setSelectedItem(id);
  };

  return (
    <>
      {selectedItem && <Modal item={selectedItem} />}
      <ul>
        {items.map((row) => (
          <li key={row.id}>
            {row.text}
            <button onClick={() => onClickItem(row.id)}>Open</button>
          </li>
        ))}
      </ul>
    </>
  );
}
```

#### Exercise Time

## Listening To State Changes Via useEffect

A common problem related to the previous section is reacting to changes in a state variable with `useEffect`. The solution is slightly different though.

### The Code Example

Here is a component that shows a product. The user can show or hide the product details by clicking a button. Whenever the details are shown or hidden we trigger an action (in this case tracking an event in our imaginary analytics tool).

```jsx
import { useEffect, useState } from "react";

function ProductView({ name, details }) {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  useEffect(() => {
    trackEvent({ event: "Toggle Product Details", value: isDetailsVisible });
  }, [isDetailsVisible]);

  const toggleDetails = () => {
    setIsDetailsVisible(!isDetailsVisible);
  };

  return (
    <div>
      {name}
      <button onClick={toggleDetails}>Show details</button>
      {isDetailsVisible && <ProductDetails {...details} />}
    </div>
  );
}
```

The `useEffect` in this case listens to changes in the `isDetailsVisible` variable and runs the tracking code accordingly.

> By the way, the above code contains a bug. It’s really easy to overlook. You can find an explanation in “The Problem” section below.

### The Problem

Just like in the previous section, there are a few problems:

1.  `useEffect` often isn’t easy to understand.
2.  It can cause unnecessary render cycles (if a state is updated inside the effect).
3.  It’s easy to introduce bugs that are related to the render lifecycle. In fact, the original code contains a bug as it runs `trackEvent` during the initial render.
4.  It separates the effect from the actual cause. In the original code, we see `trackEvent` being run because `isDetailsVisible` changes. But the real cause is that the user pressed the “Show details” button.

### The Solution

In many cases, a `useEffect` that listens to changes in a state variable can be removed. Often, we can place the effect next to the code that updates the state in the first place. Here we move `trackEvent(...)` inside the `toggleDetails` function.

```jsx
function ProductView({ name, details }) {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  const toggleDetails = () => {
    setIsDetailsVisible(!isDetailsVisible);
    trackEvent({ event: "Toggle Product Details", value: !isDetailsVisible });
  };

  return (
    <div>
      {name}
      <button onClick={toggleDetails}>Show details</button>
      {isDetailsVisible && <ProductDetails {...details} />}
    </div>
  );
}
```

#### Exercise Time

## Contradicting State

When you work with multiple state variables that depend on each other you can easily produce an overall component state that shouldn’t be allowed. It’s probably easier to show this in code.

### The Code Example

Here we have a basic data fetching example. The component can be in different states: either it’s loading data, an error occurred, or the data was fetched successfully.

```jsx
export function ContradictingState() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetchData()
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setData(null);
        setError(error);
      });
  }, []);

  ...
```

### The Problem

The problem with this approach is that we can end up in a contradicting state if we’re not careful. In the above example, we e.g. might forget to set `isLoading` to `false` when an error occurs.

It’s also hard to understand, what combinations of state variables are allowed. In the above example, we could have 8 different component states in theory. But you can’t really see immediately what state combinations really exist.

> Just in case you’re wondering where the 8 state combinations come from: `data` could be `null` or an object, `isLoading` could be `true` or `false`, and `error` could also be `null` or an object. So 2 _2_ 2 = 8.

### The Solution

Multiple state variables depending on each other is a common scenario to introduce `useReducer` instead of `useState`.

```jsx
const initialState = {
  data: [],
  error: null,
  isLoading: false
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH":
      return {
        ...state,
        error: null,
        isLoading: true
      };
    case "SUCCESS":
      return {
        ...state,
        error: null,
        isLoading: false,
        data: action.data
      };
    case "ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default:
      throw new Error(`action "${action.type}" not implemented`);
  }
}

export function NonContradictingState() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "FETCH" });
    fetchData()
      .then((data) => {
        dispatch({ type: "SUCCESS", data });
      })
      .catch((error) => {
        dispatch({ type: "ERROR", error });
      });
  }, []);

  ...
```

This is a lot less overhead on our brains. We can immediately see that we have 3 actions and 4 possible component states (for “FETCH”, “SUCCESS”, “ERROR”, and the initial state).

#### Exercise Time

## Deeply Nested State

The final common problem we mention here is a state of (deeply) nested objects. If you simply render the data it might not be a problem at all. But as soon as you start updating nested items you’re in for some trouble.

### The Code Example

Here we have a component that renders deeply nested comments. The JSX doesn’t matter much here but imagine the `updateComment` callback being attached to a button or input.

```jsx
function NestedComments() {
  const [comments, setComments] = useState([
    {
      id: "1",
      text: "Comment 1",
      children: [
        {
          id: "11",
          text: "Comment 1 1"
        },
        {
          id: "12",
          text: "Comment 1 2"
        }
      ]
    },
    {
      id: "2",
      text: "Comment 2"
    },
    {
      id: "3",
      text: "Comment 3",
      children: [
        {
          id: "31",
          text: "Comment 3 1",
          children: [
            {
              id: "311",
              text: "Comment 3 1 1"
            }
          ]
        }
      ]
    }
  ]);

  const updateComment = (id, text) => {
    // this gets complicated
  };

  ...
```

### The Problem

The problem with nested state in React is that we have to update it in an immutable way otherwise the component doesn’t re-render.

The hard-coded update logic for a deeply nested comment in the above example would look something like this.

```jsx
const updateComment = (id, text) => {
  setComments([
    ...comments.slice(0, 2),
    {
      ...comments[2],
      children: [
        {
          ...comments[2].children[0],
          children: [
            {
              ...comments[2].children[0].children[0],
              text: "New comment 311"
            }
          ]
        }
      ]
    }
  ]);
};
```

But making this dynamic gets really complicated.

### The Solution

Instead of a deeply nested state, it’s much easier to work with a flat data structure. We can reference the items to each other via their IDs. This could look like this.

```jsx
function FlatCommentsRoot() {
  const [comments, setComments] = useState([
    {
      id: "1",
      text: "Comment 1",
      children: ["11", "12"],
    },
    {
      id: "11",
      text: "Comment 1 1"
    },
    {
      id: "12",
      text: "Comment 1 2"
    },
    {
      id: "2",
      text: "Comment 2",
    },
    {
      id: "3",
      text: "Comment 3",
      children: ["31"],
    },
    {
      id: "31",
      text: "Comment 3 1",
      children: ["311"]
    },
    {
      id: "311",
      text: "Comment 3 1 1"
    }
  ]);

  const updateComment = (id, text) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id !== id) {
        return comment;
      }
      return {
        ...comment,
        text
      };
    });
    setComments(updatedComments);
  };

  ...
```

Now it’s as easy as finding the correct item by its ID and replacing it in the array.

#### Exercise Time

