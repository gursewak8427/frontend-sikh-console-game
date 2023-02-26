import { Route, Routes } from "react-router-dom"

const UserAuthScreen = ({ children }) => {
    return (
        <>
            <main className="main-content overflow-x-hidden position-relative max-height-vh-100 h-100 border-radius-lg ">
                <div className="">
                    {children}
                </div>
            </main>
        </>
    );
}

export default UserAuthScreen;
