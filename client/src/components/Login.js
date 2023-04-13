import { useNavigate} from 'react-router-dom';
import * as Yup from 'yup'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import {useAuth} from '../context/AuthContext'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import {FaTwitter} from 'react-icons/fa'


const Login = () => {
    const {login} = useAuth()
    const navigate = useNavigate()
    return (
        <div className="container flex flex-col items-center h-[100%]">
            <header className="flex flex-col justify-around items-center text-white w-64">
                <FaTwitter className='h-8 w-8 my-3'/>
                <h3 className='text-[31px] font-semibold font-[arial] my-2'>Inicia sesión en Twitter</h3>
            </header>
            <Formik
            initialValues={{}}
            validationSchema={Yup.object({
                username: Yup.string().required("Username is required"),
                password: Yup.string().required("Password is required")
            })}

            onSubmit={async(values,actions)=>{
                    await login(values)
                    actions.setSubmitting(false)
                    navigate('/')
                }}

            enableReinitialize
            >
            {({ handleSubmit, isSubmitting}) => (
                
                <Form 
                className='w-[300px] flex flex-col items-center h-[100%]'
                onSubmit={handleSubmit} 
                >
                    <Field 
                    name='username' 
                    placeholder="Username"
                    className='px-3 h-[56px] rounded text-white w-full bg-transparent border border-gray-600 my-3
                               focus:outline-none focus:border-sky-600'
                    />
                    <ErrorMessage component="p" className='text-red-400 text-sm' name='username' />

                    <Field 
                    name='password' 
                    placeholder="Password"
                    type="password"
                    className='px-3 h-[56px] rounded text-white w-full bg-transparent border border-gray-600 my-3
                               focus:outline-none focus:border-sky-600'
                    />
                    <ErrorMessage component="p" className='text-red-400 text-sm' name='password' />

                    <button 
                    type='submit' 
                    className='bg-white hover:bg-gray-200 w-full h-[36px] text-[15px] rounded-2xl mt-2 text-black font-semibold my-3
                    focus:outline-none disabled:bg-indigo-400 hover:cursor-pointer'
                    disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <AiOutlineLoading3Quarters className='animate-spin h-5 w5'/>
                            ) : 'Iniciar Sesion'}
                    </button>

                    <button
                    onClick={ e => e.preventDefault()}
                    className='bg-black w-full h-[36px] border border-gray-600 rounded-2xl mt-2 text-[15px] text-white font-semibold my-3
                    hover:cursor-pointer focus:outline-none '
                    >
                        ¿Olvidaste tu contraseña?
                    </button>
                </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;