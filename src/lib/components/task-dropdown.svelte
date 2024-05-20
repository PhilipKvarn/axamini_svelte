<script>
    import { tasks } from "$lib/stores";
    import {Ellipsis} from 'lucide-svelte';
    
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import {Button} from "$lib/components/ui/button/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import * as AlertDialog from "$lib/components/ui/alert-dialog";


    export let task;
    let dialogOpen = false;
    let alertOpen = false;


    //const machine = $machines.find(machine => machine.id == machineId);

    async function deleteMachine(id){

      try {
            const response = await fetch('http://localhost:1738/task',{
            method: 'DELETE',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({"id":id}),
            });
            console.log(response)
            if(response.status != 200){
                throw error
            }

            tasks.update((currentTasks) => {
              return currentTasks.filter(task => task.id !== id);
            });

        } catch (error) {
            console.log(error)
            console.log("Couldn't create new task")
        }
    }

    async function updateTask(updatedTask){

      try {
            const response = await fetch('http://localhost:1738/task',{
            method: 'Put',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTask),
            });
            console.log(response)
            if(response.status != 200){
                throw error
            }

            tasks.update(currentTasks => {
              return currentTasks.map(task => {
                if (task.id === updatedTask.id) {
                  return { ...task, ...updatedTask };
                }
                return task;
              });
            });
        console.log("UPDATE: " + tasks)

        } catch (error) {
            console.log(error)
            console.log("Couldn't create new machine")
        }
    }
    
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button
			variant="ghost"
			builders={[builder]}
			class="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
		>
			<Ellipsis class="h-4 w-4" />
			<span class="sr-only">Open Menu</span>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-[160px]" align="end">
        <DropdownMenu.Item on:click={() => {
            dialogOpen = true
        }}>Edit Task</DropdownMenu.Item>
		<DropdownMenu.Separator />
		  <DropdownMenu.Item on:click={() => {
        alertOpen = true
      }}>Delete <DropdownMenu.Shortcut>⌘⌫</DropdownMenu.Shortcut> </DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<Dialog.Root bind:open={dialogOpen}>
    <Dialog.Content class="sm:max-w-[425px]">
      <Dialog.Header>
        <Dialog.Title>Edit profile</Dialog.Title>
        <Dialog.Description>
          Make changes to your Task here, Click save to save changes.
        </Dialog.Description>
      </Dialog.Header>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right">Name</Label>
          <Input id="name" bind:value={task.name} class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="next_execution_date" class="text-right">Next Date</Label>
          <Input id="next_execution_date" bind:value={task.next_execution_date} class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="interval_days" class="text-right">Interval</Label>
          <Input id="interval_days" bind:value={task.interval_days} class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="execution_time" class="text-right">Time</Label>
          <Input  id="execution_time" bind:value={task.execution_time} class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="machine_id" class="text-right">maskin id</Label>
          <Input  id="machine_id" bind:value={task.machine_id} class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="description" class="text-right">info</Label>
          <Input  id="description" bind:value={task.description} class="col-span-3" />
        </div>
      </div>
      <Dialog.Footer>
        <Button type="submit" on:click={() => updateTask(task)}>Save changes</Button>
      </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>

<AlertDialog.Root bind:open={alertOpen}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Description>
        This action cannot be undone. This will permanently delete your task and remove your it's from our servers.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>CANCEL</AlertDialog.Cancel>
      <AlertDialog.Action class="bg-red-500" on:click={() => deleteMachine(task.id)} >DELETE</AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>