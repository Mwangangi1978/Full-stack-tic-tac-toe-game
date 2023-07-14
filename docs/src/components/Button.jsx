export default function Button(props){
    return (
        <button
            className="mt-[20px] p-[10px] w-[250px] rounded-[20px] text-lg transition-all hover:shadow-popup duration-500"
            onClick={props.handleClick}
            style={props.styles}
        >{props.innerButtonText}
        </button>
    )
}