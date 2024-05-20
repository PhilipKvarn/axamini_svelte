
<script>
    import * as Table from "$lib/components/ui/table";
    import { users } from "$lib/stores";
    import { onMount } from 'svelte';
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import TaskDropdown from "./task-dropdown.svelte";
    import MachineForm from "./machine-form.svelte";

    onMount(async () => {
    try {
      const response = await fetch('http://localhost:1738/users');
      if (response.status != 200) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      users.set(data);
      console.log($users)
    } catch (error) {
      //  DUMMY users NÄR MAN INTE HAR IGÅNG DATABASEN 
      //  DUMMY users NÄR MAN INTE HAR IGÅNG DATABASEN 
      //  DUMMY users NÄR MAN INTE HAR IGÅNG DATABASEN 
      //  DUMMY users NÄR MAN INTE HAR IGÅNG DATABASEN 
      //  DUMMY users NÄR MAN INTE HAR IGÅNG DATABASEN 
      users.set([
        { id: '1', name: 'Städa', next_execution_date: '24-08-12', interval_days: '7', execution_time: '120', machine_id:"1",description:"" },
        { id: '2', name: 'Slipa', next_execution_date: '24-08-04', interval_days: '31', execution_time: '60', machine_id:"2",description:"" },
        { id: '3', name: 'Betala Skatt', next_execution_date: '0', interval_days: '0', execution_time: '0', machine_id:"3",description:"Det finns ingen information att läsa här" },

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
            <Table.Head>Phnoe Numbere :D</Table.Head>
            <Table.Head>email</Table.Head>
            <Table.Head>Company</Table.Head>
            <Table.Head><MachineForm></MachineForm></Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
            {#each $users as user }
              <Table.Row>
                <Table.Cell class="font-medium">{user.id}</Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.telephone_number}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.company_name}</Table.Cell>
                <Table.Cell>
                  <TaskDropdown {user}></TaskDropdown>
                </Table.Cell>
              </Table.Row>
            {/each}
        </Table.Body>
    </Table.Root>
</div>


