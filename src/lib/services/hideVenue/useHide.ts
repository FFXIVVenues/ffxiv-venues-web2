import { useEffect, useState } from "react";
import { hideService} from "@/lib/services/hideVenue/hideService.ts";

export const useHide = (id: string): [isHidden: boolean, toggleHidden: () => void] => {
    const [isHidden, setIsHidden] = useState(hideService.isHidden(id));

    useEffect(() => hideService.observe(() => {
        setIsHidden(hideService.isHidden(id));
    }), [id]);

    const toggleHidden = () => {
        hideService.toggleHidden(id);
    }

    return [isHidden, toggleHidden];
}