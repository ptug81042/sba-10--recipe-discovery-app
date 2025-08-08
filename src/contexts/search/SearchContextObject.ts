import { createContext } from "react"
import type { SearchContextType } from "./SearchContextTypes"

export const SearchContext = createContext<SearchContextType | undefined>(undefined)