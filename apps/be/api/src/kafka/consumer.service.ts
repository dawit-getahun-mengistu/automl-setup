import { Injectable } from "@nestjs/common";
import { Consumer, ConsumerRunConfig, ConsumerSubscribeTopic, Kafka } from "kafkajs";

@Injectable()
export class ConsumerService {
    private readonly kafka = new Kafka({
        brokers: ['kafka:9092'],
    })

    private readonly consumers: Consumer[] = [];
    
    async consume(topic: ConsumerSubscribeTopic, config: ConsumerRunConfig) {
        const consumer = this.kafka.consumer({ groupId: 'api-group' });

        await consumer.connect();
        await consumer.subscribe(topic );
        await consumer.run(config);
        this.consumers.push(consumer);
    }

    async onApplicationShutdown() {
        for (const consumer of this.consumers) {
            await consumer.disconnect();
        }
    }
}