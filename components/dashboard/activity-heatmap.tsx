"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calendar, Zap, Sparkles } from "lucide-react";

interface HeatmapCell {
  dateStr: string;
  level: number;
  totalXp: number;
  mins: number;
}

interface ActivityHeatmapProps {
  heatmapGrid: HeatmapCell[];
  totalLogsCount: number;
}

const WEEKS = 24;
const DAYS = 7;
const DAY_LABELS = ["Mon", "", "Wed", "", "Fri", "", "Sun"];

function getMonthLabel(dateStr: string) {
  const [year, month, day] = dateStr.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleString("en-US", { month: "short" });
}

export function ActivityHeatmap({ heatmapGrid, totalLogsCount }: ActivityHeatmapProps) {
  const [hoveredCell, setHoveredCell] = useState<HeatmapCell | null>(null);

  // Build week-columnar grid: [week][day]
  const weeks = useMemo(() => {
    const grid: (HeatmapCell | null)[][] = [];
    for (let w = 0; w < WEEKS; w++) {
      const weekCells: (HeatmapCell | null)[] = [];
      for (let d = 0; d < DAYS; d++) {
        const idx = w * DAYS + d;
        weekCells.push(heatmapGrid[idx] ?? null);
      }
      grid.push(weekCells);
    }
    return grid;
  }, [heatmapGrid]);

  // Compute stats
  const activeDaysCount = useMemo(() => {
    return heatmapGrid.filter((c) => c && c.level > 0).length;
  }, [heatmapGrid]);

  const totalPeriodXp = useMemo(() => {
    return heatmapGrid.reduce((sum, c) => sum + (c ? c.totalXp : 0), 0);
  }, [heatmapGrid]);

  // Month labels: show month name when week's first date changes month
  const monthLabels = useMemo(() => {
    const labels: { weekIdx: number; month: string }[] = [];
    let lastMonth = "";
    weeks.forEach((weekCells, w) => {
      const firstCell = weekCells.find((c) => c !== null);
      if (firstCell) {
        const month = getMonthLabel(firstCell.dateStr);
        if (month !== lastMonth) {
          labels.push({ weekIdx: w, month });
          lastMonth = month;
        }
      }
    });
    return labels;
  }, [weeks]);

  // Cell Level CSS Classes
  const getCellColorClass = (level: number) => {
    switch (level) {
      case 3:
        return "bg-emerald-500 border-emerald-600 shadow-xs";
      case 2:
        return "bg-emerald-600/80 border-emerald-600";
      case 1:
        return "bg-emerald-400/50 border-emerald-400";
      default:
        return "bg-slate-100 border-slate-300";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full rounded-2xl p-5 sm:p-6 space-y-4 font-sans border-2 border-blue-500 bg-white shadow-[5px_5px_0px_0px_#2563eb]"
    >
      {/* Header & Stats Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-blue-100 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-[#2563eb]" />
            <h2 className="text-sm sm:text-base font-black uppercase tracking-wide font-mono text-slate-900">
              Learning Activity &amp; Commit Graph
            </h2>
          </div>
          <p className="text-xs font-semibold text-slate-700 font-sans">
            {totalLogsCount} total contributions • {activeDaysCount} active days in the last 24 weeks (6 Months)
          </p>
        </div>

        {/* Dynamic Tooltip / XP Summary Pill */}
        <div className="flex items-center gap-2 flex-wrap">
          {hoveredCell ? (
            <div className="text-xs font-mono font-black px-3 py-1.5 rounded-xl flex items-center gap-2 border-2 bg-blue-50 border-blue-500 text-blue-900 shadow-xs animate-in fade-in">
              <Zap size={13} className={hoveredCell.totalXp > 0 ? "fill-emerald-600 text-emerald-600" : "text-[#2563eb]"} />
              <span>{hoveredCell.dateStr}:</span>
              <span className="font-bold">
                {hoveredCell.totalXp > 0 ? `+${hoveredCell.totalXp} XP` : "No activity"}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="px-2.5 py-1 rounded-xl bg-emerald-100 border border-emerald-400 text-emerald-800 font-black flex items-center gap-1">
                <Sparkles size={12} /> {totalPeriodXp.toLocaleString()} Period XP
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Heatmap Grid Scroll Container - Protected against horizontal overflow on hover */}
      <div
        className="w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-blue-300 overscroll-contain"
        style={{ overscrollBehavior: "contain" }}
      >
        <div className="w-full min-w-[700px] pr-4">
          {/* Month labels row */}
          <div className="flex justify-between mb-1.5" style={{ paddingLeft: 28 }}>
            {weeks.map((_, w) => {
              const label = monthLabels.find((m) => m.weekIdx === w);
              return (
                <div
                  key={w}
                  className="font-mono font-bold flex-1 text-left text-[10px] text-slate-700"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "visible",
                  }}
                >
                  {label ? label.month : ""}
                </div>
              );
            })}
          </div>

          {/* Day labels + grid */}
          <div className="flex gap-0 items-start w-full">
            {/* Day of week labels */}
            <div className="flex flex-col justify-between h-[116px] mr-2 flex-shrink-0">
              {DAY_LABELS.map((label, i) => (
                <div
                  key={i}
                  className="font-mono font-bold flex items-center justify-end text-[9px] text-slate-700"
                  style={{
                    height: 13,
                    width: 22,
                  }}
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Week columns */}
            <div className="flex-1 flex justify-between gap-1">
              {weeks.map((weekCells, w) => {
                const isEdgeRight = w >= weeks.length - 2;
                return (
                  <div key={w} className="flex-1 flex flex-col justify-between h-[116px] gap-1">
                    {weekCells.map((cell, d) => {
                      if (!cell) {
                        return (
                          <div
                            key={d}
                            className="w-full h-[13px] rounded-[3px] bg-transparent"
                          />
                        );
                      }
                      const level = Math.min(cell.level, 3);
                      const colorClass = getCellColorClass(level);

                      return (
                        <div
                          key={d}
                          onMouseEnter={() => setHoveredCell(cell)}
                          onMouseLeave={() => setHoveredCell(null)}
                          onClick={() => setHoveredCell(cell)}
                          title={`${cell.dateStr}: ${cell.totalXp > 0 ? `+${cell.totalXp} XP` : "No activity"}`}
                          className={`w-full h-[13px] rounded-[3px] border transition-transform cursor-pointer relative hover:z-20 ${
                            isEdgeRight ? "hover:scale-110 origin-right" : "hover:scale-120 origin-center"
                          } ${colorClass}`}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Heatmap Legend */}
          <div className="flex items-center justify-end mt-4 pt-3 font-mono text-xs border-t-2 border-slate-200 text-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase text-slate-700">Less</span>
              <div className="flex gap-1 items-center">
                <div className="w-3.5 h-3.5 rounded-[3px] bg-slate-100 border border-slate-300" />
                <div className="w-3.5 h-3.5 rounded-[3px] bg-emerald-400/50 border border-emerald-400" />
                <div className="w-3.5 h-3.5 rounded-[3px] bg-emerald-600/80 border border-emerald-600" />
                <div className="w-3.5 h-3.5 rounded-[3px] bg-emerald-500 border border-emerald-600 shadow-xs" />
              </div>
              <span className="text-[10px] font-black uppercase text-slate-700">More</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
