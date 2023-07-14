export default function GameCell(props){
    return(
        <div 
            className="flex justify-center items-center w-[100px] h-[100px] rounded-[10px]  text-6xl font-[700] transition-all duration-500 hover:shadow-popup"
            onClick={props.handleClick}
            style={props.styles}
        >{props.innerCellText}
        </div>
    )
}