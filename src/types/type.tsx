export type Message = {
  id: string;
  content: string;
  sentAt: string;
  senderId: string;
};

export type MessageStream = {
  id: string;
  clientName: string;
  clientImage: string;
  unreadCount: number;
  lastMessageAt: string;
  lastMessage: string;
  locationId: string;
  messages: Message[];
};

export type User = {
  id: string;
  username: string;
  role: string;
  name: string;
  avatar: string;
};
