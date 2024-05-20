<script>
    
    import {Button} from "$lib/components/ui/button/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Input } from "$lib/components/ui/input/index.js";

    import "../app.css";
    import Header from "$lib/components/header.svelte";
    import * as Table from "$lib/components/tables";
    
    function handleSubmit(event){
        
        const formData = new FormData(event.target);

        const loginfo = Object.fromEntries(formData.entries());

        console.log(JSON.stringify(loginfo))

    }

  </script>
  
  
  <main>
    <div
    class="container relative min-h-[90vh] flex items-center justify-center md:grid lg:max-w-none lg:grid-cols-1 lg:px-0"
>
    <div class="mx-auto flex w-full h-full flex-col justify-center items-center space-y-6 transform -translate-y-10">
        <div class="flex flex-col space-y-2 text-center">
            <h1 class="text-2xl font-semibold tracking-tight">Login</h1>
            <p class="text-sm text-muted-foreground">Enter your email below to start logging in</p>
        </div>

        <div class="grid gap-6 sm:w-[350px]">
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
            
                    <Button class="bg-green-500" type="submit">CREATE MACHINE</Button>
                
            </form>
        </div>
    </div>
</div>
  </main>
  
  
  
  <style>

  </style>