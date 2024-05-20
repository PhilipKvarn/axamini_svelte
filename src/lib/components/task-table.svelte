
<script>
    import * as Table from "$lib/components/ui/table";
    import { tasks } from "$lib/stores";
    import { onMount } from 'svelte';
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import TaskDropdown from "./task-dropdown.svelte";
    import TaskForm from "./task-form.svelte";

    onMount(async () => {
    try {
      const response = await fetch('http://localhost:1738/tasks');
      if (response.status != 200) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      tasks.set(data);
      console.log($tasks)
    } catch (error) {
      //  DUMMY TASKS NÄR MAN INTE HAR IGÅNG DATABASEN 
      //  DUMMY TASKS NÄR MAN INTE HAR IGÅNG DATABASEN 
      //  DUMMY TASKS NÄR MAN INTE HAR IGÅNG DATABASEN 
      //  DUMMY TASKS NÄR MAN INTE HAR IGÅNG DATABASEN 
      //  DUMMY TASKS NÄR MAN INTE HAR IGÅNG DATABASEN 
      tasks.set([
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
        <Table.Caption>Lista av alla tasks.</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.Head class="w-[100px]">id</Table.Head>
            <Table.Head>Name</Table.Head>
            <Table.Head>Next Date</Table.Head>
            <Table.Head>Interval</Table.Head>
            <Table.Head>Time</Table.Head>
            <Table.Head>maskin id</Table.Head>
            <Table.Head>info</Table.Head>
            <Table.Head><TaskForm></TaskForm></Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
            {#each $tasks as task }
              <Table.Row>
                <Table.Cell class="font-medium">{task.id}</Table.Cell>
                <Table.Cell>{task.name}</Table.Cell>
                <Table.Cell>{task.next_execution_date}</Table.Cell>
                <Table.Cell>{task.interval_days}</Table.Cell>
                <Table.Cell>{task.execution_time}</Table.Cell>
                <Table.Cell>{task.machine_id}</Table.Cell>
                <Table.Cell>{task.description}</Table.Cell>
                <Table.Cell>
                  <TaskDropdown {task}></TaskDropdown>
                </Table.Cell>
              </Table.Row>
            {/each}
        </Table.Body>
    </Table.Root>
</div>


