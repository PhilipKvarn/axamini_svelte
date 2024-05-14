
<script>
    import * as Table from "$lib/components/ui/table";
    import { machines } from "$lib/stores";
    import { onMount } from 'svelte';

    onMount(async () => {
    try {
      const response = await fetch('http://localhost:1738/machines');
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      machines.set(data);
    } catch (error) {
      console.error('Fetch error: ', error);
    }
  });

</script>

<div>
    <Table.Root>
        <Table.Caption>A list of your recent invoices.</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.Head class="w-[100px]">id</Table.Head>
            <Table.Head>Name</Table.Head>
            <Table.Head>Ansvarig</Table.Head>
            <Table.Head class="text-right">Status</Table.Head>
            <Table.Head>Urgency</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
            {#each $machines as machine }
            <Table.Row>
                <Table.Cell class="font-medium">{machine.id}</Table.Cell>
                <Table.Cell><a href="">{machine.name}</a></Table.Cell>
                <Table.Cell>{machine.mechanic_id}</Table.Cell>
                <Table.Cell class="text-right">{machine.status}</Table.Cell>
                <Table.Cell>{machine.urgency}</Table.Cell>
              </Table.Row>
            {/each}
        </Table.Body>
    </Table.Root>
</div>


