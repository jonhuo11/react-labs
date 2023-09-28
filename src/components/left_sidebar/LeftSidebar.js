
const LeftSidebar = (props) => {
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
                paddingLeft: '16px  '
            }}>
                <p>Sidebar content below</p>
                <hr />
                {props.children}
            </div>
        </div>
    );
};

export default LeftSidebar;