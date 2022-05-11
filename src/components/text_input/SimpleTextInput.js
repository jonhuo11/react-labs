
/*
    onUpdate
    (newValue) => {...}
*/
const SimpleTextInput = ({text, onChange}) => {

    const onChangeVal = (e) => {
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
                style={{
                    width:"100%"
                }}
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