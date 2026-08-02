import { Field, Input } from '@chakra-ui/react'
import './Login.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true;

const Login = ({setUser}) => {

    const navigate = useNavigate();

    const [error, setError] = useState(false)


    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, form);
            setUser(res.data);
            setError(false);
            navigate('/admin/General');

        }

        catch {

            setError(true);

        }
    }

    return (
        <div
            className='
                bg-white
                h-screen
                w-screen
                flex
                items-center
                justify-center
            '
        >

            <form className="form" onSubmit={handleSubmit}>
                <p className="form-title">Sign in to your account</p>

                <Field.Root invalid={error} className="input-container">
                    <Input
                        type="email"
                        placeholder="Enter email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        style={{ color: 'black' }}
                        borderColor={error ? 'red' : undefined}
                    />
                </Field.Root>

                <Field.Root invalid={error} className="input-container">
                    <Input
                        type="password"
                        placeholder="Enter password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        style={{ color: 'black' }}
                        borderColor={error ? 'red' : undefined}
                    />
                    <Field.ErrorText>
                        <Field.ErrorIcon />
                        Email or password is incorrect
                    </Field.ErrorText>
                </Field.Root>

                <button type="submit" className="submit">
                    Sign in
                </button>

            </form>

        </div>
    )
}

export default Login