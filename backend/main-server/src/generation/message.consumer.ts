import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('message-queue')
export class MessageConsumer {

    @Process('message-job')
    messagejob(job: Job<unknown>) {
        console.log(job.data);
    };
};