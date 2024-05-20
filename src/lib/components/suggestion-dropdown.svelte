<script>
    import { suggestions } from "$lib/stores";
    import {Ellipsis} from 'lucide-svelte';
    
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import {Button} from "$lib/components/ui/button/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import * as AlertDialog from "$lib/components/ui/alert-dialog";


    export let suggestion;
    let dialogOpen = false;
    let alertOpen = false;


    //const machine = $machines.find(machine => machine.id == machineId);

    async function deleteSuggestion(id){

      try {
            const response = await fetch('http://localhost:1738/suggestion',{
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

            suggestions.update((currentSuggestions) => {
              return currentSuggestions.filter(suggestion => suggestion.id !== id);
            });

        } catch (error) {
            console.log(error)
            console.log("Couldn't create new suggestion")
        }
    }

    async function updateSuggestion(updatedSuggestion){
      console.log(updatedSuggestion)
      try {
            const response = await fetch('http://localhost:1738/suggestion',{
            method: 'Put',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedSuggestion),
            });
            console.log(response)
            if(response.status != 200){
                throw error
            }

            suggestions.update(currentSuggestions => {
              return currentSuggestions.map(suggestion => {
                if (suggestion.id === updatedSuggestion.id) {
                  return { ...suggestion, ...updatedSuggestion };
                }
                return suggestion;
              });
            });
        console.log("UPDATE: " + suggestions)

        } catch (error) {
            console.log(error)
            console.log("Couldn't create new suggestion")
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
        }}>Edit suggestion</DropdownMenu.Item>
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
          Make changes to your suggestion here, Click save to save changes.
        </Dialog.Description>
      </Dialog.Header>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right">Name</Label>
          <Input id="name" bind:value={suggestion.name} class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="creator_id" class="text-right">Creator ID</Label>
          <Input id="creator_id" bind:value={suggestion.creator_id} class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="machine_id" class="text-right">Machine ID</Label>
          <Input id="machine_id" bind:value={suggestion.machine_id} class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="description" class="text-right">Description</Label>
          <Input  id="description" bind:value={suggestion.description} class="col-span-3" />
        </div>
      </div>
      <Dialog.Footer>
        <Button type="submit" on:click={() => updateSuggestion(suggestion)}>Save changes</Button>
      </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>

<AlertDialog.Root bind:open={alertOpen}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Description>
        This action cannot be undone. This will permanently delete your suggestion from our servers.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>CANCEL</AlertDialog.Cancel>
      <AlertDialog.Action class="bg-red-500" on:click={() => deleteSuggestion(suggestion.id)} >DELETE</AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>