import { LoadingIcon } from "@/components/ui/loading-icon";

export default function RootLoading() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-mono select-none">
      <div className="p-8 rounded-2xl border-2 border-blue-500 shadow-[6px_6px_0px_0px_#2563eb] bg-white flex flex-col items-center space-y-4 max-w-sm w-full text-center">
        <LoadingIcon size="lg" variant="blue" />
        <div className="space-y-1">
          <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">
            Loading Platform
          </h2>
          <p className="text-xs font-sans text-slate-600 font-medium">
            Synchronizing verifiable corporate state...
          </p>
        </div>
      </div>
    </div>
  );
}
