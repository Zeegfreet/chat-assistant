import { useState, type ComponentProps } from "react"
import { PageLoader } from "../PageLoader";

export interface StaticImageProps extends ComponentProps<"img"> {}

export const StaticImage: React.FC<StaticImageProps> = ({
    src,
    ...other
}) => {
    const baseURL = import.meta.env.VITE_FILES_URL
    const [loading, setLoading] = useState(true);
    const url = src ? `${baseURL}/${src}` : undefined;

    return (
        <>
            {loading && <PageLoader />}
            <img
                src={url}
                {...other}
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
                style={{ display: loading ? "none" : undefined }}
            />
        </>
    )
}