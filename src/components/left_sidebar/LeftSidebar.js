
const LeftSidebar = () => {
    return (
        <div style={{
            display:"flex",
            flexDirection:"row"
        }}>
            <div style={{
                position:"sticky",
                top:"0px",
                left:"0px",
                width:"200px",
                height:"100vh",
                backgroundColor:"blue"
            }}></div>

            <div style={{
            }}>
                <p>lorem ipsum dolor</p>
            </div>
        </div>
    );
};

export default LeftSidebar;