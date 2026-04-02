import { PageLoader } from "@/components/PageLoader"
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
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
import { Switch } from "@/components/ui/switch";
import { PlusCircle, SaveIcon, Trash } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchField } from "@/components/SearchField";
import { TypographyH1 } from "@/components/Typography";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { selectThemeByApp } from "@/store/app/selectors";
import { selectByCrudUpdateCurrentItem, selectByCrudUpdateIsLoading, selectByCrudUpdateIsSuccess } from "@/store/crud/selectors";


export const UpdateAgentForm: React.FC = () => {
    const { t } = useTranslation("forms")
    const isSuccess = useSelector(selectByCrudUpdateIsSuccess);
    const isLoading = useSelector(selectByCrudUpdateIsLoading);
    const currentItem = useSelector(selectByCrudUpdateCurrentItem);
    const dispatch = useAppDispatch();
    const theme = useSelector(selectThemeByApp);


    const form = useForm({
        resolver: zodResolver(agentSchema),
        mode: "onChange",
        disabled: isLoading,
        defaultValues: {
            name: "",
            slug: "",
            model: "gemini-3.1-flash-lite-preview",
            isActive: true,
            provider: "gemini",
            prompt: "",
            credentials: undefined,
            signeds: []
        }
    });


    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "signeds"
    })

    useEffect(() => {
        if (currentItem) {
            const values = Object.entries(currentItem).map(([key, value]) => {
                if (value === null) return [key, undefined]
                return [key, value]
            })
            const currentItemWithUndefined = Object.fromEntries(values)
            form.reset(currentItemWithUndefined)
        }
    }, [currentItem])

    useEffect(() => {
        if (isSuccess) {
            toast.success("success update")
        }
    }, [isSuccess, isLoading])

    const handleSubmit = (values: IAgentSchema) => {
        console.log(currentItem)
        if (!currentItem) {
            return toast.error("No item selected")
        }
        dispatch(crudActions.update(currentItem.id, values, "agents"))
    }

    return (
        <PageLoader
            isLoading={isLoading}

        >
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col gap-5 p-10 max-h-full overflow-auto"
            >
                <div className="flex gap-5 justify-start">
                    <Button type="submit" className="w-30" variant="outline" ><SaveIcon />{t("save")}</Button>
                </div>
                <div
                    className="flex gap-5 wrap-normal items-center"
                >
                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>
                                    {t("name")}
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
                        name="provider"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>
                                    {t("agents.provider")}
                                </FieldLabel>
                                <FieldContent>
                                    <Select
                                        {...field}

                                    >
                                        <SelectTrigger
                                            className="w-full"
                                        >
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent

                                        >
                                            <SelectGroup>
                                                <SelectLabel>{t("agents.provider")}</SelectLabel>
                                                <SelectItem value="gemini">Google Gemini</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
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
                                    {t("agents.model")}
                                </FieldLabel>
                                <FieldContent>
                                    <Select
                                        {...field}

                                    >
                                        <SelectTrigger
                                            className="w-full"
                                        >
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>{t("agents.model")}</SelectLabel>
                                                <SelectItem value="gemini-3.1-flash-lite-preview">gemini-3.1-flash-lite-preview</SelectItem>
                                                <SelectItem value="gemini-3-flash-preview">gemini-3-flash-preview</SelectItem>
                                                <SelectItem value="gemini-2.5-flash-lite">gemini-2.5-flash-lite</SelectItem>
                                                <SelectItem value="gemini-2.5-flash">gemini-2.5-flash</SelectItem>
                                                <SelectItem value="gemini-2.5-pro">gemini-2.5-pro</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FieldContent>
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Controller
                        name="credentials"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>
                                    {t("agents.credentials")}
                                </FieldLabel>
                                <FieldContent>
                                    <SearchField
                                        pathName="credentials"
                                        exibitionColumn="name"
                                        onChange={field.onChange}
                                        onClear={() => field.onChange(undefined)}
                                        value={field.value}
                                    />
                                </FieldContent>
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Controller
                        name="isActive"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>
                                    {t("active")}
                                </FieldLabel>
                                <FieldContent>
                                    <Switch
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FieldContent>
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                </div>
                <Controller
                    name="slug"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>
                                {t("agents.slug")}
                            </FieldLabel>
                            <FieldContent>
                                <Input
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
                    name="prompt"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>
                                {t("agents.prompt")}
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
                <div
                    className="flex flex-col border border-muted-foreground p-5 rounded-2xl gap-5"
                >
                    <div>
                        <TypographyH1>{t("agents.signeds")}</TypographyH1>
                    </div>
                    {fields.map((field, index) => {


                        return (
                            <div
                                className="flex gap-5 items-center"
                                key={field.id}
                            >
                                <div className="flex-1 gap-5">
                                    <Controller
                                        name={`signeds.${index}.url`}
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel>
                                                    {t("agents.url")}
                                                </FieldLabel>
                                                <FieldContent>
                                                    <Input
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
                                        name={`signeds.${index}.headers`}
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel>
                                                    {t("agents.Headers")}
                                                </FieldLabel>
                                                <FieldContent>
                                                    <CodeMirror
                                                        value={typeof field.value === 'string' ? field.value : JSON.stringify(field.value, null, 2)}
                                                        height="150px"
                                                        extensions={[json()]}
                                                        theme={theme === "dark" ? "dark" : "light"}
                                                        onChange={(value) => {
                                                            try {
                                                                const parsed = JSON.parse(value);
                                                                field.onChange(parsed);
                                                            } catch (e) {
                                                                field.onChange(value);
                                                            }
                                                        }}
                                                        className="text-sm"
                                                    />
                                                </FieldContent>
                                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                            </Field>
                                        )}
                                    />
                                </div>
                                <Button
                                    variant="outline"
                                    className="rounded-full"
                                    type="button"
                                    onClick={() => remove(index)}
                                >
                                    <Trash />
                                </Button>
                            </div>)
                    })
                    }
                    <div className="p-3">
                        <Button
                            variant="outline"
                            className="rounded-full"
                            type="button"
                            onClick={() => append({ url: "", headers: undefined })}
                        >
                            <PlusCircle />
                        </Button>
                    </div>
                </div>

            </form>
        </PageLoader>
    )
}