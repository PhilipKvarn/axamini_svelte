<script>
    
    import {Button} from "$lib/components/ui/button/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Input } from "$lib/components/ui/input/index.js";

    import "../app.css";
    import Header from "$lib/components/header.svelte";
    import * as Table from "$lib/components/tables";
    
    let verification = false; 

    async function handleSubmit(event){
        
        const formData = new FormData(event.target);

        const loginData = Object.fromEntries(formData.entries());

        if(!verification){
            try {
                const response = await fetch('http://localhost:1738/login',{
                method: 'POST',
                credentials: 'include',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
                
                });
                /* const dat = await response.json(); */
                console.log(response)
                console.log("logging in")
                if(response.status != 200){
                    throw error
                }
                verification = true
            } catch (error) {
                console.log(error)
                console.log("Couldn't login")
            }
        }
        else{
            try {
                console.log("verifying")
                const response = await fetch('http://localhost:1738/verify',{
                method: 'POST',
                credentials: 'include',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
                
                });
                const dat = await response.json();
                console.log(dat)
                console.log("verifying in")
                if(response.status != 200){
                    throw error
                }
                verification = true
            } catch (error) {
                console.log(error)
                console.log("Couldn't login")
            }
        }
        

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
                <Label for="email" class="text-right">E-mail:</Label>
                <Input id="email" name="email" type="email" placeholder="E-Mail" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                <Label for="code" class="text-right">Code:</Label>
                <Input id="code" name="code" placeholder="Mechanic_Id" class="col-span-3" />
                </div>
                <Button class="bg-blue-500" type="submit">CREATE MACHINE</Button>
            </form>
        </div>
    </div>
</div>
  </main>
  
  
  
  <style>

  </style>