import type { PropsWithChildren } from "react"
import { Spinner } from "../ui/spinner"

export interface PageLoaderProps extends PropsWithChildren {
    isLoading?: boolean
}

export const PageLoader: React.FC<PageLoaderProps> = ({ isLoading = false, children }) => {
    return (
        <div
            // Adicionamos flex flex-col e overflow-hidden
            // O overflow-hidden aqui é essencial para que o "absolute" do spinner 
            // não vaze e para que o scroll fique retido no formulário interno
            className="relative flex flex-col flex-1 min-h-0 w-full overflow-hidden"
        >
            {/* Se o 'children' for o formulário com overflow-y-auto, 
                ele agora vai respeitar o tamanho deste container.
            */}
            {children}

            {/* Ajustei a lógica do !isLoading para isLoading, 
                imagino que você queira mostrar o spinner quando ESTÁ carregando.
            */}
            {isLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <Spinner className="size-10" />
                </div>
            )}
        </div>
    )
}