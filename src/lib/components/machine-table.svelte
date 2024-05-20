
<script>
    import * as Table from "$lib/components/ui/table";
    import { machines } from "$lib/stores";
    import {getLoggedIn} from "$lib/utils"
    import { onMount } from 'svelte';
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import MachineDropdown from './machine-dropdown.svelte';
    import MachineForm from "./machine-form.svelte";
    import { navigate } from 'svelte-routing';

    onMount(async () => {
    try {
      if(!await getLoggedIn()){
        navigate("/login");
        return;
      }

      const response = await fetch('http://localhost:1738/machines');
      if (response.status != 200) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      machines.set(data);
      console.log($machines)
    } catch (error) {
      //  DUMMY MASKINER NÄR MAN INTE HAR IGÅNG DATABASEN 
      //  DUMMY MASKINER NÄR MAN INTE HAR IGÅNG DATABASEN 
      //  DUMMY MASKINER NÄR MAN INTE HAR IGÅNG DATABASEN 
      //  DUMMY MASKINER NÄR MAN INTE HAR IGÅNG DATABASEN 
      //  DUMMY MASKINER NÄR MAN INTE HAR IGÅNG DATABASEN 
      machines.set([
        { id: '1', name: 'Svarv', mechanic_id: '1', status: 'OK', urgency: 'URGENT' },
        { id: '2', name: 'Fräs', mechanic_id: '2', status: 'Maintenance', urgency: 'NORMAL' },
        { id: '3', name: 'Slipmaskin', mechanic_id: '3', status: 'OK', urgency: 'LOW' },
        { id: '4', name: 'Borrmaskin', mechanic_id: '4', status: 'Repair', urgency: 'HIGH' }
      ])
      console.error('Fetch error: ', error);
    }
  });
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
            <Table.Head><MachineForm></MachineForm></Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
            {#each $machines as machine }
              <Table.Row>
                <Table.Cell class="font-medium">{machine.id}</Table.Cell>
                <Table.Cell>{machine.name}</Table.Cell>
                <Table.Cell>{machine.mechanic_id}</Table.Cell>
                <Table.Cell class="text-right">{machine.status}</Table.Cell>
                <Table.Cell>{machine.urgency}</Table.Cell>
                <Table.Cell>
                  <MachineDropdown {machine}></MachineDropdown>
                </Table.Cell>
              </Table.Row>
            {/each}
        </Table.Body>
    </Table.Root>
</div>


