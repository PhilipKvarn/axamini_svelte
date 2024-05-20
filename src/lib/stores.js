import { writable } from "svelte/store";

export const account = writable({});

export const machines = writable([])
export const tasks = writable([])
export const users = writable([])