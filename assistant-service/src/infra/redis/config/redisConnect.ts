import { createClient, RedisClientOptions, RedisClientType } from "redis";

export class RedisConnection {
    public static instance: RedisConnection;
    private client: RedisClientType;

    public static getInstance(){
        if(!this.instance){
            this.instance = new RedisConnection();
        }
        return this.instance;
    }

    public async connect(config: RedisClientOptions){
        if(!this.client) this.client = createClient(config) as RedisClientType;
        return this.client.connect();
    }

    public getClient(){
        if(!this.client){
            throw new Error("Client not found");
        }
        return this.client;
    }
    
}