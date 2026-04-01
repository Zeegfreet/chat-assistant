
export interface SearchLayoutProps {
    headerContent?: React.ReactNode
    children?: React.ReactNode
}

export const SearchLayout: React.FC<SearchLayoutProps> = ({ headerContent, children }) => {

    return (
        <div className="p-5 container mx-auto">
            <div>{headerContent}</div>
            <div>{children}</div>
        </div>
    )
}