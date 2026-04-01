import { useEffect, useState } from "react";

// Usamos <T> para que o hook aceite qualquer tipo de dado (string, number, object, etc.)
export function useDebounce<T>(value: T, delay: number): T {
    // Inicializamos com o valor real para evitar o flash de valor vazio no primeiro render
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Limpeza do timer (essencial para evitar memory leaks e bugs)
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}