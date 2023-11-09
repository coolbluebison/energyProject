import { useState } from "react";
import Button from '@mui/material/Button'


import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';






function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const userObject = { "username": username, "password": password }

        fetch('api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userObject)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response error");
                }

                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log("error", error.message);
            });
    };

      

    return (
        <div className="login-container" >
            




            <h2>Login</h2> 
            <form onSubmit={handleSubmit} alignItems="center">

                <Box >
                    <TextField label="Username" 
                        variant="standard"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                />
                </Box>

                <Box >
                    <TextField label="Password" 
                        type="password"
                        variant="standard"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Box>

                <br></br>
                <br></br>
                <Button variant="outlined" type="submit">Login</Button>

            </form>

            {/* <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <br></br>
                <Button variant="outlined" type="submit">Login</Button>
            </form> */}
        
        </div>
    );
}

export default Login