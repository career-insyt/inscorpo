import { MarketingNavbar } from "@/components/layout/marketing-navbar";
import { FormalFooter } from "@/components/layout/formal-footer";
import { OrganizationSchema } from "@/components/seo/structured-data";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div 
      className="bg-[#F0F7FF] text-[#1A1D2E] min-h-screen selection:bg-[#3B5BDB]/20 selection:text-[#3B5BDB]"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(59, 130, 246, 0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(59, 130, 246, 0.08) 1px, transparent 1px)
        `,
        backgroundSize: "32px 32px"
      }}
    >
      <OrganizationSchema />
      <MarketingNavbar />
      <main>{children}</main>
      <FormalFooter />
    </div>
  );
}



