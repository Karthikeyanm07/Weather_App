import SidePanelCardSkeleton from "./SidePanelCardSkeleton";
import { Skeleton } from "../ui/skeleton";

const SidePanelSkeleton = () => {
	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-2xl font-semibold">Air Pollution</h1>
			<Skeleton className="size-12" />
			<div className="flex items-center gap-2">
				<h1 className="text-2xl font-semibold">AQI</h1>
			</div>
			{Array.from({ length: 7 }).map((_, index) => (
				<SidePanelCardSkeleton key={index} />
			))}
		</div>
	);
};

export default SidePanelSkeleton;
