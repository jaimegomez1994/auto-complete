1. What is the difference between Component and PureComponent? Give
   an example where it might break my app.

   PureComponent will not re render if there are no changes in props and state.
   Component in the other case will re render on any prop/state change.

   We can use something similar with useMemo for functional components.

   We might have a broken app using PureComponent in nested objects/arrays.

2. Context + ShouldComponentUpdate might be dangerous. Why is that?
   In order to use ShouldComponentUpdate you must know props and state in a very detail way and by adding context, which is sometimes hard to track due to data not passed by props, into the picture it could lead to unkowns at the moment of determining if a component should be updated or not.

3. Describe 3 ways to pass information from a component to its PARENT.

   Callbacks - this is the most common way to pass data from child to parent. At the parent we define the callback and on the children we invoke it.

   Redux/state managment libraryes- Children can update the state globally so that the parent also recieves the udpated state.

   Context - We can have the parent and the child to use same context. And children can trigger an update of the context. In this case the parent will also have the updated state from the children.

4. Give 2 ways to prevent components from re-rendering.

   As mentioned on step 1. If there are no changes on props and satem, PureComponent can help us prevent re-rendering.

   Another way to prevent re-rendering is with React.Memo. This works in a similar way, it memoizes the component and prevents the re-rendering if components props have not changed.

5. What is a fragment and why do we need it? Give an example where it might
   break my app.

   Fragments on react group multiple children without adding an extra element on the DOM.
   In this following case adding `<></>` to wrap ComponentA and ComponentB will not add an additional div.
   `    <ComponentA/>
<ComponentB/>`
   It would break the app if there's not a single JSX element returned.

6. Give 3 examples of the HOC pattern.

   An easy example to explain HOC pattern can be changing the color of certain component. This may not be ideal on a production like application but for exampling reasons makes sense.
   This is the example:
   ` updateColor(<ExampleComponent/>)`

   Another example that we can find more often in production applications is Authorization HOC.
   Using a HOC pattern can facilitate the abstracion of Authorization.
   This is the example:

   `const AuthorizedComponent = AuthAbstract(<ExampleComponent>);`

7. What's the difference in handling exceptions in promises, callbacks
   and async...await?

   In promises error handling are handled by adding a .catch block after the .then block.

   ```promiseFunction()
   .then((data) => {
      console.log(data)
   })
   .catch((error) => {
      console.log(error)
   });
   ```

   In callbacks we can deal with error in different ways, from what I've seen we can expect the first parameter to be an error. This is not ideal and that's why we moved to promises then async await.

   ```
   exampleFunction((error, result)=>{console.log(error);})

   function exampleFunction(callback){
      callback(new Error("error occurred"), null)
   }

   ```

   In async await you will need to wrap it with a regultar `try{ }catch{ }`.

8. How many arguments does setState take and why is it async.

   It takes two arguments.
   First one is the new object to be assigned to the state.
   Second argument is a function that's going to be excecuted after state is updated.

   It is async to exclude unnecesary re-renders.

9. List the steps needed to migrate a Class to Function Component.

   - Change the actual "class" definition to a function.

   ` class ClassComponent ==>  function FunctionComponent(){}`

   - Update Lifecycle methods from based class compontents to function components

   ` componentDidMount() ==>  useEffect(()=>,[])`

   ` componentDidUpdate() ==>  useEffect(()=>,[dependency])`

   - Update state

   ` this.setState() ==>  useState()`

10. List a few ways styles can be used with components.

There's multiple ways to style components, here are a few:

- CSS modules
- Inline style
- Styled component
- Global styles(importing a css file)
  -Tailwind/ other css libraries

11. How to render an HTML string coming from the server.

We can use `dangerouslySetInnerHTML` altough this could lead to vulnerabilities. For this we can use some libraries to sanitize the html.
