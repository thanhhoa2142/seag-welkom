/** @format */

import { PropsWithChildren } from "react";
import { PageContainer } from "./page-container";
import BottomBar from "@/components/ui2/bottom-bar";

export default function ScreenWrap({ children }: PropsWithChildren) {
  return (
    <div className="h-dvh flex flex-col">
      <PageContainer>{children}</PageContainer>

      <BottomBar />
    </div>
  );
}
