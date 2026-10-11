import { MarketingNavbar } from "@/components/layout/marketing-navbar";
import { FormalFooter } from "@/components/layout/formal-footer";
import { OrganizationSchema } from "@/components/seo/structured-data";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#F7F8FC] text-[#1A1D2E] min-h-screen selection:bg-[#3B5BDB]/20 selection:text-[#3B5BDB]">
      <OrganizationSchema />
      <MarketingNavbar />
      <main>{children}</main>
      <FormalFooter />
    </div>
  );
}



