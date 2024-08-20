export class KanbanItem {
    id?: string; // Optional, da es von Firebase generiert wird
    coach!: string;
    description!: string;
    position: string = 'todo'; // 'todo', 'waiting', 'treatment', 'done'
    martialArt!: string;

    constructor(obj?: any) {
        this.id = obj && obj.id ? obj.id : undefined;
        this.coach = obj && obj.coach ? obj.coach : '';
        this.description = obj && obj.description ? obj.description : '';
        this.position = obj && obj.position ? obj.position : 'todo';
        this.martialArt = obj && obj.martialArt ? obj.martialArt : "";
    }

    // Methode zur Umwandlung des Objekts in JSON für Firebase
    public toJSON() {
        return {
            coach: this.coach,
            description: this.description,
            position: this.position,
            martialArt: this.martialArt
        };
    }
}
