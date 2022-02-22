import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class GenerationService {
    constructor(@InjectQueue('message-queue') private queue: Queue) {};

    async sendMessage(message: string) {
        await this.queue.add('message-job', {
            text: message
        }, { delay: 5000 });
    };
}
