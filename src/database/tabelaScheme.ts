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
    categoria:    integer('categoria').references(() => categoria.id, {onDelete: 'cascade'})
});

export const imagen = sqliteTable("imagens", {
    id:       integer("id").primaryKey(), 
    title:    text("title").notNull(),
    base64:   text("base64").notNull(),
    tarefa:   integer('tarefa').references(() => tarefa.id, {onDelete: 'cascade'}).notNull(),
}); 

export const cronometro = sqliteTable("cronometro", {
    id:       integer("id").primaryKey(), 
    days:     integer("days"),
    hours:    integer("hours"),
    minutes:  integer("minutes"),
    seconds:  integer("seconds"),
    tarefa:   integer('tarefa').references(() => tarefa.id, {onDelete: 'cascade'}),
}); 