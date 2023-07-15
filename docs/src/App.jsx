import React from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NameFooter from "./components/NameFooter"
import CreditsFooter from "./components/CreditsFooter"
import Button from "./components/Button"
import ProgressBar from "./components/ProgressBar"
import HomePage from "./components/HomePage"
import PopupText from "./components/PopupText"
import GameCell from "./components/GameCell"
import ToggleButton from "./components/ToggleButton"
import CreateAccountSignIn from "./components/CreateAccountSignIn"
import {nanoid} from 'nanoid'
import io from 'socket.io-client'


export default function App(){
    // CRETING A VARIABLE BOOLEAN TO CHECK IF GAME HAS BEGAN
    const [hasStarted, setHasStarted] = React.useState(false)
    //CREATING A VARIABLE TO CHECK IF USER HAS SUBMITTED FORM.(NEW)
    const [hasSubmittedForm, setHasSubmittedForm] = React.useState(false);
    // CREATING A VARIABLE BOOLEAN TO DETERMINE WINNER
    const [wonGame, setWonGame] = React.useState(false)
    // CREATING A VARIABLE BOOLEAN TO DETERMINE CURRENT PLAYER
    const [currentPlayer, setCurrentPlayer] = React.useState('')
    // CREATING A VARIABLE TO SET POPUP TEXT
    const [innerPopupText, setInnerPopupText] = React.useState('')
    // CREATING A VARIABLE TO SET BUTTON TEXT
    const [innerButtonText, setInnerButtonText] = React.useState('Start Game')
    // CREATING A LIST OF OBJECT WITH INFO ABOUT EACH GAME CELL
    const [gameCellInfoArray, setGameCellInfoArray] = React.useState(generateGameCellInfoArray())
    // CREATING A LIST OF OPTIONS TO HOLD THE INDEX OF GAME CELLS WHILE CHECKING WINNING CONDITIONS
    const [options, setOptions] = React.useState(['', '', '', '', '', '', '', '', ''])
    // CREATING A VARIABLE TO TRACK DARK MODE
    const [darkMode, setDarkMode] = React.useState(false)
    // CREATE A BOOLEAN TO CHECK IF ONE HAS SIGNED IN
    const [isSigningIn, setIsSigningIn] = React.useState(false)
    // CREATE A LIST OF PLAYERS
    const [pairedPlayers, setPairedPlayers] = React.useState("")
    //ADDED STATE FOR SOCKET INSTANCE
    const [socket, setSocket] = React.useState(io('http://localhost:5173/'))
    
    // CREATING A VARIABLE TO TRACK FORM DATA
    const [formData, setFormData] = React.useState({
        name: "",
        password: ""
    })

    // CREATING A CONSTANT OF WINNING CONDITIONS
    const winningConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6],
        [0,3,6],
        [1,4,7],
        [2,5,8]
    ]
    const handleFormSubmit = () => {
        setHasSubmittedForm(setHasSubmittedForm);
    };

    // CREATING A CONST STYLES OBJECT
    const styles={
        dark:{
            main:{
                backgroundColor: "#5A1E76"
            },
            gameContainer:{
                backgroundColor: "#2B0040"
            },
            progressBar:{
                progressBarContainer:{
                    backgroundColor: "rgb(71 85 105)",
                    color: "#DCBF3F"
                },
                progressSlider:{
                    backgroundColor: "#5A1E76"
                }
            },

            homePage:{
                homePageHeading:{
                    color: "white"
                },
                homePagePlayerX:{
                    color: "#72CFF9"
                },
                homePagePlayerO:{
                    color: "#DCBF3F"
                }
            },

            gameCell:{
                backgroundColor: "#43115B",
                color: "#DCBF3F"
            },
            button:{
                backgroundColor: "rgb(71 85 105)",
                color: "white"
            },

            toggleButton:{
                toggleLight:{
                    color: '#DCBF3F'
                },
                toggleSlider:{
                    backgroundColor: "#5A1E76",
                    justifyContent: "flex-end"
                },
                toggler:{
                    backgroundColor: "#5A1E76"
                },
                toggleDark:{
                    color: "#72CFF9"
                }
            },
            popupText:{
                backgroundColor: "#48D2FE"
            },
            nameFooter:{
                footerLeading:{
                    color: "#DCBF3F"
                },
                footerMiddle:{
                    color: "#72CFF9"
                }
            },
            creditsFooter:{
                backgroundColor: "#975FB1",
                color: "#2B0040"
            }
        },

        light:{
            main:{
                backgroundColor: "#59E391"
            },
            gameContainer:{
                backgroundColor: "limegreen"
            },
            progressBar:{
                progressBarContainer:{
                    backgroundColor: "white",
                    color: "rgb(14 116 144)"
                },
                progressSlider:{
                    backgroundColor: "#59E391"
                }
            },

            homePage:{
                homePageHeading:{
                    color: "black"
                },
                homePagePlayerX:{
                    color: "#ffff00f5"
                },
                homePagePlayerO:{
                    color: "rgb(8 145 178)"
                }
            },

            gameCell:{
                backgroundColor: "#59E391",
                color: "rgb(14 116 144)"
            },
            button:{
                backgroundColor: "white",
                color: "black"
            },

            toggleButton:{
                toggleLight:{
                    color: "#ffff00f5"
                },
                toggleSlider:{
                    backgroundColor: "#59E391",
                    justifyContent: "flex-start"
                },
                toggler:{
                    backgroundColor: "#59E391"
                },
                toggleDark:{
                    color: "rgb(8 145 178)"
                }
            },
            popupText:{
                backgroundColor: "rgb(234 179 8)"
            },

            nameFooter:{
                footerLeading:{
                    color: "rgb(8 145 178)"
                },
                footerMiddle:{
                    color: "#ffff00f5"
                }
            },
            creditsFooter:{
                backgroundColor: "lightgreen",
                color: "green"
            }
        },

        gamePlay:{
            progressBar:{
                playerX:{
                    justifyContent:'flex-start'
                    },
                playerO:{
                    justifyContent:'flex-end'
                    },
                draw:{
                    justifyContent:'center'
                    },
            }
        }
    }

    //The handleChooseMode function sets the isSigningIn state based on the value passed to it. When true is passed, it means the user is signing in, and when false is passed, it means the user is creating an account. This will update the form mode accordingly and change the behavior of the submit button as well.
    function handleChooseMode(){
        setIsSigningIn(!isSigningIn);
    };

    // FUNCTION TO DETERMINE PLAYER X
    function choosePlayerX(){
        setCurrentPlayer('X')
        setInnerPopupText('You Are Player X')
    }
    // FUNCTION TO DETERMINE PLAYER O
    function choosePlayerO(){
        setCurrentPlayer('O')
        setInnerPopupText('You Are Player O')
    }
    // FUNCTION TO DETERMINE START OF THE GAME
    function startGame(){
        setHasStarted(true)
        setInnerButtonText("Restart Game")
        setInnerPopupText('')
        setWonGame(false)
    }
    // FUNCTION TO END GAME
    function endGame() {
        setWonGame(true); // Update wonGame state to true
        setInnerButtonText("Start Game");
        setHasStarted(false);
        setOptions(['', '', '', '', '', '', '', '', '']);
        setGameCellInfoArray(generateGameCellInfoArray());
        setInnerPopupText('')
        setCurrentPlayer('')
      }      
      
    // FUNCTION TO CHANGE PLAYER
    function changePlayer(){
        if(!wonGame && hasStarted){
            currentPlayer ==='X' ? 
            setCurrentPlayer('O'):
            setCurrentPlayer('X')
        }else{
            return
        }
    }
    // FUNCTION TO GENERATE A LIST OF INFOS
    function generateGameCellInfoArray(){
        const newArray = []

        let i = 0;
        while(i < 9){
            newArray.push({
                id:nanoid(),
                innerCellText:'',
                cellIndex:i
            })
            i ++
        }

        return newArray
    }
    // A FUNCTION TO UPDATE THE POSITION OF A CELL IN THE OPTIONS ARRAY
    function updateCell(index, id) {
        if (options[index] === '' && !wonGame && hasStarted) {
          setOptions(prevOptions => {
            const newArray = [...prevOptions];
            newArray[index] = currentPlayer;
            return newArray;
          });
      
          renameCell(id)
        } else {
          return;
        }
      }
      
    // FUNCTION TO RENAME A CELL WHEN CLICKED
    function renameCell(id) {
        if (!wonGame && hasStarted){
          setGameCellInfoArray(prevArray => {
            return prevArray.map(info => {
              if (info.id === id) {
                return {
                  ...info,
                  innerCellText: currentPlayer
                };
              } else {
                return info;
              }
            });
          });
        } else {
          return;
        }
    }

    //created an asynchronous function called handleSubmit which is called whwn the form is submitted
    const handleFormSubmit = () => {
        // IF NO VALUE, THEN ALERT US
        if(formData.name === '' || formData.password === ''){
            alert("You must fill both fields")
            return
        }

        setInnerPopupText("Waiting for players");
    };

    // FUNCTION TO CHANGE FORM DATA
    function changeFormData(e){
        setFormData(prevFormData => ({
            ...prevFormData,
            [e.target.name]: e.target.value
        }))
    }
    
    // FUNCTION TO CHECK WINNER
    function checkWinner() {
        for (let i = 0; i < winningConditions.length; i++) {
          const [a, b, c] = winningConditions[i];
          if (
            options[a] === currentPlayer &&
            options[b] === currentPlayer &&
            options[c] === currentPlayer
          ) {
            setWonGame(true);
            setInnerPopupText(currentPlayer ? `${currentPlayer} won` : '');
            return;
          }
        }
      
        if(!options.includes('')){
            setWonGame(true)
            setCurrentPlayer('draw')
            setInnerPopupText(currentPlayer ? "It's a draw" : '')
            return
        }

        changePlayer()
    }

    // A USE EFFECT CLEANUP FUNCTION TO CHECK FOR THE WINNER ANYTIME THE GAME CELL INFO CHANGES
    React.useEffect(() => checkWinner, [options, currentPlayer, hasStarted])
   
    // A USE EFFECT TO HANDLE USER CONNECTIONS AS A CLEANUP IT DISCONNECTS CONNECTIONS
    React.useEffect(() => {

        // DEALING WITH THE PAIRED PLAYERS FROM SERVER
        socket.on("sendUser", (data) => {
            setPairedPlayers(data.pairedPlayers);
            setHasStarted(false);
            setHasSubmittedForm(true);
            setInnerPopupText("");
            console.log("received by client");
        });

        // SEND CHECKUSER EVENT TO THE SERVER
        socket.emit("checkUser", { username: formData.name });

        return () => {
            if (socket) {
                socket.disconnect()
            }
        };
    }, [socket])
      
      // A VARIABLE CONTAINING A FUNCTION TO GENERATE A LIST OF GAME CELLS
    const gameCells = gameCellInfoArray.map(info => (
        <GameCell
            key={info.id}
            id={info.id}
            innerCellText={info.innerCellText}
            cellIndex={info.cellIndex}
            handleClick={() => updateCell(info.cellIndex, info.id)}
            styles={darkMode ? styles.dark.gameCell : styles.light.gameCell}
        />
    ))
      
    return(
        // THE WHOLE GAME IS IN THIS CONTAINER BELOW
        
        <main 
            className="min-h-[100vh] font-['Fredoka'] transition-all duration-500 flex justify-center items-center"
            style={darkMode ? styles.dark.main : styles.light.main}
        >
            {/* THE GAME CONTAINER WHICH HOLDS THE GRID OF CELLS AND THE SELECTION BOX IS PLACED HERE */}
            <div 
                className="h-[95vh] rounded-[50px] w-[95%] relative flex justify-center items-center flex-col game-container"
                style={darkMode ? styles.dark.gameContainer : styles.light.gameContainer}
            >
                {/* THE DIV SHOWING THE CURRENT PLAYER */}
                {hasStarted && <ProgressBar
                    gameplayStyles={currentPlayer ?
                        currentPlayer === 'X' ?
                            styles.gamePlay.progressBar.playerX :
                            styles.gamePlay.progressBar.playerO
                        :
                        styles.gamePlay.progressBar.draw}
                    themeStyles={darkMode ? styles.dark.progressBar : styles.light.progressBar}
                />}

                {/* THE FORM SELECTION MENU IS CONTAINED HERE */}
                {!hasSubmittedForm && (
                    <CreateAccountSignIn
                    setHasSubmittedForm={setHasSubmittedForm} 
                        handleSubmit={handleFormSubmit} 
                        styles={darkMode ? styles.dark.homePage : styles.light.homePage}
                        handleChooseMode={handleChooseMode}
                        formData={formData}
                        isSigningIn={isSigningIn}
                        changeFormData={(e) => changeFormData(e)}
                    />
                )}
                
                {/* THE GAME SELECTION MENU IS CONTAINED HERE */}
                {!hasStarted && hasSubmittedForm && (
                    <HomePage
                    choosePlayerX={choosePlayerX}
                    choosePlayerO={choosePlayerO}
                    styles={darkMode ? styles.dark.homePage : styles.light.homePage}
                />)}  

                {/* THE CONTAINER FOR GRID IS CONTAINED HERE */}
                {hasStarted  && <div className="grid grid-flow-row grid-cols-3 gap-[10px] transition-all duration-500">
                    {gameCells}
                </div>}

                {/* THE BUTTON IS LOCATED HERE TO START OR RESET GAME*/}
                {hasSubmittedForm && <Button
                    handleClick={hasStarted ? endGame : startGame}
                    innerButtonText={innerButtonText}
                    styles={darkMode ? styles.dark.button : styles.light.button}
                />}

                {/* THE TOGGLE BUTTON RESPONSIBLE FOR CHANGING THEMES IS LOCATED HERE */}
                <ToggleButton
                    handleClick={() => setDarkMode(prevMode => !prevMode)}
                    styles={darkMode ? styles.dark.toggleButton : styles.light.toggleButton}
                />

                {/* THE DISPLAY OF A WINNER SHOWN, OR THE PLAYER */}
                {innerPopupText && <PopupText
                    innerPopupText = {innerPopupText}
                    styles={darkMode ? styles.dark.popupText : styles.light.popupText}
                />}

                {/* THE GAME NAME BOTTOM RIGHT FOOTER IS PLACED HERE */}
                <footer>
                    {/* THIS IS THE NAME FOOTER */}
                    <NameFooter
                        styles={darkMode ? styles.dark.nameFooter : styles.light.nameFooter}
                    />
                    {/* THE CREDITS FOOTER IS PLACED HERE */}
                    <CreditsFooter
                        styles={darkMode ? styles.dark.creditsFooter : styles.light.creditsFooter}
                    />
                </footer>
                <div className="max-w-md mx-auto">
                  <ToastContainer />
                </div>
            </div>
        </main>
        
        )
    }