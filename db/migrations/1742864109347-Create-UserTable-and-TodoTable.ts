/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTableAndTodoTable1742864109347 implements MigrationInterface {
    name = 'CreateUserTableAndTodoTable1742864109347'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."google_users_role_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`CREATE TABLE "google_users" ("providerId" character varying NOT NULL, "provider" character varying NOT NULL, "role" "public"."google_users_role_enum" NOT NULL DEFAULT 'user', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying, "firstName" character varying, "lastName" character varying, "picture" character varying, CONSTRAINT "PK_255f66c5e5b452e9f8d1c6620b1" PRIMARY KEY ("providerId"))`);
        await queryRunner.query(`CREATE TABLE "todos" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" text, "completed" boolean NOT NULL DEFAULT false, "userProviderId" character varying, CONSTRAINT "PK_ca8cafd59ca6faaf67995344225" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "todos" ADD CONSTRAINT "FK_25f60947fda2184b2b714fb2559" FOREIGN KEY ("userProviderId") REFERENCES "google_users"("providerId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todos" DROP CONSTRAINT "FK_25f60947fda2184b2b714fb2559"`);
        await queryRunner.query(`DROP TABLE "todos"`);
        await queryRunner.query(`DROP TABLE "google_users"`);
        await queryRunner.query(`DROP TYPE "public"."google_users_role_enum"`);
    }

}
