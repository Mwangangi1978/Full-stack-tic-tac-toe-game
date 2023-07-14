//Importing the react library 
import React from "react";

//importing the axios library which allows us to make http requests
import  axios from "axios";




//CREATING A COMPONENT WHICH ALLOWS USER TO TOGGLE BETWEEN CREATING AN ACCOUNT  AND SIGNING IN WITH A GAMENAME AND A PASSWORD.
const CreateAccountSignIn = () => {
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
            await axios.post('/api/login', { name, password });
            console.log('Signed in successfully!');
            } else {
            // Creating account if the user hana account.
            await axios.post('/api/signup', { name, password });
            console.log('Account created successfully!');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
  
    return (
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">{isSigningIn ? 'Sign In' : 'Create an Account'}</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            {/*The htmlFor attribute is used to associate the label with the input field using the id attribute.*/}.
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Game Name:
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
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {isSigningIn ? 'Sign In' : 'Create Account'}
            </button>
          </div>
          <div className="mt-4 text-center">
            <button
              className="text-blue-500 hover:underline focus:outline-none"
              type="button"
              onClick={() => setIsSigningIn(!isSigningIn)}
            >
              {isSigningIn ? 'Create an Account' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  export default CreateAccountSignIn;
  
  



