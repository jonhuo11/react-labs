
/*
    onUpdate
    (newValue) => {...}
*/
const SimpleTextInput = ({text, onChange, style={}, disabledStyle={},enable=true}) => {

    const onChangeVal = (e) => {
        if (onChange == undefined) {
            console.log("no onChange handler given for SimpleTextInput");
            return;
        }
        onChange(e);
    }

    return (
        <div
            style={{
                display:"flex",
                flexGrow:"1"
            }}
        >
            <input 
                type="text"
                value={text}
                onChange={onChangeVal}
                disabled={!enable}
                style={

                    enable ? (
                        {
                            ...style,
                            width:"100%",
                            textAlign:"center"
                        }
                    ) : (
                        {
                            ...disabledStyle,
                            border: "none",
                            width:"100%",
                            color:"black",
                            textAlign: "center"
                        }
                    )
                }
            ></input>
        </div>
    );
};

/*
SimpleTextInput.propTypes = {
    text: PropTypes.string,
    onUpdate: PropTypes.func
};
*/

export default SimpleTextInput;