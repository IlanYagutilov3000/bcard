import {
    createContext,
    useContext,
    useState,
    ReactNode,
    FunctionComponent,
} from "react";

interface SearchContextType {
    search: string;
    setSearch: (search: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearchContext = (): SearchContextType => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error("useSearchContext must be used within a SearchProvider");
    }
    return context;
};

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [search, setSearch] = useState<string>("");

    return (
        <SearchContext.Provider value={{ search, setSearch }}>
            {children}
        </SearchContext.Provider>
    );
};