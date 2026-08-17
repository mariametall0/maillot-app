import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Wrappers next/link, next/navigation conscients de la locale (préfixe /fr,/en,/ar).
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
