import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const SuccessLogin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const params = new URLSearchParams(window.location.search);
            const token = params.get('access_token');
            localStorage.setItem('token', JSON.stringify(token));

            if (!token) return navigate('/signin');

            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/user`, { withCredentials: true });
                localStorage.setItem('user', JSON.stringify(res.data.user));
                navigate('/');
            } catch (error) {
                console.log(error);
                navigate('/signin');
            }
        }

        fetchUser();

    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center" >
            <p className="text-lg font-semibold text-zinc-400" >Logging you in...</p>
        </div>
    );
};

export default SuccessLogin;