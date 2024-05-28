<script>
    import { users } from "$lib/stores";
    import {Ellipsis} from 'lucide-svelte';
    
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import {Button} from "$lib/components/ui/button/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import * as AlertDialog from "$lib/components/ui/alert-dialog";


    export let user;
    let dialogOpen = false;
    let alertOpen = false;


    //const machine = $machines.find(machine => machine.id == machineId);

    async function deleteUser(id){

      try {
            const response = await fetch('http://localhost:1738/user',{
            method: 'DELETE',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({"id":id}),
            });
            console.log(response)
            if(response.ok){
              users.update((currentUsers) => {
                return currentUsers.filter(user => user.id !== id);
              });
            }
            else{
                throw error
            }
        } catch (error) {
            console.log(error)
            console.log("Couldn't create new user")
        }
    }

    async function updateUser(updatedUser){
      console.log(updatedUser)
      try {
            const response = await fetch('http://localhost:1738/user',{
            method: 'Put',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
            });
            console.log(response)
            if(response.ok){
              users.update(currentUsers => {
                return currentUsers.map(user => {
                  if (user.id === updatedUser.id) {
                    return { ...user, ...updatedUser };
                  }
                  return user;
                });
              });
            }
            else{
                throw error
            }

            
        console.log("UPDATE: " + users)

        } catch (error) {
            console.log(error)
            console.log("Couldn't create new USER")
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
        }}>Edit User</DropdownMenu.Item>
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
          Make changes to your user here, Click save to save changes.
        </Dialog.Description>
      </Dialog.Header>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right">Name</Label>
          <Input id="name" bind:value={user.name} class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="telephone_number" class="text-right">Phone Number</Label>
          <Input id="telephone_number" bind:value={user.telephone_number} class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="email" class="text-right">email</Label>
          <Input id="email" type="email" bind:value={user.email} class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="company_name" class="text-right">Company Name</Label>
          <Input  id="company_name" bind:value={user.company_name} class="col-span-3" />
        </div>
      </div>
      <Dialog.Footer>
        <Button type="submit" on:click={() => updateUser(user)}>Save changes</Button>
      </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>

<AlertDialog.Root bind:open={alertOpen}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Description>
        This action cannot be undone. This will permanently delete your user from our servers.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>CANCEL</AlertDialog.Cancel>
      <AlertDialog.Action class="bg-red-500" on:click={() => deleteUser(user.id)} >DELETE</AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>