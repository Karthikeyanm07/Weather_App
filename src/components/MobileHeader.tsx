
import { CloudSun, Menu } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import LightDarkToggle from "./LightDarkToggle";
type Props = {
    setIsSidePanelOpen: Dispatch<SetStateAction<boolean>>
};

const MobileHeader = ({setIsSidePanelOpen}: Props) => {
	return (
		<div className="w-full h-16 px-4 py-3 bg-background sticky top-0 xs:hidden flex items-center z-1001">
			<div className="flex items-center gap-2">
				<CloudSun className="size-7 text-yellow-400" />
				<span className="text-xl font-bold tracking-tight">Nimbus</span>
			</div>
			<div className="flex items-center gap-6 ml-auto">
				<LightDarkToggle />
				<button
					onClick={() => setIsSidePanelOpen(true)}
				>
					<Menu className="size-6" />
				</button>
			</div>
		</div>
	);
};

export default MobileHeader;
