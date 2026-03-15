
import { Menu } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import LightDarkToggle from "./LightDarkToggle";
type Props = {
    setIsSidePanelOpen: Dispatch<SetStateAction<boolean>>
};

const MobileHeader = ({setIsSidePanelOpen}: Props) => {
	return (
		<div className="w-full h-16 p-4 bg-background sticky top-0 xs:hidden flex gap-8 justify-end z-1001">
			<LightDarkToggle />
			<button
				className=""
				onClick={() => setIsSidePanelOpen(true)}
			>
				<Menu />
			</button>
		</div>
	);
};

export default MobileHeader;
