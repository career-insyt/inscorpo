"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, Check, ChevronDown, Sparkles, AlertCircle } from "lucide-react";
import { searchSkillsCatalog, isSkillInCatalog, INSYT_SKILLS_CATALOG } from "@/lib/data/skills-catalog";

interface SkillComboboxProps {
  onSelectSkill: (skill: string) => void;
  selectedSkills?: string[];
  placeholder?: string;
  disabled?: boolean;
}

export function SkillCombobox({
  onSelectSkill,
  selectedSkills = [],
  placeholder = "Search and select from 450+ verified skills...",
  disabled = false,
}: SkillComboboxProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [validationWarning, setValidationWarning] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Search filtered results excluding already selected skills
  const results = searchSkillsCatalog(query, 30).filter(
    (skill) => !selectedSkills.some((s) => s.toLowerCase() === skill.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setValidationWarning(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (skill: string) => {
    onSelectSkill(skill);
    setQuery("");
    setIsOpen(false);
    setActiveIndex(0);
    setValidationWarning(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setIsOpen(true);
        e.preventDefault();
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1 < results.length ? prev + 1 : 0));
      // Scroll into view
      if (listRef.current) {
        const item = listRef.current.children[activeIndex + 1] as HTMLElement;
        item?.scrollIntoView({ block: "nearest" });
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 >= 0 ? prev - 1 : results.length - 1));
      if (listRef.current) {
        const item = listRef.current.children[activeIndex - 1] as HTMLElement;
        item?.scrollIntoView({ block: "nearest" });
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results.length > 0 && activeIndex < results.length) {
        handleSelect(results[activeIndex]);
      } else {
        setValidationWarning("Please select a valid skill from the verified dropdown catalog.");
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setValidationWarning(null);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full font-sans">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-corp-text-tertiary">
          <Search size={16} />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          disabled={disabled}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setActiveIndex(0);
            setValidationWarning(null);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2.5 text-xs font-mono font-medium rounded-lg border-2 border-corp-border bg-corp-bg-secondary text-corp-text placeholder:text-corp-text-tertiary focus:outline-none focus:border-[#2563eb] focus:shadow-[0_0_12px_rgba(37,99,235,0.35)] transition-all"
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => {
            if (!disabled) {
              setIsOpen(!isOpen);
              inputRef.current?.focus();
            }
          }}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-corp-text-tertiary hover:text-corp-text transition-colors"
        >
          <ChevronDown
            size={15}
            className={`transition-transform duration-200 ${isOpen ? "rotate-180 text-[#2563eb]" : ""}`}
          />
        </button>
      </div>

      {validationWarning && (
        <div className="mt-1.5 flex items-center gap-1.5 text-[11px] font-mono font-bold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/30">
          <AlertCircle size={13} className="flex-shrink-0" />
          <span>{validationWarning}</span>
        </div>
      )}

      {isOpen && (
        <div className="absolute z-50 w-full mt-1.5 bg-corp-surface border-2 border-blue-500 rounded-xl shadow-[0_12px_30px_rgba(0,0,0,0.35),0_0_15px_rgba(37,99,235,0.25)] overflow-hidden max-h-72 flex flex-col">
          <div className="px-3 py-2 bg-blue-600/10 border-b border-corp-border flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-wider text-[#2563eb]">
            <span className="flex items-center gap-1">
              <Sparkles size={11} /> Select from Verified Catalog ({results.length} matches)
            </span>
            <span className="text-corp-text-tertiary font-normal">Click or Arrow + Enter</span>
          </div>

          <ul ref={listRef} className="overflow-y-auto py-1 scrollbar-thin divide-y divide-corp-border/40">
            {results.length > 0 ? (
              results.map((skill, index) => {
                const isActive = index === activeIndex;
                return (
                  <li
                    key={skill}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => handleSelect(skill)}
                    className={`px-3.5 py-2.5 text-xs font-mono cursor-pointer flex items-center justify-between transition-colors ${
                      isActive
                        ? "bg-[#2563eb] text-white font-bold"
                        : "text-corp-text hover:bg-corp-bg-secondary"
                    }`}
                  >
                    <span>{skill}</span>
                    {isActive ? (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-white/20">
                        Select ↵
                      </span>
                    ) : (
                      <span className="text-[10px] text-corp-text-tertiary">Verified</span>
                    )}
                  </li>
                );
              })
            ) : (
              <li className="px-4 py-6 text-center text-xs font-mono text-corp-text-secondary space-y-1">
                <p className="font-bold">No catalog matches for &ldquo;{query}&rdquo;</p>
                <p className="text-[11px] text-corp-text-tertiary">
                  You can type to filter, but must select a skill from the verified 450+ catalog.
                </p>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
