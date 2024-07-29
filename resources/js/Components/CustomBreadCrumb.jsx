import React, { Fragment, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/Components/ui/breadcrumb";

const CustomBreadcrumb = ({ url }) => {
    const location = useLocation(); // Using useLocation from react-router-dom

    // Use url or fallback to window.location.pathname
    const currentUrl = url || location.pathname;
    const pathSegments = currentUrl.split("/").filter(Boolean); // Split and filter the pathname

    // Remove "admin" from the beginning of path segments if it exists
    const adjustedPathSegments = pathSegments[0] === "admin" ? pathSegments.slice(1) : pathSegments;

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {adjustedPathSegments.map((segment, index) => {
                    const href = "/" + pathSegments.slice(0, index + 1).join("/");
                    const isLast = index === adjustedPathSegments.length - 1;

                    return (
                        <Fragment key={href}>
                            <BreadcrumbItem>
                                {!isLast ? (
                                    <BreadcrumbLink as={Link} to={href} className="hover:underline capitalize">
                                        {segment}
                                    </BreadcrumbLink>
                                ) : (
                                    <span className="font-semibold capitalize">
                                        {segment}
                                    </span>
                                )}
                            </BreadcrumbItem>
                            {!isLast && <BreadcrumbSeparator />}
                        </Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default CustomBreadcrumb;
