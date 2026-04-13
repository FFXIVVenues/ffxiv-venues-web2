import { useState, useRef, useEffect, type MouseEvent } from "react";
import {DefaultPageLayout} from "@/layouts/defaultPageLayout.tsx";
import {FilterMenu} from "@/components/filterMenu/filterMenu.tsx";
import worldMap from "./worldmap-dt2.jpg";

export const VenueDirectoryPage = () => {
    const [position, setPosition] = useState({ x: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0 });
    const imgRef = useRef<HTMLImageElement>(null);

    const handleMouseDown = (e: MouseEvent<HTMLImageElement>) => {
        e.preventDefault();
        setIsDragging(true);
        setDragStart({
            x: e.clientX - position.x
        });
    };

    useEffect(() => {
        const handleMouseMove = (e: globalThis.MouseEvent) => {
            if (!isDragging || !imgRef.current || !imgRef.current.parentElement) return;

            const containerWidth = imgRef.current.parentElement.clientWidth;
            const imgWidth = imgRef.current.clientWidth;

            let newX = e.clientX - dragStart.x;
            const minX = Math.min(0, containerWidth - imgWidth);
            const maxX = 0;

            newX = Math.max(minX, Math.min(maxX, newX));

            setPosition({
                x: newX
            });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, dragStart]);

    return(
        <DefaultPageLayout>
            <DefaultPageLayout.Panel>
                <FilterMenu onFilter={()=>alert("Nothing yet")} />
            </DefaultPageLayout.Panel>
            <DefaultPageLayout.Page>

              <div className="overflow-hidden absolute w-full h-full top-0 left-0 right-0 bottom-0">
                <img
                  ref={imgRef}
                  draggable={false}
                  className="absolute cursor-move select-none h-full w-auto max-w-none"
                  style={{
                      left: `${position.x}px`,
                      top: 0
                  }}
                  onMouseDown={handleMouseDown}
                  src={worldMap} alt="World Map"/>

              </div>

            </DefaultPageLayout.Page>
        </DefaultPageLayout>
    );
}
