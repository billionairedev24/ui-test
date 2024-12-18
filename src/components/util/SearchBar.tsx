import {ChevronDownIcon, SearchIcon} from "lucide-react";
import {Input} from "@/components/ui/input";
import React from "react";
import {
    DropdownMenu, DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";

interface SearchBarProps {
    urlPath: string;
    searchTerm: string;
    handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({urlPath, searchTerm, handleSearch, }) => {
    return (
            <div className="relative w-full max-w-md">
                <SearchIcon
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
                />
                <Input
                    type="text"
                    placeholder={urlPath.startsWith("/vendors") ? "Search vendors..." : "Search products..." }
                    value={searchTerm}
                    onChange={handleSearch}
                    className="pl-10 pr-4 py-2 rounded-md bg-muted focus:ring-2 focus:ring-primary focus:outline-none"
                />
            </div>

    );
};

export default SearchBar;