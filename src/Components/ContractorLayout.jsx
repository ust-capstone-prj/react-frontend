import React from "react";
import ContractorHeader from "./ContractorHeader";

const ContractorLayout = ({ children }) => {
    return (
        <>
            <ContractorHeader username={sessionStorage.getItem("username")} />
            <div>
                <p>Username: {sessionStorage.getItem("username")}</p>
            </div>
            <main style={{ paddingTop: "80px" }}>{children}</main>
        </>
    );
};

export default ContractorLayout;
