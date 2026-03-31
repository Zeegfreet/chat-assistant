import type { PropsWithChildren } from "react"
import { Spinner } from "../ui/spinner"

export interface PageLoaderProps extends PropsWithChildren {
    isLoading?: boolean
}

export const PageLoader: React.FC<PageLoaderProps> = ({ isLoading = false, children }) => {
    return (
        <div
            className="relative rounded-3xl"
        >
            {children}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <Spinner 
                        className="size-10"
                    />
                </div>
            )}
        </div>
    )
}