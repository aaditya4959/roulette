import WebSocket from "ws";

export class User {
    id: number;
    name: string;
    balance: number;
    ws: WebSocket;
    private bets: Map<number, number>; // Map<number, amount>

    constructor(id: number, name: string, ws: WebSocket) {
        this.id = id;
        this.name = name;
        this.balance = 2500;
        this.ws = ws;
        this.bets = new Map<number, number>(); // Initialize the bets
    }

    bet(betAmount: number, target: number): void {
        if (this.balance < betAmount) {
            // Notify the user of insufficient balance
            this.ws.send("Insufficient balance for this bet.");
        } else {
            this.balance -= betAmount;

            // Add to existing bet or create a new bet
            const currentBet = this.bets.get(target) || 0;
            this.bets.set(target, currentBet + betAmount);
        }
    }

    clearBet(target: number): void {
        // Clear the bet for a certain target
        this.bets.delete(target);
    }

    getAllBets(): Map<number, number> {
        return this.bets;
    }
}
