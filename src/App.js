import { useEffect, useState } from 'react'
import './App.css';
import { jwtDecode } from 'jwt-decode'



function App() {

    const [user, setUSer] = useState({});

    function handleCallbackResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
        const userObject = jwtDecode(response.credential);
        console.log(userObject)
        setUSer(userObject)
        document.getElementById("signInDiv").hidden = true
    }

    function handleSignOut(event) {
        event.preventDefault()
        setUSer({})
        document.getElementById("signInDiv").hidden = false
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "101102035330-lsh20nibjlp3drt6e9fg5oa4ajkgo9qg.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"), { theme: "outline", size: "large" }
        );

        google.accounts.id.prompt()

    }, []);

    return ( <
        div className = 'App' >
        <
        div id = "signInDiv" > < /div> {
            Object.keys(user).length !== 0 &&
                <
                div className = 'account-card' >
                <
                h1 className = 'account-heading' > My Account < /h1> <
                div className = 'account-details' >
                <
                img src = { user.picture }
            alt = "logo"
            className = 'account-image' / >
                <
                h3 className = 'account-name' > { user.name } < /h3> <
                /div> <
                p className = 'account-email' > { user.email } < /p> <
                button onClick = {
                    (e) => handleSignOut(e) }
            className = 'sign-out-button' > Sign Out < /button> <
                /div>  
        } <
        /div>

    );
}

export default App;