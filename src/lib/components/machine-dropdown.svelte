<script>
    import { machines } from "$lib/stores";
    import {Ellipsis} from 'lucide-svelte';
    
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import {Button} from "$lib/components/ui/button/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";


    export let machine;
    let dialogOpen = false;
    console.log(machine)


    //const machine = $machines.find(machine => machine.id == machineId);


    
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
        }}>Edit Machine</DropdownMenu.Item>
		<DropdownMenu.Item>Make a copy</DropdownMenu.Item>
		<DropdownMenu.Item>Favorite</DropdownMenu.Item>
		<DropdownMenu.Separator />
		<DropdownMenu.Separator />
		<DropdownMenu.Item>
			Delete
			<DropdownMenu.Shortcut>⌘⌫</DropdownMenu.Shortcut>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<Dialog.Root bind:open={dialogOpen}>
    <Dialog.Content class="sm:max-w-[425px]">
      <Dialog.Header>
        <Dialog.Title>Edit profile</Dialog.Title>
        <Dialog.Description>
          Make changes to your profile here. Click save when you're done.
        </Dialog.Description>
      </Dialog.Header>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right">Name</Label>
          <Input id="name" value="{machine.name}" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="username" class="text-right">Username</Label>
          <Input id="username" value="@peduarte" class="col-span-3" />
        </div>
      </div>
      <Dialog.Footer>
        <Button type="submit">Save changes</Button>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>