import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

function DailySkeleton() {
	return (
		<Card
			title="Daily Forecast"
			childrenClassName="flex flex-col gap-[19px] 2xl:justify-between"
		>
			{Array.from({ length: 7 }).map((_, index) => {
				return (
					<div key={index} className="flex justify-between">
						<Skeleton className="w-9 h-8" />
						<Skeleton className="size-10 rounded-full" />
						<Skeleton className="size-8" />
						<Skeleton className="size-8" />
						<Skeleton className="size-8" />
					</div>
				);
			})}
		</Card>
	);
}

export default DailySkeleton;
