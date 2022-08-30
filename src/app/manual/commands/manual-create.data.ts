export class ManualCreateData {
  id: string;
  title: string;
  enTitle: string;
  type: 'back' | 'shoulder' | 'chest' | 'arm' | 'lef' | 'abs';
  difficulty: number;
  description: string;
  precautions: string;
}
