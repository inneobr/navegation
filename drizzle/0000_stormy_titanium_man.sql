CREATE TABLE `categoria` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`color` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `categoria_title_unique` ON `categoria` (`title`);--> statement-breakpoint
CREATE TABLE `cronometro` (
	`id` integer PRIMARY KEY NOT NULL,
	`uuid` integer NOT NULL,
	`days` integer,
	`hours` integer,
	`minutes` integer,
	`seconds` integer,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `externos` (
	`id` integer PRIMARY KEY NOT NULL,
	`uuid` integer NOT NULL,
	`url` text NOT NULL,
	`title` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `image` (
	`id` integer PRIMARY KEY NOT NULL,
	`uuid` integer NOT NULL,
	`base64` text NOT NULL,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `tarefa` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`data` text,
	`hora` text,
	`uuid` integer,
	FOREIGN KEY (`uuid`) REFERENCES `categoria`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `todolist` (
	`id` integer PRIMARY KEY NOT NULL,
	`uuid` integer NOT NULL,
	`active` integer DEFAULT 0,
	`description` text NOT NULL
);
