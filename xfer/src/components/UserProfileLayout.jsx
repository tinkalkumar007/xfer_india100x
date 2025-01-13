import { Outlet } from "react-router-dom";
import UserProfileSidebar from "./UserProfileSidebar";

const UserProfileLayout = () => {
  const userProfileSidebarItems = {
    account: [
      {
        title: "Profile",
        href: "xfer/account/profile",
      },
      {
        title: "Security",
        href: "xfer/account/security",
      },
      {
        title: "Appearance",
        href: "xfer/account/appearance",
      },
      {
        title: "Notifications",
        href: "xfer/account/notifications",
      },
    ],
    developer: [
      {
        title: "API Keys",
        href: "xfer/developer/API-keys",
      },
      {
        title: "API Logs",
        href: "xfer/developer/API-Logs",
      },
      {
        title: "Webhooks",
        href: "xfer/developer/webhooks",
      },
      {
        title: `IP's Whitelisting`,
        href: "xfer/developer/ip-whitelisting",
      },
    ],
    team: [
      {
        title: "Users",
        href: "xfer/team/users",
      },
      {
        title: `Logs`,
        href: "xfer/team/logs",
      },
    ],
  };
  return (
    <>
      {/* <div className="md:hidden">
        <img
          src="/examples/forms-light.png"
          width={1280}
          height={791}
          alt="Forms"
          className="block dark:hidden"
        />
        <img
          src="/examples/forms-dark.png"
          width={1280}
          height={791}
          alt="Forms"
          className="hidden dark:block"
        />
      </div> */}
      {/* "space-y-6 p-10 pb-16 block" */}
      <div className="space-y-6 p-10 pb-16 block w-[100%]">
        {/* <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" /> */}
        {/* className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0" */}
        <div className="flex flex-col justify-start space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="w-[100%] lg:w-1/5">
            <UserProfileSidebar items={userProfileSidebarItems} />
          </aside>
          <div className="flex-1 lg:max-w-7xl">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfileLayout;
