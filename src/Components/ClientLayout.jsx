import Header from "./Header";

const ClientLayout = ({ children }) => {
    // Assuming you have a function to set the username
    const setUsername = (username) => {
        sessionStorage.setItem("username", username); // Store username in sessionStorage
    };

    return (
        <>
            <Header username={sessionStorage.getItem("username")} />
            <div>
                <p>Username: {sessionStorage.getItem("username")}</p>
            </div>
            <main style={{ paddingTop: "80px" }}>{children}</main>
        </>
    );
};

export default ClientLayout;
