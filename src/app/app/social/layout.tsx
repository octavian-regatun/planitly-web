import React, { FC, PropsWithChildren } from "react";
import InnerSidebar from "~/components/InnerSidebar";
import { socialSidebarPages } from "~/lib/constants";

const SocialLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex">
      <InnerSidebar pages={socialSidebarPages} />
      {children}
    </div>
  );
};

export default SocialLayout;
