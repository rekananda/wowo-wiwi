import { AppShell, AppShellMain } from "@mantine/core";
import { useHeadroom } from "@mantine/hooks";
import { Outlet } from "react-router-dom";
import MainHeader from "./header";

interface PropsMainLayout {
  fullContent?:boolean;
}

const MainLayout = ( {fullContent}: PropsMainLayout ) => {
  const pinned = useHeadroom({ fixedAt: 120 });

  return (
    <AppShell
      className="relative"
      header={{ height: { base: 64, md: 64, lg: 80 }, collapsed: !pinned }}
      p={fullContent? 0:16}
    >
      <MainHeader />
      <AppShellMain mih="unset"> 
        <Outlet />
      </AppShellMain>
    </AppShell>
  )
}

export default MainLayout