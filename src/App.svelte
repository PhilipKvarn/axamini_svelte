

<main>
  <Header></Header>
  <Table.Machines></Table.Machines>
</main>


<script>
import "./app.css";
import Header from "$lib/components/header.svelte";
import * as Table from "$lib/components/tables";
import svelteLogo from './assets/svelte.svg'
import viteLogo from '/vite.svg'
import Counter from './lib/Counter.svelte'</script>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>