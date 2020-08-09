import Knex, { SchemaBuilder } from "knex";

export async function up(knex: Knex): Promise<SchemaBuilder> {
  return knex.schema.createTable("class_schedule", (table): void => {
    table.increments("id").primary();

    table.integer("week_day").notNullable();
    table.integer("from").notNullable();
    table.integer("to").notNullable();

    table
      .integer("class_id")
      .notNullable()
      .references("id")
      .inTable("classes")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<SchemaBuilder> {
  return knex.schema.dropTable("class_schedule");
}