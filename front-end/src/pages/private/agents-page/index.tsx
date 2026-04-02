import { CreateAgentForm } from "@/forms/crud/agents/createAgentForm";
import { UpdateAgentForm } from "@/forms/crud/agents/updateAgentForm";
import { AdvancedCrudModule, type AdvancedCrudModuleProps } from "@/modules/advanced-crud"
import { useTranslation } from "react-i18next"

export interface AgentModel {
    name: string;
    slug: string;
    model: string;
    provider: string;
    prompt: string;
    isActive?: boolean;
    // credentials?: CredentialsModel;
    // signeds?: SignedsModel[];
}



export const AgentsPage: React.FC = () => {
    const { t } = useTranslation("common");

    const searchConfig: AdvancedCrudModuleProps["searchConfig"] = {
        pathName: "agents",
        columns: [
            {
                accessorKey: "id",
                header: t("id"),
                cell: ({ getValue }) => `#${getValue()}`
            },
            {
                accessorKey: "name",
                header: t("agents.name"),
            },
            {
                accessorKey: "isActive",
                header: t("agents.active"),
                cell: ({ getValue }) => getValue() ? "Yes" : "No"
            },
            {
                accessorKey: "model",
                header: t("agents.model"),
            },
            {
                accessorKey: "provider",
                header: t("agents.provider"),
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
    }

    return (
        <AdvancedCrudModule
            title={t("credentials.title")}
            createForm={<CreateAgentForm />}
            // deleteForm={<DeleteCredentialForm />}
            updateForm={<UpdateAgentForm />}
            searchConfig={searchConfig}

        />
    )
}