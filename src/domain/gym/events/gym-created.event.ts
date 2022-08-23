type GymCreatedEventPayload = {
  gymId: string;
  ownerId: string;
};

export class GymCreatedEvent {
  public readonly gymId: string;
  public readonly ownerId: string;

  constructor(payload: GymCreatedEventPayload) {
    Object.assign(this, payload);
  }
}
