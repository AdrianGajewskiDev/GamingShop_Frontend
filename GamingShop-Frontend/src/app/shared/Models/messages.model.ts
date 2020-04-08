import { Message } from "@angular/compiler/src/i18n/i18n_ast";

export interface Messages {
  MessagesSentByUser: Message[];
  MessagesSentToUser: Message[];
  NewMessages: Message[];
  NewMessageAvailable: number;
}
