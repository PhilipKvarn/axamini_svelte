<script>
  import { Router, Link, Route } from 'svelte-routing';
  import {Button} from "$lib/components/ui/button/index.js";
  import * as Sheet from "$lib/components/ui/sheet/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Menu } from 'lucide-svelte';
  
</script>


<header class="flex">

  <Sheet.Root>
    <Sheet.Trigger asChild let:builder>
      <Button builders={[builder]} class="flex w-[80px] h-[60px] m-5" variant="outline"><Menu strokeWidth={2.5}/></Button>
    </Sheet.Trigger>
    <Sheet.Content  class="bg-blue-500" side="left">
      <Sheet.Header>
        <Sheet.Title><Label class="text-3xl text-white">Menu</Label></Sheet.Title>
        <Sheet.Description class="text-white">
          Change Site
        </Sheet.Description>
      </Sheet.Header>
      <div class="grid gap-4 py-4">
        <a href="/login"><div class="items-center">
          <Button variant="link" class="w-full text-2xl text-white font-semibold">Index</Button>
        </div></a>
        <a href="/machines"><div class="items-center">
          <Button variant="link" to="/machines" class="w-full text-2xl text-white font-semibold">Machines</Button>
        </div></a>
        <a href="/tasks"><div class="items-center">
          <Button variant="link" to="/tasks" class="w-full text-2xl text-white font-semibold">Tasks</Button>
        </div></a>
        <a href="/users"><div class="items-center">
          <Button variant="link" to="/users" class="w-full text-2xl text-white font-semibold">Users</Button>
        </div></a>
      </div>
      <Sheet.Footer>
        <!-- <Label class="text-xl text-white">AXAMINI CORPORATION</Label> -->
      </Sheet.Footer>
    </Sheet.Content>
  </Sheet.Root>  
  
  <Label class="text-center flex-1 text-4xl text-white font-light m-auto">AXAMINI</Label>

    

</header>

<style>

    header{
    min-height: 10vh;
    background-color: #488eff;
    }
</style>