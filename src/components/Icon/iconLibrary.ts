// Icon Library with Categories
export interface IconInfo {
  name: string;
  category: string;
  keywords: string[];
}

export const iconCategories: Record<string, IconInfo[]> = {
  Navigation: [
    { name: "home", category: "Navigation", keywords: ["home", "house", "main", "dashboard"] },
    { name: "menu", category: "Navigation", keywords: ["menu", "hamburger", "nav", "list"] },
    { name: "arrow_back", category: "Navigation", keywords: ["back", "arrow", "left", "previous"] },
    { name: "arrow_forward", category: "Navigation", keywords: ["forward", "arrow", "right", "next"] },
    { name: "dashboard", category: "Navigation", keywords: ["dashboard", "grid", "layout", "overview"] },
  ],
  Actions: [
    { name: "check", category: "Actions", keywords: ["check", "done", "complete", "success", "tick"] },
    { name: "add", category: "Actions", keywords: ["add", "plus", "create", "new"] },
    { name: "delete", category: "Actions", keywords: ["delete", "remove", "trash", "bin"] },
    { name: "edit", category: "Actions", keywords: ["edit", "pencil", "modify", "update"] },
    { name: "refresh", category: "Actions", keywords: ["refresh", "reload", "update", "sync"] },
  ],
  "User & Account": [
    { name: "user", category: "User & Account", keywords: ["user", "person", "profile", "account"] },
    { name: "account_circle", category: "User & Account", keywords: ["account", "circle", "profile", "avatar"] },
    { name: "settings", category: "User & Account", keywords: ["settings", "gear", "config", "preferences"] },
    { name: "logout", category: "User & Account", keywords: ["logout", "signout", "exit", "leave"] },
    { name: "lock", category: "User & Account", keywords: ["lock", "secure", "password", "privacy"] },
  ],
  Communication: [
    { name: "email", category: "Communication", keywords: ["email", "mail", "message", "inbox"] },
    { name: "notification", category: "Communication", keywords: ["notification", "bell", "alert", "reminder"] },
    { name: "chat", category: "Communication", keywords: ["chat", "message", "conversation", "talk"] },
    { name: "share", category: "Communication", keywords: ["share", "send", "forward", "social"] },
    { name: "phone", category: "Communication", keywords: ["phone", "call", "telephone", "contact"] },
  ],
  "Media & Files": [
    { name: "image", category: "Media & Files", keywords: ["image", "photo", "picture", "gallery"] },
    { name: "video", category: "Media & Files", keywords: ["video", "movie", "play", "film"] },
    { name: "file", category: "Media & Files", keywords: ["file", "document", "paper", "page"] },
    { name: "folder", category: "Media & Files", keywords: ["folder", "directory", "collection", "archive"] },
    { name: "music", category: "Media & Files", keywords: ["music", "audio", "sound", "song"] },
  ],
  "Status & Feedback": [
    { name: "star", category: "Status & Feedback", keywords: ["star", "favorite", "rating", "bookmark"] },
    { name: "favorite", category: "Status & Feedback", keywords: ["favorite", "heart", "like", "love"] },
    { name: "download", category: "Status & Feedback", keywords: ["download", "save", "get", "export"] },
    { name: "upload", category: "Status & Feedback", keywords: ["upload", "send", "post", "import"] },
    { name: "visibility", category: "Status & Feedback", keywords: ["visibility", "eye", "view", "see"] },
  ],
  Search: [
    { name: "search", category: "Search", keywords: ["search", "find", "lookup", "magnify"] },
    { name: "close", category: "Search", keywords: ["close", "cancel", "clear", "remove", "x"] },
    { name: "filter", category: "Search", keywords: ["filter", "sort", "refine", "narrow"] },
    { name: "clear", category: "Search", keywords: ["clear", "reset", "remove", "delete"] },
    { name: "find_in_page", category: "Search", keywords: ["find", "search", "locate", "page"] },
  ],
};

export const allIcons: IconInfo[] = Object.values(iconCategories).flat();

export function searchIcons(query: string): IconInfo[] {
  const lowerQuery = query.toLowerCase();
  return allIcons.filter(
    (icon) =>
      icon.name.toLowerCase().includes(lowerQuery) ||
      icon.keywords.some((keyword) => keyword.toLowerCase().includes(lowerQuery)) ||
      icon.category.toLowerCase().includes(lowerQuery)
  );
}

