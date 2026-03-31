import { PageLoader } from "@/components/PageLoader"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { SaveIcon } from "lucide-react"
import { changePasswordSchema } from "./schema"
import useAppDispatch from "@/hooks/useAppDispatch"
import { useSelector } from "react-redux"
import { selectBySessionErrorState, selectBySessionIsLoadingState, selectBySessionIsSuccessState } from "@/store/session/selectors"
import { sessionActions } from "@/store/session/actions"
import type { IProfileChangePassword } from "@/store/session/types"
import { useEffect, useLayoutEffect } from "react"
import { toast } from "sonner"


export const ChangePasswordForm: React.FC = () => {
    const { t, i18n } = useTranslation("forms");
    const dispatch = useAppDispatch();
    const isLoading = useSelector(selectBySessionIsLoadingState);
    const isSuccess = useSelector(selectBySessionIsSuccessState);
    const error = useSelector(selectBySessionErrorState);
    const form = useForm({
        resolver: zodResolver(changePasswordSchema),
        mode: "onChange",
        disabled:isLoading,
        defaultValues: {
            password: "",
            newPassword: "",
            passwordConfirm: ""
        }

    })
    useLayoutEffect(() => {
        dispatch(sessionActions.restoreStates())
    })

    useEffect(() => {
        if(isSuccess === true) {
            form.reset()
            onSuccessChange()
        }
        if(isSuccess === false){
            onError()
        }
        return () => {
            dispatch(sessionActions.restoreStates())
        }
    },[isSuccess])

    const onSuccessChange = () => {
        toast.success(t("profile.messages.change password"))
        dispatch(sessionActions.restoreStates())
    }
    
    const onError = () => {
        const key = `forms:profile.messages.${error}` as any
        if(i18n.exists(key)){
            toast.error(t(key))
        } else {
            toast.error(error)
        }
        dispatch(sessionActions.restoreStates())
    }

    const handleSubmit = (values: IProfileChangePassword) => {
        dispatch(sessionActions.changePassword(values))
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
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>
                                {t("profile.password")}
                            </FieldLabel>
                            <FieldContent>
                                <Input 
                                    {...field}
                                    id={field.name}
                                    type="password"
                                    aria-invalid={fieldState.invalid}
                                />
                            </FieldContent>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller 
                    name="newPassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>
                                {t("profile.new password")}
                            </FieldLabel>
                            <FieldContent>
                                <Input 
                                    {...field}
                                    id={field.name}
                                    type="password"
                                    autoComplete="off"
                                    aria-invalid={fieldState.invalid}
                                />
                            </FieldContent>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller 
                    name="passwordConfirm"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>
                                {t("profile.Confirm Password")}
                            </FieldLabel>
                            <FieldContent>
                                <Input 
                                    {...field}
                                    id={field.name}
                                    type="password"
                                    autoComplete="off"
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