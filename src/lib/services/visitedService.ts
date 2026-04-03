import {toast} from "sonner";

class VisitedService {
    private _visitedCache: string[] | null;

    constructor() {
        this._visitedCache = null;
    }

    getVisited(): string[] {
        if (!this._visitedCache) {
            const data = localStorage.getItem("aether-venues-visited");
            this._visitedCache = data ? JSON.parse(data) : [];
        }
        return this._visitedCache!;
    }

    isVisited(id: string): boolean {
        return this.getVisited().indexOf(id) !== -1;
    }

    setVisited(id: string): string[] {
        const visited = this.getVisited();
        if (visited.indexOf(id) !== -1)
            return visited;
        visited.push(id);
        this._setVisited(visited);

        toast.success("Venue marked as visited", {
            description: "You can filter to venues you have or haven't visited later via the sidebar.",
        })

        return visited;
    }

    removeVisited(id: string): string[] {
        const visited = this.getVisited().filter(i => i !== id);
        this._setVisited(visited);

        toast.success("Venue unmarked as visited", {
            description: "You can filter to venues you have or haven't visited later via the sidebar.",
        })

        return visited;
    }

    private _setVisited(visited: string[]) {
        this._visitedCache = visited;
        localStorage.setItem("aether-venues-visited", JSON.stringify(visited));
    }
}

const visitedService = new VisitedService();

export { visitedService };