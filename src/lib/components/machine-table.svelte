
<script>
    import * as Table from "$lib/components/ui/table";
    import { machines } from "$lib/stores";
    import { onMount } from 'svelte';
    import * as Dialog from "$lib/components/ui/dialog/index.js";

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

  function showMachineCard(id){
    const machine = $machines.find(machine => machine.id === id);
    if (machine) {
      machines.set(data)
    } else {
      console.error(`Machine with ID ${id} not found.`);
    }
  }

</script>

<div>
    <Table.Root>
        <Table.Caption>Lista av alla maskiner.</Table.Caption>
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
              <Table.Row on:click={() => showMachineCard(machine.id)}>
                <Table.Cell class="font-medium">{machine.id}</Table.Cell>
                <Table.Cell><a href="">{machine.name}</a></Table.Cell>
                <Table.Cell>{machine.mechanic_id}</Table.Cell>
                <Table.Cell class="text-right">{machine.status}</Table.Cell>
                <Table.Cell>{machine.urgency}</Table.Cell>
              </Table.Row>
            {/each}
        </Table.Body>
    </Table.Root>

    <Dialog.Root>
      <Dialog.Trigger>Edit Profile</Dialog.Trigger>
      <Dialog.Content class="sm:max-w-[425px]">
        <Dialog.Header>
          <Dialog.Title>Edit Machine</Dialog.Title>
          <Dialog.Description>
            Make changes to your profile here. Click save when you're done.
          </Dialog.Description>
        </Dialog.Header>
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <!-- <Label for="name" class="text-right">Name</Label>
            <Input id="name" value="Pedro Duarte" class="col-span-3" /> -->
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <!-- <Label for="username" class="text-right">Username</Label>
            <Input id="username" value="@peduarte" class="col-span-3" /> -->
          </div>
        </div>
        <Dialog.Footer>
          <!-- <Button type="submit">Save changes</Button> -->
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>

</div>


