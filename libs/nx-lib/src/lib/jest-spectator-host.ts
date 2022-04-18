import { SpectatorHost } from '@ngneat/spectator/jest';

export class JestSpectatorHost<T> {
    spectator?: SpectatorHost<T>;
    component?: T;

    constructor() {}

    setupTestHost(spectator: SpectatorHost<T>) {
        this.spectator = spectator;
        this.component = this.spectator.component;
        this.detectAllChanges();
    }

    detectAllChanges() {
        this.spectator?.detectChanges();
        this.spectator?.detectComponentChanges();
    }
}
