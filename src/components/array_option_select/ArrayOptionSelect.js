import {useEffect, useState} from "react";

// optionsArray: ["hi", "bye", "daa", ...]
// onChange: cb for when new opt is chosen, passed down from parent component
/*
    onChange
    (newValue) => {...}
*/
// chosen stored in state of higher up component, onChange will set chosen to something else
const ArrayOptionSelect = ({optionsArray, chosen, onChange}) => {

    const GenerateOptions = () => {
        var opts = [];
        for (var o in optionsArray) {
            const opt = optionsArray[o];
            opts.push(
                <option key={`${opt}_${Date.now()}`} value={opt}>{opt}</option>
            );
        }
        return opts;
    };

    const onChangeOpt = (e) => {
        e.preventDefault();
        const val = e.target.value;
        onChange(val);
    };

    // chosen not in optionsArray
    const chosenMismatch = () => {
        onChange(optionsArray[0]);
        return optionsArray[0];
    };

    return (
        (optionsArray.length > 0) ? (
            <select
                value={(
                    optionsArray.includes(chosen) ? (
                        chosen 
                    ) : (
                        chosenMismatch()
                    )
                )}
                onChange={onChangeOpt}
            >
                {GenerateOptions()}
            </select>
        ) : <p>No options provided</p>
    );
};

export default ArrayOptionSelect;