import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

type Props = {};

const AdditionalInfoSkeleton = ({}: Props) => {
	return (
		<Card
			title="Additional Weather Info"
			childrenClassName="flex flex-col gap-6"
		>
			{Array.from({ length: 6 }).map((_, index) => (
				<div key={index} className="flex justify-between">
					<div className="flex gap-10">
						<Skeleton className="w-20 h-8" />
						<Skeleton className="size-8 rounded-full" />
					</div>
					<Skeleton className="size-8" />
				</div>
			))}
		</Card>
	);
};

export default AdditionalInfoSkeleton;
