import { PageLoader } from "@/components/PageLoader"
import { selectByCrudCreateIsLoading, selectByCrudCreateIsSuccess } from "@/store/crud/selectors"
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux"
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import useAppDispatch from "@/hooks/useAppDispatch";
import { crudActions } from "@/store/crud/actions";
import { useEffect } from "react";
import { toast } from "sonner";
import { agentSchema, type IAgentSchema } from "./schema";


export const CreateCredentialForm: React.FC = () => {
    const { t } = useTranslation("forms")
    const isLoading = useSelector(selectByCrudCreateIsLoading);
    const isSuccess = useSelector(selectByCrudCreateIsSuccess);
    const dispatch = useAppDispatch();
    const form = useForm({
        resolver: zodResolver(agentSchema),
        mode: "onChange",
        disabled: isLoading,
        defaultValues: {
            name: "",
            slug: "",
            model: "gemini-3.1-flash-lite-preview",
            isActive: false,
            provider: "gemini",
            prompt: "",
            // credentials: z.object({
            //     id: z.number()
            // }).optional(),
        }
    })

    const handleSubmit = (values: IAgentSchema) => {
        dispatch(crudActions.create(values, "credentials"))
    }

    useEffect(() => {
        if (isSuccess) {
            form.reset()
            toast.message("Successfull created")

        }
        return () => {
            dispatch(crudActions.resetOneModule("create"))
        }
    }, [isSuccess])

    return (
        <PageLoader
            isLoading={isLoading}
        >
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col gap-5"
            >
                <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>
                                {t("credentials.name")}
                            </FieldLabel>
                            <FieldContent>
                                <Input
                                    {...field}
                                    id={field.name}
                                    type="text"
                                    aria-invalid={fieldState.invalid}
                                />
                            </FieldContent>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="slug"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>
                                {t("credentials.slug")}
                            </FieldLabel>
                            <FieldContent>
                                <Textarea
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                />
                            </FieldContent>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="model"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>
                                {t("credentials.model")}
                            </FieldLabel>
                            <FieldContent>
                                <Textarea
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                />
                            </FieldContent>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="code"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>
                                {t("credentials.code")}
                            </FieldLabel>
                            <FieldContent>
                                <Input
                                    {...field}
                                    id={field.name}
                                    type="text"
                                    aria-invalid={fieldState.invalid}
                                />
                            </FieldContent>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="accountId"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>
                                {t("credentials.accountId")}
                            </FieldLabel>
                            <FieldContent>
                                <Input
                                    {...field}
                                    id={field.name}
                                    type="text"
                                    aria-invalid={fieldState.invalid}
                                />
                            </FieldContent>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <div className="flex gap-5 justify-evenly">
                    <Button type="submit" className="w-30">{t("save")}</Button>
                    <Button onClick={() => form.reset()} className="w-30">{t("clear")}</Button>
                </div>
            </form>
        </PageLoader>
    )
}