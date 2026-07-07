import { twMerge } from "tailwind-merge";

interface Column<T> {
  key: keyof T | string;
  label: string;
  /** Custom render function */
  render?: (value: unknown, row: T) => React.ReactNode;
  /** Tailwind width class e.g. "w-32" */
  width?: string;
  /** Text alignment */
  align?: "left" | "center" | "right";
  /** Hide on small screens */
  hideOnMobile?: boolean;
}

interface TableProps<T extends Record<string, unknown>> {
  columns: Column<T>[];
  data: T[];
  /** Key field for React list keys */
  rowKey: keyof T;
  /** Called when a row is clicked */
  onRowClick?: (row: T) => void;
  /** Caption for screen readers */
  caption: string;
  className?: string;
  /** Empty state node — shown when data.length === 0 */
  emptyState?: React.ReactNode;
}

const alignMap = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

/**
 * Shared responsive Table component.
 * Horizontally scrolls on small screens. WCAG-compliant with caption and scope.
 */
export default function Table<T extends Record<string, unknown>>({
  columns,
  data,
  rowKey,
  onRowClick,
  caption,
  className,
  emptyState,
}: TableProps<T>) {
  if (data.length === 0 && emptyState) {
    return <>{emptyState}</>;
  }

  return (
    <div className={twMerge("w-full overflow-x-auto rounded-2xl border border-white/[0.08] bg-white/[0.02]", className)}>
      <table className="w-full min-w-[600px] border-collapse text-sm">
        <caption className="sr-only">{caption}</caption>

        {/* Head */}
        <thead>
          <tr className="border-b border-white/[0.08]">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                scope="col"
                className={twMerge(
                  "px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500",
                  alignMap[col.align ?? "left"],
                  col.width,
                  col.hideOnMobile ? "hidden sm:table-cell" : ""
                )}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {data.map((row) => (
            <tr
              key={String(row[rowKey])}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              tabIndex={onRowClick ? 0 : undefined}
              role={onRowClick ? "button" : undefined}
              onKeyDown={
                onRowClick
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onRowClick(row);
                      }
                    }
                  : undefined
              }
              className={twMerge(
                "border-b border-white/[0.05] transition-colors last:border-0",
                onRowClick &&
                  "cursor-pointer hover:bg-white/[0.04] focus-visible:bg-white/[0.04] focus-visible:outline-none"
              )}
            >
              {columns.map((col) => {
                const value = row[col.key as keyof T] as unknown;
                return (
                  <td
                    key={String(col.key)}
                    className={twMerge(
                      "px-4 py-4 text-slate-300",
                      alignMap[col.align ?? "left"],
                      col.hideOnMobile ? "hidden sm:table-cell" : ""
                    )}
                  >
                    {col.render ? col.render(value, row) : String(value ?? "—")}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
