<script>
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import {Button} from "$lib/components/ui/button/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Input } from "$lib/components/ui/input/index.js";

    import { suggestions } from "$lib/stores";
    import {Plus} from 'lucide-svelte';

    function handleSubmit(event){
        
        const formData = new FormData(event.target);

        const newSuggestion = Object.fromEntries(formData.entries());
        console.log(newSuggestion)

        createNewSuggestion(newSuggestion)

    }

    async function createNewSuggestion(data){

        try {
            const response = await fetch('http://localhost:1738/suggestion',{
            method: 'POST',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            });
            console.log(response)
            if(response.ok){
                const responseData = await response.json();
                console.log(responseData)
                data.id = responseData.id;
            }
            else{
                throw error
            }
            suggestions.update(existingSuggestions => [...existingSuggestions, data]);
        } catch (error) {
            console.log(error)
            console.log("Couldn't create new suggestion")
        }

    }

</script>

    <Dialog.Root>
        <Dialog.Trigger>
            <Button class="bg-green-500" variant="outline"><Plus/></Button>
        </Dialog.Trigger>
        <Dialog.Content class="sm:max-w-[425px]">
        <Dialog.Header>
            <Dialog.Title>Create suggestion</Dialog.Title>
            <Dialog.Description>
                Create a new suggestion here. Click save when you're done.
            </Dialog.Description>
        </Dialog.Header>
            <form on:submit|preventDefault={handleSubmit} class="grid gap-4 py-4">
                <div class="grid grid-cols-4 items-center gap-4">
                <Label for="name" class="text-right">Name</Label>
                <Input id="name" name="name" placeholder="" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                <Label for="creator_id" class="text-right">Creator ID</Label>
                <Input id="creator_id" name="creator_id" placeholder="Creator ID" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                <Label for="machine_id" class="text-right">Machine ID</Label>
                <Input id="machine_id" name="machine_id" placeholder="Machine ID" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                <Label for="description" class="text-right">Description</Label>
                <Input id="description" name="description" placeholder="Description" class="col-span-3" />
                </div>
                <Dialog.Footer>
                    <Button class="bg-green-500" type="submit">CREATE SUGGESTION</Button>
                </Dialog.Footer>
            </form>
        </Dialog.Content>
    </Dialog.Root>