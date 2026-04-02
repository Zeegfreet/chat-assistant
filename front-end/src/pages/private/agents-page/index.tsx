import { Badge } from "@/components/ui/badge";
import { CreateAgentForm } from "@/forms/crud/agents/createAgentForm";
import { DeleteAgentForm } from "@/forms/crud/agents/deleteAgentForm";
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
                accessorKey: "slug",
                header: t("agents.slug"),
            },
            {
                accessorKey: "isActive",
                header: t("agents.active"),
                cell: ({ getValue }) => getValue() ? <Badge className="bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300">{t("yes")}</Badge> : <Badge variant="destructive">{t("no")}</Badge>
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
            title={t("agents.title")}
            createForm={<CreateAgentForm />}
            deleteForm={<DeleteAgentForm />}
            updateForm={<UpdateAgentForm />}
            searchConfig={searchConfig}

        />
    )
}