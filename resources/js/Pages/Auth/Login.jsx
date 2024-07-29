import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {Head, Link, useForm} from '@inertiajs/react';
import {LoginForm} from "@/Components/Login-Form.jsx";
import {Label} from "@/Components/ui/label.jsx";
import {Input} from "@/Components/ui/input.jsx";
import {Button} from "@/Components/ui/button.jsx";
import {ReloadIcon} from "@radix-ui/react-icons";

export default function Login({status, canResetPassword}) {
    const {data, setData, post, processing, errors, reset} = useForm({
        // email: '',
        username: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (// <GuestLayout>
        //     <Head title="Log in" />
        //
        //     {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
        //
        //     <form onSubmit={submit}>
        //         <div>
        //             <InputLabel htmlFor="email" value="Email" />
        //
        //             <TextInput
        //                 id="email"
        //                 type="email"
        //                 name="email"
        //                 value={data.email}
        //                 className="mt-1 block w-full"
        //                 autoComplete="username"
        //                 isFocused={true}
        //                 onChange={(e) => setData('email', e.target.value)}
        //             />
        //
        //             <InputError message={errors.email} className="mt-2" />
        //         </div>
        //
        //         <div className="mt-4">
        //             <InputLabel htmlFor="password" value="Password" />
        //
        //             <TextInput
        //                 id="password"
        //                 type="password"
        //                 name="password"
        //                 value={data.password}
        //                 className="mt-1 block w-full"
        //                 autoComplete="current-password"
        //                 onChange={(e) => setData('password', e.target.value)}
        //             />
        //
        //             <InputError message={errors.password} className="mt-2" />
        //         </div>
        //
        //         <div className="block mt-4">
        //             <label className="flex items-center">
        //                 <Checkbox
        //                     name="remember"
        //                     checked={data.remember}
        //                     onChange={(e) => setData('remember', e.target.checked)}
        //                 />
        //                 <span className="ms-2 text-sm text-gray-600">Remember me</span>
        //             </label>
        //         </div>
        //
        //         <div className="flex items-center justify-end mt-4">
        //             {canResetPassword && (
        //                 <Link
        //                     href={route('password.request')}
        //                     className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        //                 >
        //                     Forgot your password?
        //                 </Link>
        //             )}
        //
        //             <PrimaryButton className="ms-4" disabled={processing}>
        //                 Log in
        //             </PrimaryButton>
        //         </div>
        //     </form>
        // </GuestLayout>
        <div className="grid grid-cols-2 max-sm:grid-cols-1">
            <Head title="Masuk"/>
            <div className="content-center h-screen max-sm:hidden">
                <img className='mx-auto' src="/login.jpg" width="608" height="608" alt=""/>
            </div>
            <div className='w-full h-screen bg-fountain-blue-400 grid content-center'>
                <div className="mx-auto justify-center">
                    <img src="/logo.png" width="200" height="200" className="mx-auto"/>
                    <h2 className="text-white text-xl font-semibold mx-auto text-center">Sistem Monitoring PLN Nusa Daya UP Maluku</h2>
                    <h1 className="text-white text-8xl font-bold mt-8 max-sm:text-6xl text-center">Masuk</h1>
                    <p className="text-white text-sm max-sm:text-xs text-center">Masukkan Username & password anda.</p>
                </div>
                <div>
                    {/*<LoginForm/>*/}
                    <form onSubmit={submit}>
                        <div className="w-3/4 mx-auto grid gap-6">
                            {/*<div>*/}
                            {/*    <InputLabel className="text-white" htmlFor="email">Email</InputLabel>*/}
                            {/*    <Input className="rounded-xl"*/}
                            {/*           type="email"*/}
                            {/*           id="email"*/}
                            {/*           name="email"*/}
                            {/*           value={data.email}*/}
                            {/*           autoComplete="email"*/}
                            {/*           onChange={(e) => setData('email', e.target.value)}*/}
                            {/*           placeholder="Email"/>*/}
                            {/*</div>*/}
                            <div>
                                <InputLabel className="text-white" htmlFor="username">Username</InputLabel>
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
                                <InputLabel className="text-white" htmlFor="password">Password</InputLabel>
                                {
                                    canResetPassword && (
                                        <Link href={route('password.request')}
                                              className="text-white hover:underline text-right">
                                            Lupa password?
                                        </Link>
                                    )
                                }

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
                                    <label
                                        htmlFor="remember"
                                        className="text-sm font-medium text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Ingat saya
                                    </label>
                                    <Checkbox checked={data.remember}
                                              onChange={(e) => setData('remember', e.target.checked)}
                                              id="remember"/>
                                </div>
                                <Button variant="outline"
                                        disabled={processing}
                                        className="bg-white col-end-3 text-fountain-blue-400 space-x-4
                                        rounded-xl hover:bg-fountain-blue-400 hover:text-white">
                                    Masuk
                                    {
                                        processing && (
                                            <ReloadIcon className="ml-2 h-4 w-4 animate-spin"/>
                                        )
                                    }
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>);
}
