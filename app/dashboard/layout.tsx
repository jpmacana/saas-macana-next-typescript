import { ReactNode } from "react";
import {DashboardNav} from "../components/DashboardNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col space-y-10 mt-10">
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col space-y-10 md:flex">
            <DashboardNav/>
          <h1>Hello</h1>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
