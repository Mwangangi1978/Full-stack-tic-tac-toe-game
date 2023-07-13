export default function NameFooter(props){
    return(
        <div
            className="absolute bottom-[10px] left-[15px] font-['Fredoka'] text-4xl font-[600] leading-[0.8]"
        >
            <p
                className="footer-leading"
                style={props.styles.footerLeading}>tic.
            </p>

            <p
                className="footer-middle"
                style={props.styles.footerMiddle}>tac.
            </p>

            <p
                className="footer-leading"
                style={props.styles.footerLeading}>toe.
            </p>
        </div>
    )
}