import { Button } from "@/components/ui/button"
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useTranslation } from "react-i18next"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpSchema, type ISignupValues } from "./schema"
import { PageLoader } from "@/components/PageLoader"
import { useSelector } from "react-redux"
import { selectBySessionErrorState, selectBySessionIsLoadingState, selectBySessionIsSuccessState } from "@/store/session/selectors"
import { sessionActions } from "@/store/session/actions"
import useAppDispatch from "@/hooks/useAppDispatch"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { toast } from "sonner"

export const SignUpForm: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation("forms");
    const isLoading = useSelector(selectBySessionIsLoadingState);
    const isSuccess = useSelector(selectBySessionIsSuccessState);
    const error = useSelector(selectBySessionErrorState);
    const dispatch = useAppDispatch();

    const form = useForm({
        resolver: zodResolver(signUpSchema),
        disabled: isLoading,
        defaultValues: {
            name: "",
            email: "",
            emailConfirm: "",
            password: "",
            passwordConfirm: ""
        },
        mode: "onChange"
    })

    useEffect(() => {
        if(isSuccess){
            form.reset()
            navigate("/")
        }
        if(isSuccess === false){
            throwError(error as string)
        }
    },[isSuccess, error])

    const throwError = (code: string) => {
        if(code === "EMAIL_ALREADY_EXISTS_ERROR"){
            toast.error(t("signup.messages.errors.title"), { description: t(`signup.messages.errors.${code}`) })
        }
    }

    const handleSubmit = (values: ISignupValues) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { emailConfirm, passwordConfirm, ...payload } = values;
        dispatch(sessionActions.signUp(payload))
    }

    return (
        <PageLoader
            isLoading={isLoading}
        >
            <form 
                className="flex flex-col gap-5"
                onSubmit={form.handleSubmit(handleSubmit)}
            >
                <Controller 
                    name="name"
                    control={form.control}
                    render={({field, fieldState}) => (
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
                
                <Controller 
                    name="email"
                    control={form.control}
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>
                                {t("signup.email")}
                            </FieldLabel>
                            <FieldContent>
                                <Input 
                                    {...field}
                                    id={field.name}
                                    type="email"
                                    aria-invalid={fieldState.invalid}
                                />
                            </FieldContent>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller 
                    name="emailConfirm"
                    control={form.control}
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>
                                {t("signup.confirm email")}
                            </FieldLabel>
                            <FieldContent>
                                <Input 
                                    {...field}
                                    id={field.name}
                                    type="email"
                                    aria-invalid={fieldState.invalid}
                                />
                            </FieldContent>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller 
                    name="password"
                    control={form.control}
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>
                                {t("signup.password")}
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
                    name="passwordConfirm"
                    control={form.control}
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>
                                {t("signup.confirm password")}
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

                <Field>
                    <FieldContent>
                        <Button type="submit">{t("save")}</Button>
                    </FieldContent>
                </Field>
            </form>
        </PageLoader>
    )
}