"use client";

import { useState } from "react";
import { Check, Copy, Download, Code, Terminal, AlertTriangle, Info, CheckCircle2 } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
}

export function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const cleanCode = code.trim();
  const lines = cleanCode.split("\n");

  const handleCopy = () => {
    navigator.clipboard.writeText(cleanCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = language === "python" ? "py" : language === "sql" ? "sql" : language === "json" ? "json" : "txt";
    const blob = new Blob([cleanCode], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename || `solution.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="my-5 rounded-xl overflow-hidden border-2 border-corp-border bg-[#0d1117] text-slate-100 shadow-md font-mono text-xs">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-corp-border/40 text-[11px]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="font-bold text-slate-300 uppercase tracking-wider text-[10px] ml-1">
            {language ? language.toUpperCase() : "CODE"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#21262d] hover:bg-[#30363d] text-slate-200 transition-colors text-[10px] font-bold"
          >
            {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#21262d] hover:bg-[#30363d] text-slate-200 transition-colors text-[10px] font-bold"
          >
            <Download size={12} />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Code Table with Line Numbers */}
      <div className="p-4 overflow-x-auto leading-relaxed">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-slate-800/40">
                <td className="pr-4 text-right select-none text-slate-600 text-[11px] w-8 align-top">
                  {idx + 1}
                </td>
                <td className="whitespace-pre text-slate-200">
                  {line || " "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function RenderLessonNotes({ notes, lessonSlug }: { notes: string; lessonSlug: string }) {
  // Split notes by markdown fenced code blocks ```lang\n...```
  const parts = notes.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-4">
      {parts.map((part, idx) => {
        if (part.startsWith("```")) {
          const match = part.match(/^```(\w+)?\n([\s\S]*?)```$/);
          const lang = match ? match[1] || "python" : "python";
          const code = match ? match[2] : part.slice(3, -3);
          const ext = lang === "python" ? "py" : lang === "sql" ? "sql" : "txt";
          return (
            <CodeBlock
              key={idx}
              code={code}
              language={lang}
              filename={`INSYT_${lessonSlug}_snippet_${idx}.${ext}`}
            />
          );
        }

        // Render plain text sections with formatting
        return (
          <div
            key={idx}
            className="prose max-w-none text-xs md:text-sm whitespace-pre-line leading-relaxed font-sans text-slate-800"
          >
            {part}
          </div>
        );
      })}
    </div>
  );
}
