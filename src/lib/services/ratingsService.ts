type Rating = {
    id: string;
    rating: number;
}

class RatingsService {

    private _ratingCache: Rating[] | null;
    private _observers: (() => void)[];

    constructor() {
        this._ratingCache = null;
        this._observers = [];
    }

    getRatings(): Rating[] {
        if (!this._ratingCache) {
            const data = localStorage.getItem("aether-venues-ratings");
            this._ratingCache = data ? JSON.parse(data) : [];
        }
        return this._ratingCache!;
    }

    getRating(id:string) {
        return this.getRatings().find(r => r.id === id)?.rating ?? 0;
    }

    setRating(id:string, rating: number) {
        const ratings = this.getRatings().filter(r => r.id !== id);
        ratings.push({id, rating});
        this._setRatings(ratings);
        return ratings;
    }

    removeRating(id:string) {
        const ratings = this.getRatings().filter(r => r.id !== id);
        this._setRatings(ratings);
        return ratings;
    }

    observe(observer: () => void) {
        this._observers.push(observer);
        return () => this._observers = this._observers.filter(o => o !== observer);
    }

    private _setRatings(ratings: Rating[]) {
        this._ratingCache = ratings;
        localStorage.setItem("aether-venues-ratings", JSON.stringify(ratings));
        this._observers.forEach(o => o());
    }

}

const ratingsService = new RatingsService();

export { ratingsService }