import React from "react";

class ProfileBanner extends React.Component <
    {
        name?: string
    }
>{

    render() {
        return (
            <div>
                <p>{this.props.name || "unknown name"}</p>
            </div>
        );
    }
}

export default ProfileBanner;