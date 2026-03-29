import {toast} from "sonner";

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
        const favourites = this.getFavourites();
        if (favourites.indexOf(id) !== -1)
            return favourites;
        favourites.push(id);
        this._setFavourites(favourites);


        toast.success("Venue favourited", {
            description: "It'll appear the top of the index for you.",
        })

        return favourites;
    }

    removeFavourite(id:string) {
        const favourites = this.getFavourites().filter(i => i !== id);
        this._setFavourites(favourites);

        toast.success("Venue unfavourited", {
            description: "It'll no longer appear in your favourites.",
        })

        return favourites;
    }

    observe(observer: () => void) {
        this._observers.push(observer);
        return () => this._observers = this._observers.filter(o => o !== observer);
    }

    private _setFavourites(favourites: string[])  {
        this._favouritesCache = favourites;
        localStorage.setItem("aether-venues-favourites", JSON.stringify(favourites));
        this._observers.forEach(o => o());
    }
}

const favouritesService = new FavouritesService();

export { favouritesService }