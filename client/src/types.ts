export type Contact = {
    id: string;
    name: string;
    online: boolean;
    desc?: string;
    avatar?: string;
}

export type Message = {
    id: number;
    fromUserId: string;
    toUserId: string;
    text: string;
    time: string;
  }

  