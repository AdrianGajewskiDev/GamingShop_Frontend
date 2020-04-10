export class Message {
  ID: number;
  SenderID: string;
  SenderEmail: string;
  RecipientID: string;
  RecipientEmail: string;
  Content: string;
  Subject: string;
  Read: boolean;
  Sent: Date;
}
