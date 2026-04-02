import { CreateCredentialForm } from "@/forms/crud/credentials/createCredentialForm"
import { DeleteCredentialForm } from "@/forms/crud/credentials/deleteCredentialForm"
import { UpdateCredentialForm } from "@/forms/crud/credentials/updateCredentialForm"
import { CrudModule } from "@/modules/crud"
import { type CrudSearchModuleProps } from "@/modules/crud/search-module"
import { useTranslation } from "react-i18next"

export const CredentialsPage: React.FC = () => {
    const { t } = useTranslation("common");
    const searchColumns: CrudSearchModuleProps["columns"] = [
        {
            accessorKey: "id",
            header: t("id"),
            cell: ({ getValue }) => `#${getValue()}`
        },
        {
            accessorKey: "name",
            header: t("credentials.name"),
        },
        {
            accessorKey: "createdAt",
            header: t("createdAt"),
            cell: ({ getValue }) => new Date(getValue()).toLocaleString()
        },
        {
            accessorKey: "updatedAt",
            header: t("updatedAt"),
            cell: ({ getValue }) => new Date(getValue()).toLocaleString()

        }
    ]


    return (
        <CrudModule
            title={t("credentials.title")}
            createForm={<CreateCredentialForm />}
            deleteForm={<DeleteCredentialForm />}
            updateForm={<UpdateCredentialForm />}
            searchConfig={{
                columns: searchColumns,
                pathName: "credentials"
            }}
        />
    )
}