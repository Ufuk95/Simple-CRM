export class KanbanItem {
    id!: string;
    name!: string;
    description!: string;
    position: string = 'todo'; // 'todo', 'waiting', 'treatment', 'done'

    constructor(obj?: any) {
        this.id = obj && obj.id ? obj.id : '';
        this.name = obj && obj.name ? obj.name : '';
        this.description = obj && obj.description ? obj.description : '';
        this.position = obj && obj.position ? obj.position : 'todo';
    }

    // Methode zur Umwandlung des Objekts in JSON für Firebase
    public toJson() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            position: this.position,
        };
    }
}  