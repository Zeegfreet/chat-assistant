import { useEffect, useState } from "react"
import { Command, CommandDialog, CommandEmpty, CommandInput, CommandItem, CommandList } from "../ui/command"
import { Button } from "../ui/button"
import { useTranslation } from "react-i18next"
import { useDebounce } from "@/hooks/use-debounce"
import { httpServices, type IPathName } from "@/services/httpServices"
import { PageLoader } from "../PageLoader"

export interface SearchFieldProps {
  pathName: IPathName,
  exibitionColumn: string,
  onChange: (value: any) => void,
  onClear: () => void,
  value: any
}


export const SearchField: React.FC<SearchFieldProps> = ({
  pathName,
  exibitionColumn,
  onChange,
  onClear,
  value
}) => {
  const { t } = useTranslation("components");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [items, setItems] = useState<any[]>([]); // Evite usar [] como tipo
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const search = useDebounce(searchValue, 500);

  useEffect(() => {
    // Evita busca vazia ao montar o componente, se desejar
    if (search.length === 0) {
      setItems([]);
      return;
    }

    let isMounted = true; // Flag para evitar race condition

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await httpServices.search(pathName, {
          limit: 5,
          search
        });

        if (isMounted && response.success && response.data) {
          // Ajuste conforme a estrutura real do seu data.data
          setItems(response.data.data || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchData();

    return () => { isMounted = false; }; // Cleanup
  }, [search, pathName]);

  const handleClear = () => {
    setIsOpen(false)
    onClear()
  }

  return (
    <div className="flex flex-col gap-4">
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        type="button"
      >
        {value ? value[exibitionColumn] : "Selecione...."}
      </Button>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={t("search.content")}
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList>
            {isLoading ? (
              <div className="p-4 flex justify-center"><PageLoader isLoading /></div>
            ) : (
              <>
                <CommandEmpty>{t("infos.empty")}</CommandEmpty>
                {items.map((item, index) => (
                  <CommandItem
                    key={item.id || index}
                    onSelect={() => {
                      onChange(item);
                      setIsOpen(false);
                    }}
                  >
                    {item[exibitionColumn]}
                  </CommandItem>
                ))}
                {value ?
                  <CommandItem asChild>
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={handleClear}
                      size="sm"
                    >
                      {t("search.clear")}
                    </Button>
                  </CommandItem> : null
                }
              </>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
};