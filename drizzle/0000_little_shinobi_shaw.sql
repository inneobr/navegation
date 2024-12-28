CREATE TABLE `categoria` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`color` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `categoria_title_unique` ON `categoria` (`title`);--> statement-breakpoint
CREATE TABLE `cronometro` (
	`id` integer PRIMARY KEY NOT NULL,
	`days` integer,
	`hours` integer,
	`minutes` integer,
	`seconds` integer,
	`description` text,
	`tarefa_id` integer
);
--> statement-breakpoint
CREATE TABLE `imagens` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`base64` text NOT NULL,
	`tarefa_id` integer NOT NULL,
	FOREIGN KEY (`tarefa_id`) REFERENCES `tarefa`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `setting` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`color` text NOT NULL,
	`checked` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tarefa` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`prioridade` text,
	`data` text,
	`hora` text,
	`categoria_id` integer,
	FOREIGN KEY (`categoria_id`) REFERENCES `categoria`(`id`) ON UPDATE no action ON DELETE cascade
);
