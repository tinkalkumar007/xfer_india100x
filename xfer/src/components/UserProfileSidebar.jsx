import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const UserProfileSidebar = ({ items }) => {
  const { pathname } = useLocation();

  // Extract base path (e.g., 'account', 'developer', 'team')
  const basePath = pathname.split("/")[1]; // Gets the first part after the leading '/'

  console.log(basePath);

  // Get items for the current path
  const sidebarItems = items[basePath] || [];
  return (
    <nav
      className={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 ")}
    >
      {sidebarItems?.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          className={({ isActive }) =>
            cn(
              buttonVariants({ variant: "ghost" }),
              isActive
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline",
              "justify-start hover:no-underline"
            )
          }
        >
          {item.title}
        </NavLink>
      ))}
    </nav>
  );
};

export default UserProfileSidebar;
