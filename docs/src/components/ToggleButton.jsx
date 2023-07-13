export default function ToggleButton(props){
    return (
        <div 

            className="absolute top-[1rem] flex text-sm font-[500] right-[20px]"
        >
            <p
                className="toggle-light"
                style={props.styles.toggleLight}
            >light
            </p>
            
            <div

                className="flex w-[60px] h-[20px] my-auto mx-[10px] rounded-[20px] justify-start dark:justify-end toggle-slider transition-all duration-1000 "

                style={props.styles.toggleSlider}
            >
                <div
                    className="w-[20px] h-[20px] shadow-button-popup rounded-full cursor-pointer toggler transition-all duration-1000"
                    onClick={props.handleClick}
                    style={props.styles.toggler}
                ></div>
            </div>

            <p
                className="toggle-dark"
                style={props.styles.toggleDark}
            >dark
            </p>
        </div>
    )
}