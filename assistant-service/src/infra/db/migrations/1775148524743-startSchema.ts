import { MigrationInterface, QueryRunner } from "typeorm";

export class StartSchema1775148524743 implements MigrationInterface {
    name = 'StartSchema1775148524743'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permission" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "resource" character varying NOT NULL, "method" character varying NOT NULL, CONSTRAINT "UQ_RESOURCE_METHOD" UNIQUE ("resource", "method"), CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "role" character varying NOT NULL, "description" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "isDefault" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_367aad98203bd8afaed0d704093" UNIQUE ("role"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL, "origin" character varying NOT NULL, "close_reason" character varying, "secret" character varying, "refreshed_at" TIMESTAMP, "closed_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "is_admin" boolean NOT NULL DEFAULT false, "is_blocked" boolean NOT NULL DEFAULT false, "deleted_at" TIMESTAMP, "isDeleted" boolean NOT NULL DEFAULT false, "is_verified" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_EMAIL_DELETED_AT" UNIQUE ("email", "isDeleted"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "prompts" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "prompt" character varying NOT NULL, CONSTRAINT "UQ_96fcaf54574ec6ccf23491c27e6" UNIQUE ("name"), CONSTRAINT "PK_21f33798862975179e40b216a1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "account_id" character varying NOT NULL, "conversation_id" character varying NOT NULL, "role" character varying NOT NULL, "message_type" character varying NOT NULL, "content_type" character varying NOT NULL, "text" character varying, "content" character varying, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "agents_signeds" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "url" character varying NOT NULL, "headers" json, CONSTRAINT "PK_84e3a61b432ee88ee83dfc80fac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ai_agents" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "slug" character varying NOT NULL, "model" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "provider" character varying NOT NULL, "prompt" character varying NOT NULL, "credentialsId" integer, CONSTRAINT "UQ_5129af37f2db47cd1cfd94acc4b" UNIQUE ("name"), CONSTRAINT "UQ_a38515ef32820bc2cb7eacd4306" UNIQUE ("slug"), CONSTRAINT "PK_38dae00b19ff837456f29681e8c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "credentials" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "access_token" character varying, "refresh_token" character varying, "code" character varying, "account_id" character varying, CONSTRAINT "UQ_03fa0f30ef826a421f8b5be53e9" UNIQUE ("name"), CONSTRAINT "PK_1e38bc43be6697cdda548ad27a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role_permissions" ("roleId" integer NOT NULL, "permissionId" integer NOT NULL, CONSTRAINT "PK_d430a02aad006d8a70f3acd7d03" PRIMARY KEY ("roleId", "permissionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b4599f8b8f548d35850afa2d12" ON "role_permissions" ("roleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_06792d0c62ce6b0203c03643cd" ON "role_permissions" ("permissionId") `);
        await queryRunner.query(`CREATE TABLE "user_roles" ("userId" integer NOT NULL, "roleId" integer NOT NULL, CONSTRAINT "PK_88481b0c4ed9ada47e9fdd67475" PRIMARY KEY ("userId", "roleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_472b25323af01488f1f66a06b6" ON "user_roles" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_86033897c009fcca8b6505d6be" ON "user_roles" ("roleId") `);
        await queryRunner.query(`CREATE TABLE "ai_agents_signeds_agents_signeds" ("aiAgentsId" integer NOT NULL, "agentsSignedsId" integer NOT NULL, CONSTRAINT "PK_5ffdc1c088ebcb027e15a56b622" PRIMARY KEY ("aiAgentsId", "agentsSignedsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_78c0d54375279899102223baac" ON "ai_agents_signeds_agents_signeds" ("aiAgentsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f30cf63ec3d3f3a61fcf7d45f0" ON "ai_agents_signeds_agents_signeds" ("agentsSignedsId") `);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ai_agents" ADD CONSTRAINT "FK_2690ddda933cce553e3669f2393" FOREIGN KEY ("credentialsId") REFERENCES "credentials"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_b4599f8b8f548d35850afa2d12c" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_06792d0c62ce6b0203c03643cdd" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_472b25323af01488f1f66a06b67" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_86033897c009fcca8b6505d6be2" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ai_agents_signeds_agents_signeds" ADD CONSTRAINT "FK_78c0d54375279899102223baac9" FOREIGN KEY ("aiAgentsId") REFERENCES "ai_agents"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ai_agents_signeds_agents_signeds" ADD CONSTRAINT "FK_f30cf63ec3d3f3a61fcf7d45f03" FOREIGN KEY ("agentsSignedsId") REFERENCES "agents_signeds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ai_agents_signeds_agents_signeds" DROP CONSTRAINT "FK_f30cf63ec3d3f3a61fcf7d45f03"`);
        await queryRunner.query(`ALTER TABLE "ai_agents_signeds_agents_signeds" DROP CONSTRAINT "FK_78c0d54375279899102223baac9"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_86033897c009fcca8b6505d6be2"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_472b25323af01488f1f66a06b67"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_06792d0c62ce6b0203c03643cdd"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_b4599f8b8f548d35850afa2d12c"`);
        await queryRunner.query(`ALTER TABLE "ai_agents" DROP CONSTRAINT "FK_2690ddda933cce553e3669f2393"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f30cf63ec3d3f3a61fcf7d45f0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_78c0d54375279899102223baac"`);
        await queryRunner.query(`DROP TABLE "ai_agents_signeds_agents_signeds"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_86033897c009fcca8b6505d6be"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_472b25323af01488f1f66a06b6"`);
        await queryRunner.query(`DROP TABLE "user_roles"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_06792d0c62ce6b0203c03643cd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b4599f8b8f548d35850afa2d12"`);
        await queryRunner.query(`DROP TABLE "role_permissions"`);
        await queryRunner.query(`DROP TABLE "credentials"`);
        await queryRunner.query(`DROP TABLE "ai_agents"`);
        await queryRunner.query(`DROP TABLE "agents_signeds"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "prompts"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "permission"`);
    }

}
