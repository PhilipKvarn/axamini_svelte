import { writable } from "svelte/store";

export const account = writable({});

export const machines = writable([])
export const tasks = writable([])
export const suggestions = writable([])
export const users = writable([])