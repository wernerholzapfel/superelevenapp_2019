export interface Formation {
    index: number;
    position: string;
    class: string[];
    disable: boolean;
    hide: boolean;
    players: {
        index: number, name: string, selected: boolean, initialClass: string[],
        class: string[], hide: boolean
    }[];
}
