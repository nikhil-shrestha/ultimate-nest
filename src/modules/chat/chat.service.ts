import { Injectable } from "@nestjs/common";

import { CreateChatDto } from "./dto/create-chat.dto";

@Injectable()
export class ChatService {
	messages = [{ message: "hello", username: "rubiin" }];
	clientToUser: Map<string, string> = new Map();

	identify(name: string, clientId: string) {
		this.clientToUser[clientId] = name;

		return Object.values(this.clientToUser);
	}

	create(createChatDto: CreateChatDto, clientId: string) {
		const message = {
			username: this.clientToUser[clientId],
			message: createChatDto.message,
		};

		this.messages.push(message);

		return message;
	}

	getClientName(id: string) {
		return this.clientToUser[id];
	}

	findAll() {
		return this.messages;
	}
}
