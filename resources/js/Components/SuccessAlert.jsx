import {CheckIcon, ExclamationTriangleIcon} from "@radix-ui/react-icons"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import {Terminal} from "lucide-react";

export function SuccessAlert({title,message}) {
    return (
        <Alert>
            <CheckIcon className="h-4 w-4" />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>
                {message}
            </AlertDescription>
        </Alert>
    )
}
