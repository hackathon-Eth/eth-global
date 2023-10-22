import { Auth, useAuth } from "@arcana/auth-react";
import { Hellix } from "../components/dna";
const onLogin = async () => {
    window.location.href = "http://localhost:3000/upload";
}

const Arcana = () => {
    const auth = useAuth();
    if(auth.isLoggedIn){
        window.location.href = "http://localhost:3000/upload";
    }
    return (
        <div className="VideoInput">
            <div className="name">GeneLink</div>
            <Hellix/>
            <div className="page">
            {auth.loading ? (
                "Loading"
            ) : auth.isLoggedIn ? (
                <div className="name">Logged In</div>
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
