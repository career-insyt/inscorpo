import { LoadingIcon } from "@/components/ui/loading-icon";

export default function DashboardLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 font-mono select-none">
      <div className="p-8 rounded-2xl border-2 border-blue-500 shadow-[5px_5px_0px_0px_#2563eb] bg-white flex flex-col items-center space-y-4 max-w-sm w-full text-center">
        <LoadingIcon size="lg" variant="blue" />
        <div className="space-y-1">
          <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">
            Calibrating Dashboard
          </h2>
          <p className="text-xs font-sans text-slate-600 font-medium">
            Fetching competencies, passes &amp; activity telemetry...
          </p>
        </div>
      </div>
    </div>
  );
}
