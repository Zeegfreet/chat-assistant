import { DataSource, DataSourceOptions, EntityTarget, QueryRunner, Repository } from "typeorm";

export class DbConnection {
    public static instance: DbConnection;
    private client!: DataSource;
    private manager?: QueryRunner;
    constructor(){}

    public static getInstance(): DbConnection {
        if(!this.instance){
            this.instance = new DbConnection();
        }
        return this.instance;
    }

    public async connect(DataSourceOptions: DataSourceOptions): Promise<DataSource> {
        this.client = new DataSource(DataSourceOptions);
        return this.client.initialize();
    }

    public async createManager(): Promise<QueryRunner> {
        if (!this.client?.isInitialized) {
            throw new Error("Database not connected");
        }

        const queryRunner = this.client.createQueryRunner();
        await queryRunner.connect();

        return queryRunner;
    }

    public setManager(queryRunner?: QueryRunner) {
        this.manager = queryRunner;
    }

    public getCollection<T>(
        entity: EntityTarget<T>,
    ): Repository<T> {
        if (!this.client?.isInitialized) {
            throw new Error("Database not connected");
        }

        if (this.manager) {
            return this.manager.manager.getRepository(entity);
        }

        return this.client.getRepository(entity);
    }
    
    public async disconnect(): Promise<void> {
        if(this.client && this.client.isInitialized){
            await this.client.destroy();
        }
    }
}