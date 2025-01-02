import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const categoria = sqliteTable("categoria", {
    id:     integer("id").primaryKey(),
    title:  text("title").unique().notNull(),
    color:  text("color").notNull(),
}); 

export const tarefa = sqliteTable("tarefa", {
    id:           integer("id").primaryKey(),
    uuid:         integer('uuid'),
    title:        text("title").notNull(),
    description:  text("description"),
    data:         text("data"),
    hora:         text("hora"),
});

export const externos = sqliteTable("externos", {
    id:    integer("id").primaryKey(), 
    uuid:  integer('uuid').notNull(),
    url:   text("url").notNull(),
    title: text("title").notNull(),
}); 

export const todolist = sqliteTable("todolist", {
    id:           integer("id").primaryKey(), 
    uuid:         integer('uuid').notNull(),
    active:       integer("active").default(0),
    description:  text("description").notNull(),
});

export const image = sqliteTable("image", {
    id:          integer("id").primaryKey(), 
    uuid:        integer('uuid').notNull(),
    base64:      text("base64").notNull(),
    description: text("description"),
}); 

export const cronometro = sqliteTable("cronometro", {
    id:          integer("id").primaryKey(),     
    uuid:         integer('uuid').notNull(),
    days:        integer("days"),
    hours:       integer("hours"),
    minutes:     integer("minutes"),
    seconds:     integer("seconds"),
    description: text("description"),
}); 