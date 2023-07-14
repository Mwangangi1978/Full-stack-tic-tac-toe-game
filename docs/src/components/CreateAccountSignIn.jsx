//Importing the react library 
import React, { useState } from "react";

//importing the axios library which allows us to make http requests
import  axios from "axios";

//CREATING A COMPONENT WHICH ALLOWS USER TO TOGGLE BETWEEN CREATING AN ACCOUNT  AND SIGNING IN WITH A GAMENAME AND A PASSWORD.
const CreateAccountSignIn = (props) => {
    //WE WANT TO KEEP TRACK OF THE USERS GAME NAME, Password or whether or not the user has created an account HENCE WE USE USESTATE -inatusaidia so that we can create a state variable (name) and a way of upating its value
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false); 


    //created an asynchronous function called handleSubmit which is called whwn the form is submitted
    const handleSubmit = async (e) => {
        //e.prevent default will prevent default form submission behaviour that will cause our page to reload
        e.preventDefault();
  
        try {
            if (isSigningIn) {
            // Signing in
            // Removed the password parameter
            const { data } = await axios.post('/login',  name , password)
            console.log('Signed in successfully!',data.username);
            } else {
            // Creating account if the user hana account.
            const {data}=await axios.post('/signup', name,password)
            console.log('Account created successfully!',data.username);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    
    //The handleChooseMode function sets the isSigningIn state based on the value passed to it. When true is passed, it means the user is signing in, and when false is passed, it means the user is creating an account. This will update the form mode accordingly and change the behavior of the submit button as well.
    const handleChooseMode = (isSigningIn) => {
      setIsSigningIn(isSigningIn);
    };
  
  
    return (
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">{isSigningIn ? 'Sign In' : 'Create an Account'}</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            {/*The htmlFor attribute is used to associate the label with the input field using the id attribute.*/}.
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              UserName:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/*button for user to choose that he is signing in or creating account. Clicking each button will call the handleChooseMode function with the appropriate isSigningIn value.*/}
          <div className="mt-4 text-center">
          <button
            className="text-blue-500 hover:underline focus:outline-none"
            type="button"
            onClick={() => handleChooseMode(true)}
          >
            Sign In
          </button>
          <span className="mx-2">or</span>
          <button
            className="text-blue-500 hover:underline focus:outline-none"
            type="button"
            onClick={() => handleChooseMode(false)}
          >
            Create an Account
          </button>
        </div>
        <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={props.handleSubmit}
            >
              {isSigningIn ? 'Sign In' : 'Create Account'}
            </button>
        </div>
        </form>
      </div>
    );
  };
  
  export default CreateAccountSignIn;
  
  



