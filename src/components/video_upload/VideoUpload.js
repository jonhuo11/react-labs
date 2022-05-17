import { useState } from "react";

import SimpleTextInput from "../text_input/SimpleTextInput";

const VideoUpload = () => {

    const [file, setFile] = useState(undefined);
    const [serverUrl, setServerUrl] = useState("http://localhost:2003/upload");

    const onChangeFile = (e) => {
        setFile(e.target.files[0]);

        e.preventDefault();
    }

    /*
        upload file to server
    */
    const onSubmitFile = (e) => {
        console.log("uploading file " + file.name + ", " + file.size + " bytes");

        const fd = new FormData();
        fd.append("file", file);

        fetch(serverUrl, {
            method: "POST",
            body: fd
        }).then((response) => {
            console.log("server received " + file.name + ", response below");
            console.log(response);
        }).catch((error) => {
            console.log("an error occurred while sending " + file.name);
            console.error(error);
        });

        e.preventDefault();
    };

    const onChangeServerUrl = (e) => {
        setServerUrl(e.target.value);

        e.preventDefault();
    };

    return (
        <div>
            <form onSubmit={onSubmitFile}>
                <input type="file" accept="video/*" onChange={onChangeFile}></input>
                <input type="submit" value="Upload selected video"></input>
            </form>

            <SimpleTextInput
                text={serverUrl}
                onChange={onChangeServerUrl}
            ></SimpleTextInput>

        </div>
    );

};

export default VideoUpload;