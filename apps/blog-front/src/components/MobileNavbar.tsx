import { PropsWithChildren } from "react";
import SideBar from "./SiderBar";
import { Menu } from "lucide-react";

type MobileNavbarProps = PropsWithChildren;
const MobileNavbar = (props: MobileNavbarProps) => {
  return (
    <div className="md:hidden">
      <SideBar
        triggerIcon={<Menu className="w-4" />}
        triggerClassName="absolute top-2 left-2"
      >
        {props.children}
      </SideBar>
    </div>
  );
};

export default MobileNavbar;
