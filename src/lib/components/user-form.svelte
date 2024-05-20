<script>
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import {Button} from "$lib/components/ui/button/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Input } from "$lib/components/ui/input/index.js";

    import { users } from "$lib/stores";
    import {Plus} from 'lucide-svelte';

    function handleSubmit(event){
        
        const formData = new FormData(event.target);

        const newMachine = Object.fromEntries(formData.entries());
        console.log(newMachine)

        createNewMachine(newMachine)

    }

    async function createNewMachine(data){

        try {
            const response = await fetch('http://localhost:1738/user',{
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
            users.update(existingUsers => [...existingUsers, data]);
        } catch (error) {
            console.log(error)
            console.log("Couldn't create new user")
        }

    }

</script>

    <Dialog.Root>
        <Dialog.Trigger>
            <Button class="bg-green-500" variant="outline"><Plus/></Button>
        </Dialog.Trigger>
        <Dialog.Content class="sm:max-w-[425px]">
        <Dialog.Header>
            <Dialog.Title>Create User</Dialog.Title>
            <Dialog.Description>
                Create a new user here. Click save when you're done.
            </Dialog.Description>
        </Dialog.Header>
            <form on:submit|preventDefault={handleSubmit} class="grid gap-4 py-4">
                <div class="grid grid-cols-4 items-center gap-4">
                <Label for="name" class="text-right">Name</Label>
                <Input id="name" name="name" placeholder="" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                <Label for="telephone_number" class="text-right">Phone Number</Label>
                <Input id="telephone_number" name="telephone_number" placeholder="Phone Number" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                <Label for="email" class="text-right">email</Label>
                <Input id="email" name="email" placeholder="email" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                <Label for="company_name" class="text-right">Company Name</Label>
                <Input id="company_name" name="company_name" placeholder="Company Name" class="col-span-3" />
                </div>
                <Dialog.Footer>
                    <Button class="bg-green-500" type="submit">CREATE USER</Button>
                </Dialog.Footer>
            </form>
        </Dialog.Content>
    </Dialog.Root>