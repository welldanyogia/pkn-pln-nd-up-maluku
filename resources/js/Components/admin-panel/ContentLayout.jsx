import React from 'react';
import { Navbar } from '@/Components/admin-panel/Navbar.jsx';

export function ContentLayout({ title, children, user }) {
    return (
        <div>
            <Navbar title={title} user={user}/>
            <div className="container pt-8 pb-8 px-4 sm:px-8">{children}</div>
        </div>
    );
}
