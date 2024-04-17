import React, {useState} from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import "../styles/Form.css"
import LoadingIndicator from "./LoadIndicator"

interface FromProps{
    route: string
    method: string;
}

export default function Form({route, method}: FromProps): JSX.Element {
    const [name, setName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.SyntheticEvent) => {
        setLoading(true);
        e.preventDefault();

        try {

            const res = method == "Register" ? await api.post(route, {name, password, email}) : await api.post(route, {username, password})
            if (method === "Login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    return (
    <form onSubmit={handleSubmit} className="form-container">
        <h1>{method}</h1>
        <input 
        type="text" 
        className="form-input"
        value={method == "Register" ? name : username}
        onChange={method == "Register" ? (e) => setName(e.target.value) : (e) => setUsername(e.target.value)}
        placeholder="Username"
        />
        {method === "Register" && 
        <input 
        type="text" 
        className="form-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        />}
        <input 
        type="password" 
        className="form-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        />
         {loading && <LoadingIndicator />}
        <button className="form-button" type="submit">
            {method}
        </button>
    </form>
    )
}