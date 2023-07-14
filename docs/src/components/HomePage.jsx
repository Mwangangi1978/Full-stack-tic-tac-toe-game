import React from "react"

export default function HomePage(props){
    return (
        <div
            className="transition-all duration-500">
            <p
                className="font-[500] text-3xl homepage-heading"
                style={props.styles.homePageHeading}
            >CHOOSE YOUR PLAYER
            </p>
            
            <div className="flex justify-around">
                <p 
                    className="font-[600] text-6xl [#ffff00f5] hover:text-7xl transition-all duration-500 hover:shadow-md cursor-pointer homepage-player-x"
                    onClick={props.choosePlayerX}
                    style={props.styles.homePagePlayerX}
                    >X
                </p>
                <p
                    className="font-[600] text-6xl hover:text-7xl transition-all duration-500 hover:shadow-md cursor-pointer homepage-player-o"
                    onClick={props.choosePlayerO}
                    style={props.styles.homePagePlayerO}
                    >O
                </p>
            </div>
        </div>
    )
}