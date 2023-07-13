export default function ProgressBar(props){
    return(
        <div
            className="mb-[20px] w-[300px] rounded-[20px] text-sm progress-bar-container"
            style={props.themeStyles.progressBarContainer}
        >
            <div 
                className="flex justify-around transition-all duration-500"
            >
                <p>Player X</p>
                <p>Draw</p>
                <p>Player O</p>
            </div>

            <div
                className="flex transition-all duration-500"
                style={props.gameplayStyles}
            >
                <div 
                    className="w-[100px] h-[10px] rounded-lg progress-slider"
                    style={props.themeStyles.progressSlider}
                ></div>
            </div>
        </div>
    )
}