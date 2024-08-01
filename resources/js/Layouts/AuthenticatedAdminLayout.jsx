import { useEffect, useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import {Link, router, usePage} from '@inertiajs/react';
import AdminPanelLayout from "@/Layouts/AdminPanelLayout.jsx";
import { ContentLayout } from "@/Components/admin-panel/ContentLayout.jsx";
import CustomBreadcrumb from "@/Components/CustomBreadCrumb.jsx";

export default function AuthenticatedAdmin({ user, header, children }) {
    const { url } = usePage().props; // Get the current URL from Inertia's page props
    const [pageTitle, setPageTitle] = useState("Webrana"); // Default title

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect(() => {
        // router.reload()
        // Use url from usePage props or fallback to window.location.pathname
        const currentUrl = url || window.location.pathname;

        if (currentUrl) {
            const pathSegments = currentUrl.split("/").filter(Boolean); // Split and filter path segments
            const lastPathSegment = pathSegments[pathSegments.length - 1]; // Get the last path segment

            const title = capitalizeFirstLetter(lastPathSegment);
            setPageTitle(title);
            document.title = title; // Update document title
        }
    }, [url]);

    return (
        <AdminPanelLayout>
            <ContentLayout title={pageTitle} user={user}>
                {/*<CustomBreadcrumb url={url}/>*/}
                {children}
            </ContentLayout>
        </AdminPanelLayout>
    );
}
