import { Header } from "@/components/layout/header";
import { AppSidebar } from "@/components/layout/sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppSidebar />
      <div className="flex flex-col sm:pl-14">
        <Header />
        <main className="flex-1 p-4 sm:p-6">
          <div className="w-full mx-auto">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
