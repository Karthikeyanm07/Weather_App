import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

type Props = {};

const HourlySkeleton = ({}: Props) => {
	return (
		<Card
			childrenClassName="flex gap-6 overflow-x-scroll"
			title="Hourly Forecast (48 Hours)"
		>
			{Array.from({ length: 48 }).map((_, index) => {
				return (
					<div key={index} className="flex flex-col items-center p-2">
						<Skeleton className="w-15 h-6" />
						<Skeleton className="size-8" />
						<Skeleton className="w-8 h-6" />
					</div>
				);
			})}
		</Card>
	);
};

export default HourlySkeleton;
