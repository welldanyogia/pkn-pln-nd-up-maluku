import {useState} from 'react';
import Checkbox from '@/Components/Checkbox';
import {Head, Link, useForm} from '@inertiajs/react';
import {Input} from "@/Components/ui/input.jsx";
import {Button} from "@/Components/ui/button.jsx";
import {ReloadIcon} from "@radix-ui/react-icons";
import {LoginAlert} from "@/Components/LoginAlert.jsx";

export default function Login({status, canResetPassword}) {
    const {data, setData, post, processing, errors, reset} = useForm({
        username: '',
        password: '',
        remember: false,
    });

    // State to track if login failed
    const [loginFailed, setLoginFailed] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        // Reset login failure state before attempting login
        setLoginFailed(false);

        post(route('login'), {
            onFinish: () => reset('password'),
            onError: () => setLoginFailed(true) // Set loginFailed to true if login fails
        });
    };

    return (
        <div className="grid grid-cols-2 max-sm:grid-cols-1">
            <Head title="Masuk"/>
            <div className="content-center h-screen max-sm:hidden bg-fountain-blue-400">
                <img className='mx-auto' src="/logo-login.png" width="608" height="608" alt=""/>
            </div>
            <div className='w-full h-screen grid content-center'>
                <div className="mx-auto w-3/4">
                    <img src="/logo-nusadaya.png" className="mx-auto"/>
                    <h1 className="text-fountain-blue-400 text-7xl font-extrabold mt-8 max-sm:text-5xl text-left">Masuk</h1>
                </div>

                <div className="mt-6">
                    {loginFailed && <LoginAlert />} {/* Conditionally show LoginAlert if login fails */}

                    <form onSubmit={submit}>
                        <div className="w-3/4 mx-auto grid gap-6">
                            <div>
                                <Input className="rounded-xl"
                                       type="username"
                                       id="username"
                                       name="username"
                                       value={data.username}
                                       autoComplete="username"
                                       onChange={(e) => setData('username', e.target.value)}
                                       placeholder="Username"/>
                            </div>
                            <div className="grid grid-cols-2 justify-between">
                                <Input className="rounded-xl col-span-2"
                                       type="password"
                                       id="password"
                                       name="password"
                                       value={data.password}
                                       autoComplete="current-password"
                                       onChange={(e) => setData('password', e.target.value)}
                                       placeholder="Password"/>
                            </div>
                            <div className="grid grid-cols-2 justify-between">
                                <div className="flex items-center col-span-2 space-x-2">
                                    <label htmlFor="remember" className="text-sm font-medium text-fountain-blue-400">
                                        Ingat saya
                                    </label>
                                    <Checkbox checked={data.remember}
                                              onChange={(e) => setData('remember', e.target.checked)}
                                              id="remember"/>
                                </div>
                                <Button variant="outline"
                                        disabled={processing}
                                        className="bg-white border-fountain-blue-400 border-2 col-end-3 text-fountain-blue-400 space-x-4
                                        rounded-xl hover:bg-fountain-blue-400 hover:text-white">
                                    Masuk
                                    {processing && <ReloadIcon className="ml-2 h-4 w-4 animate-spin"/>}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
