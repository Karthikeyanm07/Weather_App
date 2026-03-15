import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

const AdditionalInfoSkeleton = () => {
	return (
		<Card
			title="Additional Weather Info"
			childrenClassName="grid grid-cols-1 md:grid-cols-2 gap-8"
		>
			{Array.from({ length: 5 }).map((_, index) => (
				<div key={index} className="flex justify-between">
					<div className="flex gap-10">
						<Skeleton className="w-36 h-6" />
						<Skeleton className="size-6 rounded-full" />
					</div>
					<Skeleton className="size-8" />
				</div>
			))}
		</Card>
	);
};

export default AdditionalInfoSkeleton;
