import { PageLoader } from "@/components/PageLoader"
import { Button } from "@/components/ui/button"
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCrudContext } from "@/contexts/crud-context/crud-provider"
import { selectByCrudUpdateCurrentItem, selectByCrudUpdateIsLoading, selectByCrudUpdateIsSuccess } from "@/store/crud/selectors"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { createCredentialSchema, type ICreateCredentialSchema } from "./schema"
import { useTranslation } from "react-i18next"
import useAppDispatch from "@/hooks/useAppDispatch"
import { crudActions } from "@/store/crud/actions"
import { toast } from "sonner"

export const UpdateCredentialForm: React.FC = () => {
    const { t } = useTranslation("forms")
    const isSuccess = useSelector(selectByCrudUpdateIsSuccess);
    const isLoading = useSelector(selectByCrudUpdateIsLoading);
    const currentItem = useSelector(selectByCrudUpdateCurrentItem);
    const { actions } = useCrudContext();
    const dispatch = useAppDispatch();

    const form = useForm({
            resolver: zodResolver(createCredentialSchema),
            mode: "onChange",
            disabled: isLoading,
                defaultValues: {
                name: "",
                accessToken: undefined,
                refreshToken: undefined,
                code: undefined,
                accountId: undefined,
            }
        })

    React.useEffect(() => { 
        if(currentItem){
            const values = Object.entries(currentItem).map(([key, value]) => {
                if(value === null) return [key, undefined]
                return [key, value]
            })
            const currentItemWithUndefined = Object.fromEntries(values)
            form.reset(currentItemWithUndefined)
        }
    }, [currentItem])

    React.useEffect(() => {
        if (isSuccess) {
            toast.success("success update")
        }
    }, [isSuccess, isLoading])

    const handleSubmit = (values: ICreateCredentialSchema) => {
        if(!currentItem){
            return toast.error("No item selected")
        }
        dispatch(crudActions.update(currentItem.id, values, "credentials"))
    }

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
                    name="accessToken"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>
                                {t("credentials.accessToken")}
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
                    name="refreshToken"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>
                                {t("credentials.refreshToken")}
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
                    <Button onClick={() => form.reset(currentItem)} className="w-30">{t("clear")}</Button>
                </div>
            </form>
        </PageLoader>
    )
}