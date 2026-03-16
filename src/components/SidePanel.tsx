import { getAirPollution } from "@/api";
import type { Coords } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useEffect, type Dispatch, type SetStateAction } from "react";
import Card from "./cards/Card";
import { Slider } from "@/components/ui/slider";
import clsx from "clsx";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "./ui/popover";
import { ChevronLeft, Info } from "lucide-react";
import React, { useState } from "react";
import SidePanelSkeleton from "./skeletons/SidePanelSkeleton";
type Props = {
	coords: Coords;
	isSidePanelOpen: boolean;
	setIsSidePanelOpen: Dispatch<SetStateAction<boolean>>;
};
const SidePanel = (props: Props) => {
	const { isSidePanelOpen, setIsSidePanelOpen } = props;

	useEffect(() => {
		if (isSidePanelOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isSidePanelOpen]);

	return (
		<>
			{/* Backdrop */}
			<div
				className={clsx(
					"fixed inset-0 bg-black/50 z-1000 lg:hidden transition-opacity duration-300",
					isSidePanelOpen
						? "opacity-100 pointer-events-auto"
						: "opacity-0 pointer-events-none",
				)}
				onClick={() => setIsSidePanelOpen(false)}
			/>
			{/* Panel */}
			<div
				className={clsx(
					"fixed top-0 right-0 h-screen shadow-md w-(--sidebar-width) z-1001 bg-sidebar transition-transform duration-300 lg:translate-x-0! flex flex-col overscroll-contain",
					isSidePanelOpen ? "translate-x-0" : "translate-x-full",
				)}
				onTouchStart={(e) => {
					const touch = e.touches[0];
					const startX = touch.clientX;
					const panel = e.currentTarget;
					
					const onTouchMove = (moveEvent: TouchEvent) => {
						const moveX = moveEvent.touches[0].clientX;
						if (moveX - startX > 50) { // Swipe right detected
							setIsSidePanelOpen(false);
							panel.removeEventListener("touchmove", onTouchMove as unknown as EventListener);
						}
					};
					
					panel.addEventListener("touchmove", onTouchMove as unknown as EventListener, { passive: true });
					panel.addEventListener("touchend", () => {
						panel.removeEventListener("touchmove", onTouchMove as unknown as EventListener);
					}, { once: true });
				}}
			>
				<div className="sticky top-0 bg-sidebar/80 backdrop-blur-md z-10 px-4 py-4 flex items-center lg:hidden">
					<button
						onClick={() => setIsSidePanelOpen(false)}
						className="p-1 hover:bg-accent rounded-full transition-colors"
					>
						<ChevronLeft className="size-8" />
					</button>
				</div>
				<div className="flex-1 overflow-y-auto px-4 py-4">
					<Suspense fallback={<SidePanelSkeleton />}>
						<AirPollution {...props} />
					</Suspense>
				</div>
			</div>
		</>
	);
};

export default SidePanel;

function AirPollution({ coords }: Props) {
	const { data } = useSuspenseQuery({
		queryKey: ["pollution", coords],
		queryFn: () => getAirPollution(coords),
	});
	//console.log(data);
	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-2xl font-semibold">Air Pollution</h1>
			<h1 className="text-5xl font-semibold">{data.list[0].main.aqi}</h1>
			<div className="flex items-center gap-2">
				<h1 className="text-2xl font-semibold">AQI</h1>
				<AutoClosePopover 
					content={
						<p>
							<strong>Air Quality Index:</strong> A measure of how polluted the air currently is.
						</p>
					}
				/>
			</div>
			{Object.entries(data.list[0].components).map(
				([airName, airValue]) => {
					const pollutant =
						airQualityRanges[
							airName.toUpperCase() as keyof typeof airQualityRanges
						];

					const maxPollutantValue = Math.max(
						pollutant["Very Poor"].min,
						airValue,
					);

					// Get CURRENT LEVEL
					const currentLevel = (() => {
						for (const [level, range] of Object.entries(
							pollutant,
						)) {
							if (
								airValue >= range.min &&
								(range.max === null || airValue <= range.max)
							) {
								return level;
							}
							return "Very Poor";
						}
					})();

					//Define Quality LEvel color
					const qualityColor = (() => {
						switch (currentLevel) {
							case "Good":
								return "bg-green-500";
							case "Fair":
								return "bg-yellow-500";
							case "Moderate":
								return "bg-orange-500";
							case "Poor":
								return "bg-red-500";
							case "Very Poor":
								return "bg-purple-500";
							default:
								return "bg-zinc-500";
						}
					})();
					return (
						<Card
							key={airName}
							className="hover:scale-105 transition-transform duration-300 from-sidebar-accent to-sidebar-accent/60 gap-0!"
							childrenClassName="flex flex-col gap-3"
						>
							<div className="flex justify-between">
								<div className="flex items-center gap-2">
									<span className="text-lg font-bold capitalize">
										{airName}
									</span>
									<AutoClosePopover 
										content={
											<p>
												<strong>{pollutantNameMapping[airName.toUpperCase() as Pollutant]}:</strong> Concentration level in the current area.
											</p>
										}
									/>
								</div>
								<span className="text-lg font-semibold">
									{airValue}
								</span>
							</div>
							<Slider
								disabled
								min={0}
								max={maxPollutantValue}
								value={[airValue]}
							/>
							<div className="flex justify-between text-xs">
								<p>0</p>
								<p>{maxPollutantValue}</p>
							</div>
							<div className="flex justify-between">
								{Object.keys(pollutant).map((quality) => (
									<span
										key={quality}
										className={clsx(
											"py-2 px-1 text-xs rounded-md font-medium",
											quality === currentLevel
												? qualityColor
												: "bg-muted text-muted-foreground",
										)}
									>
										{quality}
									</span>
								))}
							</div>
						</Card>
					);
				},
			)}
		</div>
	);
}

