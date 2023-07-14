//CREATING A COMPONENT WHICH ALLOWS USER TO TOGGLE BETWEEN CREATING AN ACCOUNT  AND SIGNING IN WITH A GAMENAME AND A PASSWORD.
function CreateAccountSignIn(props){
    return (
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">{props.isSigningIn ? 'Sign In' : 'Create an Account'}</h1>
      
        <div>
          <div className="mb-4">
            {/*The htmlFor attribute is used to associate the label with the input field using the id attribute.*/}
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              UserName:
            </label>
            
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              type="text"
              value={props.formData.name}
              onChange={props.changeFormData}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              value={props.formData.password}
              onChange={props.changeFormData}
            />
          </div>
          
          {/*buttons for user to choose that he is signing in or creating account. Clicking each button will call the handleChooseMode function with the appropriate isSigningIn value.*/}
          <div className="mt-4 text-center">
            <button
              className="text-blue-500 hover:underline focus:outline-none"
              type="button"
              onClick={props.handleChooseMode}
            >
              Sign In
            </button>
          
            <span className="mx-2">or</span>
          
            <button
              className="text-blue-500 hover:underline focus:outline-none"
              type="button"
              onClick={props.handleChooseMode}
            >
              Create an Account
            </button>
          </div>
          
          {/* GENERAL BUTTON TO SUBMIT FORM */}
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={props.handleSubmit}
            >
              {props.isSigningIn ? 'Sign In' : 'Create Account'}
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default CreateAccountSignIn;
  
  



