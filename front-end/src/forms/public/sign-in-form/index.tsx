import { PageLoader } from "@/components/PageLoader"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { selectBySessionErrorState, selectBySessionIsLoadingState, selectBySessionIsSuccessState } from "@/store/session/selectors"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { signInSchema, type ISignInValues } from "./schema"
import useAppDispatch from "@/hooks/useAppDispatch"
import { sessionActions } from "@/store/session/actions"
import { useEffect } from "react"
import { toast } from "sonner"

export const SignInForm: React.FC = () => {
    const { t } = useTranslation("forms");
    const isLoading = useSelector(selectBySessionIsLoadingState);
    const isSuccess = useSelector(selectBySessionIsSuccessState);
    const error = useSelector(selectBySessionErrorState);
    const dispatch = useAppDispatch();

    const form = useForm({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    useEffect(() => {
        if(isSuccess) {
            form.reset();
        }

        if(isSuccess === false){
            onError(error as string);
        }

    },[isSuccess])

    const onError = (error: string) => {
        toast.error(t("signin.messages.errors.title"), { description: t(`signin.messages.errors.${error}` as any) })

    }

    const handleSubmit = (data: ISignInValues) => {
        dispatch(sessionActions.signIn(data));
    }

    return (
        <PageLoader
            isLoading={isLoading}
        >
            <form 
                className="flex flex-col gap-3"
                onSubmit={form.handleSubmit(handleSubmit)}
            >
                <Controller 
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>{t("signin.email")}</FieldLabel>
                            <Input type="text" {...field} />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller 
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>{t("signin.password")}</FieldLabel>
                            <Input type="password" {...field} />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Separator />
                <div>
                    <Button className="w-full">{t("submit")}</Button>
                </div>
            </form>
        </PageLoader>
        )
}