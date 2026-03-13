class FavouritesService {

    private _favouritesCache: string[] | null;
    private _observers: (() => void)[];

    constructor() {
        this._favouritesCache = null;
        this._observers = [];
    }

    getFavourites(): string[] {
        if (!this._favouritesCache) {
            const data = localStorage.getItem("aether-venues-favourites");
            this._favouritesCache = data ? JSON.parse(data) : [];
        }
        return this._favouritesCache!;
    }

    isFavourite(id:string) {
        return this.getFavourites().indexOf(id) !== -1;
    }

    setFavourite(id:string) {
        this.removeFavourite(id);
        const favourites = this.getFavourites();
        favourites.push(id);
        localStorage.setItem("aether-venues-favourites", JSON.stringify(favourites));
        this._observers.forEach(o => o());
        return favourites;
    }

    removeFavourite(id:string) {
        const favourites = this.getFavourites().filter(i => i !== id);
        this._favouritesCache = favourites;
        localStorage.setItem("aether-venues-favourites", JSON.stringify(favourites));
        this._observers.forEach(o => o());
        return favourites;
    }

    observe(observer: () => void) {
        this._observers.push(observer);
        return () => this._observers = this._observers.filter(o => o === observer);
    }

}

const favouritesService = new FavouritesService();

export { favouritesService }