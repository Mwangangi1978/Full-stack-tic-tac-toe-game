//Importing the react library 
import React from "react";

//importing the axios library which allows us to make http requests
import  axios from "axios";


//CREATING A COMPONENT WHICH ALLOWS USER TO CREATE A GAME NAME AND HAVE ACCESS TO THE GAME WITHOUT REQUIRING PASSWORD.
const Login = () => {
    //WE WANT TO KEEP TRACK OF THE USERS GAME NAME HENCE WE USE USESTATE -inatusaidia so that we can create a state variable (name) and a way of upating its value
    const [gameName, setName] = useState("");


    //created an asynchronous function called handleSubmission which is called whwn the form is submitted 
    const handleSubmission = async (e) => {

        //e.prevent default will prevent default form submission behaviour that will cause our page to reload
        e.preventDefault();

        try {
            //sending a request to an endpoint on the server if succesful we log the message that login ilikuwa succesful otherwise we log the error
            await axios.post('/api/loginAccount', {gameName});
            console.log('Login succesful!');

        }catch (error) {
            console.log(error)
        }
    };


    return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Log In to TicTacToe without signing up!</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
            {/*The htmlFor attribute is used to associate the label with the input field using the id attribute.*/}

          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gamename">
            Game Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="gamename"
            type="text"
            value={gameName}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            >
            Log In
          </button>
        </div>
      </form>
    </div>
    )
}