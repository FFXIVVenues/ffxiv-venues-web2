class NotesService {

    private _notesCache: Record<string, string> | null;
    private _observers: (() => void)[];

    constructor() {
        this._notesCache = null;
        this._observers = [];
    }

    getNotes(): Record<string, string> {
        if (!this._notesCache) {
            const data = localStorage.getItem("aether-venues-notes");
            this._notesCache = data ? JSON.parse(data) : {};
        }
        return this._notesCache!;
    }

    getNote(id: string): string {
        return this.getNotes()[id] ?? "";
    }

    setNote(id: string, text: string) {
        const notes = this.getNotes();
        notes[id] = text;
        this._setNotes(notes);
    }

    hasNote(id: string): boolean {
        return !!this.getNotes()[id];
    }

    deleteNote(id: string): void {
        const notes = this.getNotes();
        delete notes[id];
        this._setNotes(notes);
    }

    observe(observer: () => void) {
        this._observers.push(observer);
        return () => { this._observers = this._observers.filter(o => o !== observer); }
    }

    private _setNotes(notes: Record<string, string>) {
        this._notesCache = notes;
        localStorage.setItem("aether-venues-notes", JSON.stringify(notes));
        this._observers.forEach(o => o());
    }
}

const notesService = new NotesService();

export { notesService }