type GymDeletedEventPayload = {
  gymId: string;
};

export class GymDeletedEvent {
  public readonly gymId: string;

  constructor(payload: GymDeletedEventPayload) {
    Object.assign(this, payload);
  }
}
