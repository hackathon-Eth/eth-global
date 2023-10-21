import { Auth, useAuth } from "@arcana/auth-react";

const onLogin = async () => {
    window.location.href = "http://localhost:3000/";
}

const Arcana = () => {
    const auth = useAuth();
    if(auth.isLoggedIn){
        window.location.href = "http://localhost:3000/";
    }
    return (
        <div className="VideoInput">
            <h1>Connect to DNA</h1>
            <div>
            {auth.loading ? (
                "Loading"
            ) : auth.isLoggedIn ? (
                <p>Logged In</p>
            ) : (
                <div>
                    <Auth externalWallet={true} theme={"dark"} onLogin={onLogin} />
                </div>
            )}
            </div>
        </div>
    );
}

export default Arcana;
