<script>
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import {Button} from "$lib/components/ui/button/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Input } from "$lib/components/ui/input/index.js";

    import { tasks } from "$lib/stores";
    import {Plus} from 'lucide-svelte';

    function handleSubmit(event){
        
        const formData = new FormData(event.target);

        let newTask = Object.fromEntries(formData.entries());
        
        for (const key in newTask){
            let value = newTask[key]
            if(value == ''){newTask[key]=null}
        }

        console.log(newTask)

        createNewTask(newTask)

        

    }

    async function createNewTask(data){

        try {
            const response = await fetch('http://localhost:1738/task',{
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
            tasks.update(existingTasks => [...existingTasks, data]);
        } catch (error) {
            console.log(error)
            console.log("Couldn't create new machine")
            
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
                <Label for="next_execution_date" class="text-right">Next Date</Label>
                <Input id="next_execution_date" name="next_execution_date" placeholder="Next Date" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                <Label for="interval_days" class="text-right">Interval</Label>
                <Input id="interval_days" name="interval_days" placeholder="Interval" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                <Label for="execution_time" class="text-right">Execution Time</Label>
                <Input id="execution_time" name="execution_time" placeholder="Execution Time" class="col-span-3" />
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
                    <Button class="bg-green-500" type="submit">CREATE MACHINE</Button>
                </Dialog.Footer>
            </form>
        
        </Dialog.Content>
    </Dialog.Root>