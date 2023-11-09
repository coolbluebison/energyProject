import { useFormik } from "formik";
import * as Yup from 'yup';
import Button from '@mui/material/Button'


import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';



function Signup() {

    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: ''
        },

        validationSchema: Yup.object({
            email: Yup.string().required('Required').email('Invalid email address'),
            username: Yup.string().required('Required'),
            password: Yup.string().required('Required')
            .min(7, 'Username should be over 6 characters long')
            .matches(/[a-zA-Z]/, 'Password must contain at least one letter.')
            .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/, 'Password must contain at least one punctuation.'),
        }),

        onSubmit: values => {
            // console.log('Form data', values);
            
            const userObject = {
                "email": values.email,
                "username": values.username,
                "password": values.password
            }
            console.log(userObject);

            fetch('http://127.0.0.1:5555/User_table',{
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
            
        },
    });





    return (
        <>

        <h2>Please Enter Your Signup Details</h2>

        <form onSubmit={formik.handleSubmit}>

            <Box >
                <TextField 
                    label="Email" 
                    variant="standard"
                    required
                    type="text"
                    {...formik.getFieldProps('email')}
            />
            </Box>

            <Box >
                <TextField 
                    label="Username" 
                    variant="standard"
                    required
                    type="text"
                    {...formik.getFieldProps('username')}
            />
            </Box>

            <Box >
                <TextField 
                    label="Password" 
                    variant="standard"
                    required
                    type ="password"
                    {...formik.getFieldProps('password')}
                />
            </Box>



            {/* <div className="input-group">
                <label>Email:    </label>
                <input
                    type="email"
                    {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div className="error">{formik.errors.email}</div>
                ) : null}
            </div>

            <br></br>


            <div className="input-group">
                <label>Username:    </label>
                <input
                    type="text"
                    {...formik.getFieldProps('username')}
                />
                {formik.touched.username && formik.errors.username ? (
                    <div className="error">{formik.errors.username}</div>
                ) : null}
            </div>

            <br></br>


            <div className="input-group">
                <label>Password:    </label>
                <input
                    type="password"
                    {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password ? (
                    <div className="error">{formik.errors.password}</div>
                ) : null}
            </div>

            <br></br> */}

            <br></br>
            <br></br>
            <Button variant="outlined" type="submit">Signup</Button>
        </form>

        </>
    )
}

export default Signup;