import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const categoria = sqliteTable("categoria", {
    id:     integer("id").primaryKey(),
    title:  text("title").unique().notNull(),
    color:  text("color").notNull(),
}); 

export const tarefa = sqliteTable("tarefa", {
    id:           integer("id").primaryKey(),
    title:        text("title").notNull(),
    description:  text("description"),
    prioridade:   text("prioridade"),
    data:         text("data"),
    hora:         text("hora"),
    categoria_id: integer('categoria_id').references(() => categoria.id, {onDelete: 'cascade'})
});

export const imagen = sqliteTable("imagens", {
    id:        integer("id").primaryKey(), 
    title:     text("title").notNull(),
    base64:    text("base64").notNull(),
    tarefa_id: integer('tarefa_id').references(() => tarefa.id, {onDelete: 'cascade'}).notNull(),
}); 

export const cronometro = sqliteTable("cronometro", {
    id:          integer("id").primaryKey(), 
    days:        integer("days"),
    hours:       integer("hours"),
    minutes:     integer("minutes"),
    seconds:     integer("seconds"),
    description: text("description"),
    tarefa_id:   integer('tarefa_id'),
}); 

export const setting = sqliteTable("setting", {
    id:       integer("id").primaryKey(), 
    title:    text("title").notNull(),
    color:    text("color").notNull(),
    checked:  text("checked").notNull(),
}); 