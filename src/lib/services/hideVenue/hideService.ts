class HideService {

    private _hiddenCache: Set<string> | null;
    private _observers: (() => void)[];

    constructor() {
        this._hiddenCache = null;
        this._observers = [];
    }

    getHiddenIds(): Set<string> {
        if (!this._hiddenCache) {
            const data = localStorage.getItem("aether-venues-hidden");
            this._hiddenCache = data ? new Set(JSON.parse(data)) : new Set();
        }

        return this._hiddenCache!;
    }

    isHidden(id: string): boolean {
        return this.getHiddenIds().has(id);
    }

    toggleHidden(id: string): void {
        const hidden = this.getHiddenIds();
        hidden.has(id) ? hidden.delete(id) : hidden.add(id);
        this._setHidden(hidden);
    }

    observe(observer: () => void){
        this._observers.push(observer);
        return () => {this._observers = this._observers.filter(o => o !== observer);}
    }

    private _setHidden(hidden: Set<string>) {
        this._hiddenCache = hidden;
        localStorage.setItem("aether-venues-hidden", JSON.stringify([...hidden]));
        this._observers.forEach(o => o());
    }
}

const hideService = new HideService();

export { hideService };