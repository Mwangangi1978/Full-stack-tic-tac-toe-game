export default function PopupText(props){
    return(
        <div
            className="mt-[20px] rounded-[10px] p-[10px] w-[200px] mx-auto text-center font-[500] text-2xl transition-all duration-500 hover:shadow-white  hover:shadow-popup "
            style={props.styles}
        >{props.innerPopupText}
        </div>
    )
}