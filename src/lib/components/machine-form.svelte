<script>
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import {Button} from "$lib/components/ui/button/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Input } from "$lib/components/ui/input/index.js";

    import { machines } from "$lib/stores";
    import {Plus} from 'lucide-svelte';

    function handleSubmit(event){
        
        const formData = new FormData(event.target);

        const newMachine = Object.fromEntries(formData.entries());
        console.log(newMachine)

        createNewMachine(newMachine)

    }

    async function createNewMachine(data){

        try {
            const response = await fetch('http://localhost:1738/machine',{
            method: 'POST',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            });
            console.log(response)
            if(response.status != 200){
                throw error
            }
        } catch (error) {
            console.log(error)
            console.log("Couldn't create new machine")
            machines.update(existingMachines => [...existingMachines, data]);
        }

    }

</script>

    <Dialog.Root>
        <Dialog.Trigger>
            <Button class="bg-green-500" variant="outline"><Plus/></Button>
        </Dialog.Trigger>
        <Dialog.Content class="sm:max-w-[425px]">
        <Dialog.Header>
            <Dialog.Title>Create Machine</Dialog.Title>
            <Dialog.Description>
                Create a new machine here. Click save when you're done.
            </Dialog.Description>
        </Dialog.Header>
            <form on:submit|preventDefault={handleSubmit} class="grid gap-4 py-4">
                <div class="grid grid-cols-4 items-center gap-4">
                <Label for="name" class="text-right">Name</Label>
                <Input id="name" name="name" placeholder="" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                <Label for="mechanic_id" class="text-right">Mechanic ID</Label>
                <Input id="mechanic_id" name="mechanic_id" placeholder="Mechanic_Id" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                <Label for="status" class="text-right">Status</Label>
                <Input id="status" name="status" placeholder="Status" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                <Label for="urgency" class="text-right">Urgency</Label>
                <Input id="urgency" name="urgency" placeholder="Urgency" class="col-span-3" />
                </div>
                <Dialog.Footer>
                    <Button class="bg-green-500" type="submit">CREATE MACHINE</Button>
                </Dialog.Footer>
            </form>
        
        </Dialog.Content>
    </Dialog.Root>