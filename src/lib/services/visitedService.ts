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
        this.removeVisited(id);
        const visited = this.getVisited();
        visited.push(id);
        localStorage.setItem("aether-venues-visited", JSON.stringify(visited));
        return visited;
    }

    removeVisited(id: string): string[] {
        const visited = this.getVisited().filter(i => i !== id);
        this._visitedCache = visited;
        localStorage.setItem("aether-venues-visited", JSON.stringify(visited));
        return visited;
    }
}

const visitedService = new VisitedService();

export { visitedService };