// This is below code for define Air quality number range definition like 0 - 100 good
type AirQualityLevel = "Good" | "Fair" | "Moderate" | "Poor" | "Very Poor";

interface Range {
	min: number;
	max: number | null;
}

type Pollutant = "SO2" | "NO2" | "PM10" | "PM2_5" | "O3" | "CO" | "NO" | "NH3";

type AirQualityRanges = Record<Pollutant, Record<AirQualityLevel, Range>>;

const airQualityRanges: AirQualityRanges = {
	SO2: {
		Good: { min: 0, max: 20 },
		Fair: { min: 20, max: 80 },
		Moderate: { min: 80, max: 250 },
		Poor: { min: 250, max: 350 },
		"Very Poor": { min: 350, max: null },
	},
	NO2: {
		Good: { min: 0, max: 40 },
		Fair: { min: 40, max: 70 },
		Moderate: { min: 70, max: 150 },
		Poor: { min: 150, max: 200 },
		"Very Poor": { min: 200, max: null },
	},
	PM10: {
		Good: { min: 0, max: 20 },
		Fair: { min: 20, max: 50 },
		Moderate: { min: 50, max: 100 },
		Poor: { min: 100, max: 200 },
		"Very Poor": { min: 200, max: null },
	},
	PM2_5: {
		Good: { min: 0, max: 10 },
		Fair: { min: 10, max: 25 },
		Moderate: { min: 25, max: 50 },
		Poor: { min: 50, max: 75 },
		"Very Poor": { min: 75, max: null },
	},
	O3: {
		Good: { min: 0, max: 60 },
		Fair: { min: 60, max: 100 },
		Moderate: { min: 100, max: 140 },
		Poor: { min: 140, max: 180 },
		"Very Poor": { min: 180, max: null },
	},
	CO: {
		Good: { min: 0, max: 4400 },
		Fair: { min: 4400, max: 9400 },
		Moderate: { min: 9400, max: 12400 },
		Poor: { min: 12400, max: 15400 },
		"Very Poor": { min: 15400, max: null },
	},
	NO: {
		Good: { min: 0, max: 20 },
		Fair: { min: 20, max: 40 },
		Moderate: { min: 40, max: 60 },
		Poor: { min: 60, max: 80 },
		"Very Poor": { min: 80, max: null },
	},
	NH3: {
		Good: { min: 0, max: 40 },
		Fair: { min: 40, max: 70 },
		Moderate: { min: 70, max: 150 },
		Poor: { min: 150, max: 200 },
		"Very Poor": { min: 200, max: null },
	},
};

const pollutantNameMapping: Record<Pollutant, string> = {
	SO2: "Sulfur dioxide",
	NO2: "Nitrogen dioxide",
	PM10: "Particulate matter 10",
	PM2_5: "Fine particles matter",
	O3: "Ozone",
	CO: "Carbon monoxide",
	NO: "Nitrogen monoxide",
	NH3: "Ammonia",
};

/**
 * A Popover wrapper that automatically closes after 5 seconds
 */
function AutoClosePopover({ content }: { content: React.ReactNode }) {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (isOpen) {
			const timer = setTimeout(() => setIsOpen(false), 3000);
			return () => clearTimeout(timer);
		}
	}, [isOpen]);

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<button className="focus:outline-hidden">
					<Info className="size-4 text-muted-foreground hover:text-foreground transition-colors" />
				</button>
			</PopoverTrigger>
			<PopoverContent className="z-2000 w-64 backdrop-blur-md bg-popover/90">
				{content}
			</PopoverContent>
		</Popover>
	);
}
