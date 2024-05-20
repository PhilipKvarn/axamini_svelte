
<script>
    import * as Table from "$lib/components/ui/table";
    import {getLoggedIn} from "$lib/utils"
    import { suggestions } from "$lib/stores";
    import { onMount } from 'svelte';
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import SuggestionDropdown from "./suggestion-dropdown.svelte";
    import SuggestionForm from "./suggestion-form.svelte";
    import { navigate } from 'svelte-routing';

    onMount(async () => {
    try {
      if(!await getLoggedIn()){
        navigate("/login");
        return;
      }
      
      const response = await fetch('http://localhost:1738/suggestions');
      if (response.status != 200) {
        throw new Error(response.statusText);
      }
      const data = await response.json();

      suggestions.set(data);
      console.log($suggestions)
    } catch (error) {
      //  DUMMY suggestions NÄR MAN INTE HAR IGÅNG DATABASEN 
      //  DUMMY suggestions NÄR MAN INTE HAR IGÅNG DATABASEN 
      //  DUMMY suggestions NÄR MAN INTE HAR IGÅNG DATABASEN 
      //  DUMMY suggestions NÄR MAN INTE HAR IGÅNG DATABASEN 
      //  DUMMY suggestions NÄR MAN INTE HAR IGÅNG DATABASEN 
      console.error('Fetch error: ', error);
    }
  });
</script>

<div>
    <Table.Root>
        <Table.Caption>Lista av alla suggestions.</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.Head class="w-[100px]">id</Table.Head>
            <Table.Head>Name</Table.Head>
            <Table.Head>Creator ID</Table.Head>
            <Table.Head>Machine ID</Table.Head>
            <Table.Head>Description</Table.Head>
            <Table.Head><SuggestionForm></SuggestionForm></Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
            {#each $suggestions as suggestion }
              <Table.Row>
                <Table.Cell class="font-medium">{suggestion.id}</Table.Cell>
                <Table.Cell>{suggestion.name}</Table.Cell>
                <Table.Cell>{suggestion.creator_id}</Table.Cell>
                <Table.Cell>{suggestion.machine_id}</Table.Cell>
                <Table.Cell>{suggestion.description}</Table.Cell>
                <Table.Cell>
                  <SuggestionDropdown {suggestion}></SuggestionDropdown>
                </Table.Cell>
              </Table.Row>
            {/each}
        </Table.Body>
    </Table.Root>
</div>


