import { CrudSearchModule, type CrudSearchModuleProps } from "@/modules/crud/search-module"

export const CredentialsPage: React.FC = () => {
    const searchColumns: CrudSearchModuleProps["columns"] = [
        {
            accessorKey: "id",
            header: "Código",
        },
        {
            accessorKey: "name",
            header: "Nome",
        },
        {
            accessorKey: "createdAt",
            header: "Criado Em",
            cell: ({ getValue }) => new Date(getValue()).toLocaleString()
        },
        {
            accessorKey: "updatedAt",
            header: "Atualizado Em",
            cell: ({ getValue }) => new Date(getValue()).toLocaleString()

        }
    ]


    return (
        <>
            <CrudSearchModule
                columns={searchColumns}
                pathName="credentials"
            />
        </>
    )
}