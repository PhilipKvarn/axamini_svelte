

<main>
  <Table.Root>
    <Table.Caption>A list of your recent invoices.</Table.Caption>
    <Table.Header>
      <Table.Row>
        <Table.Head class="w-[100px]">Invoice</Table.Head>
        <Table.Head>Status</Table.Head>
        <Table.Head>Method</Table.Head>
        <Table.Head class="text-right">Amount</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell class="font-medium">INV001</Table.Cell>
        <Table.Cell>Paid</Table.Cell>
        <Table.Cell>Credit Card</Table.Cell>
        <Table.Cell class="text-right">$250.00</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table.Root>
</main>


<script>
import "./app.css";
import * as Table from "$lib/components/ui/table";
import svelteLogo from './assets/svelte.svg'
import viteLogo from '/vite.svg'
import Counter from './lib/Counter.svelte'</script><style>
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