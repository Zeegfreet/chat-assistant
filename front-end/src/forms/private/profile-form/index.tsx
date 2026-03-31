import { PageLoader } from "@/components/PageLoader"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { profileSchema, type IProfileSchema } from "./schema"
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { SaveIcon } from "lucide-react"
import { useSelector } from "react-redux"
import { selectByLoggedUserName, selectBySessionIsLoadingState, selectBySessionIsSuccessState } from "@/store/session/selectors"
import { useEffect } from "react"
import useAppDispatch from "@/hooks/useAppDispatch"
import { sessionActions } from "@/store/session/actions"


export const ProfileForm: React.FC = () => {
    const { t } = useTranslation("forms");
    const isLoading = useSelector(selectBySessionIsLoadingState);
    const isSuccess = useSelector(selectBySessionIsSuccessState)
    const dispatch = useAppDispatch();
    const form = useForm({
        resolver: zodResolver(profileSchema),
        mode: "onChange",
        disabled: isLoading,
        defaultValues: {
            name: ""
        }

    })
    const userName = useSelector(selectByLoggedUserName);

    useEffect(() => {
        if (userName) form.setValue("name", userName);
    }, [userName, form]);

    useEffect(() => {
        dispatch(sessionActions.restoreStates())
    }, [isSuccess])

    const handleSubmit = (values: IProfileSchema) => {
        dispatch(sessionActions.updateProfile(values))
    }

    return (
        <PageLoader
            isLoading={isLoading}
        >
            <form
                className="flex flex-col gap-2"
                onSubmit={form.handleSubmit(handleSubmit)}
             >
                <Controller 
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>
                                {t("signup.name")}
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
                <div>
                    <Button
                        type="submit"
                        className="min-w-40"
                        variant="outline"
                    >
                        <SaveIcon /> {t("save")}
                    </Button>
                </div>
            </form>
        </PageLoader>
    )
}