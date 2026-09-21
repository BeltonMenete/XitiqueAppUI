import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "#/lib/utils";

interface DatePickerProps {
	selected?: Date;
	onSelect?: (date: Date | undefined) => void;
	modifiers?: {
		discrepancy?: Date[];
		matched?: Date[];
	};
	className?: string;
}

export function DatePicker({
	selected,
	onSelect,
	modifiers,
	className,
}: DatePickerProps) {
	return (
		<div className={cn("p-4", className)}>
			<DayPicker
				mode="single"
				selected={selected}
				onSelect={onSelect}
				modifiers={modifiers}
				modifiersStyles={{
					discrepancy: {
						backgroundColor: "#fef3c7",
						borderRadius: "50%",
					},
					matched: {
						backgroundColor: "#d1fae5",
						borderRadius: "50%",
					},
				}}
				classNames={{
					root: "w-full",
					months:
						"flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
					month: "space-y-4",
					caption: "flex justify-center pt-1 relative items-center",
					caption_label: "text-sm font-semibold text-slate-900",
					nav: "space-x-1 flex items-center",
					nav_button: cn(
						"h-7 w-7 inline-flex items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:pointer-events-none",
					),
					nav_button_previous: "absolute left-1",
					nav_button_next: "absolute right-1",
					table: "w-full border-collapse space-y-1",
					head_row: "flex",
					head_cell: "text-slate-500 rounded-md w-9 font-normal text-[0.8rem]",
					row: "flex w-full mt-2",
					cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-slate-100/50 [&:has([aria-selected])]:bg-slate-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
					day: cn(
						"h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-slate-100 rounded-md transition-colors cursor-pointer",
					),
					day_range_end: "day-range-end",
					day_selected:
						"bg-emerald-500 text-white hover:bg-emerald-600 focus:bg-emerald-600",
					day_today: "bg-slate-100 text-slate-900 font-semibold",
					day_outside: "text-slate-400 opacity-50",
					day_disabled: "text-slate-400 opacity-50",
					day_range_middle:
						"aria-selected:bg-slate-100 aria-selected:text-slate-900",
					day_hidden: "invisible",
				}}
				components={{
					IconLeft: ({ ...props }) => (
						<ChevronLeft className="h-4 w-4" {...props} />
					),
					IconRight: ({ ...props }) => (
						<ChevronRight className="h-4 w-4" {...props} />
					),
				}}
			/>
		</div>
	);
}
