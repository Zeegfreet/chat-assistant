import { ImageUpIcon } from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent, type ComponentProps } from "react"
import { Button } from "./button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { useTranslation } from "react-i18next";

export interface FileImageInputProps extends ComponentProps<"input"> {

}

export const FileImageInput: React.FC<FileImageInputProps> = (props) => {
    const { t } = useTranslation("components");
    const ref = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if(file){
            const objURL = URL.createObjectURL(file);
            setPreview(objURL)
            return () => {
                URL.revokeObjectURL(objURL)
            }
        }
        
    }, [file])

    const handleClick = () => {
        if(ref !== null){
            ref.current?.click()
        }
    }

    const availableTypes = [
        "image/png",
        "image/jpeg",
        "image/webp",
        "image/gif"
    ]

    const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files?.length === 1){
            const file = e.target.files[0]
            if(!availableTypes.some(type => type === file.type)) {
                if(ref.current) ref.current.value = ""
                return;
            }
            setFile(file)
        }
    }

    return (
        <div
            className="p-2 min-h-20 w-ful flex items-ceter justify-start box-border gap-2 border-2 rounded-2xl"
        >
            <div>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            // className="w-20 h-18 wrap-normal border-2 rounded-lg flex justify-center items-center"
                            onClick={handleClick}
                            type="button"
                            variant="secondary"
                            className="w-20 h-18"
                        >
                            <ImageUpIcon className="size-12" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        {t("infos.upload image")}
                    </TooltipContent>
                </Tooltip>
            </div>
            <div className="flex-1 flex items-center">
                { preview !== null ? <img 
                    src={preview}
                    className="w-20 h-18 rounded-2xl"
                /> : null}
            </div>
            <input 
                {...props}
                type="file"
                className="hidden"
                ref={ref}
                onChange={handleChangeFile}
                accept={availableTypes.join(", ")}
            />
        </div>
    )
}