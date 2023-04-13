import {useState,useContext, createContext, useEffect} from 'react';
import {getToken, loadUserRequest, registerUserRequest, loginUserRequest, logoutRequest} from '../api/auth'
import Loading from '../components/Loading'

const context = createContext()

export const useAuth = ()=>{
    const newContext = useContext(context)
    return newContext
}

const initialState = {
    token: getToken(),
    auth: false,
    user: null,
    isLoading: true,
  };

const AuthProvider = ({children}) => {
    
    const [state, setState] = useState(initialState)

    const register = async (user)=>{
        try {
            const data = await registerUserRequest(user)
            setState({...data, auth: !!data.username})
            return data
        } catch (error) {
            Promise.reject(error)
        }
    }

    const login = async (user)=> {
        try {
            const data = await loginUserRequest(user)
            setState({
                token: data.token, 
                user: data.user,
                auth: !!data.user})
            return data
        } catch (error) {
            Promise.reject(error)
        }
    }

    const logout = async ()=>{
        await logoutRequest()
        setState({ ...initialState, isLoading: false })
    }


    useEffect(()=>{
        loadUserRequest()
            .then((user)=>{
                setState({
                    user: user,
                    isLoading: false,
                    auth: !!user,
                  });
                })
                .catch((err) => {
                  console.error(err);
                  setState({
                    ...initialState,
                    isLoading: false,
                  });
                });
            }, []);

    if (state.isLoading) {
        return <Loading />;
    }


      return (
        <context.Provider value={{
            state,
            register,
            login,
            logout
        }}>
            {children}
        </context.Provider>
    );

}

export default AuthProvider