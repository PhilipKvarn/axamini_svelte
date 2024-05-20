
<script>
    import * as Table from "$lib/components/ui/table";
    import {getLoggedIn} from "$lib/utils"
    import { users } from "$lib/stores";
    import { onMount } from 'svelte';
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import UserDropdown from "./user-dropdown.svelte";
    import UserForm from "./user-form.svelte";
    import { navigate } from 'svelte-routing';

    onMount(async () => {
    try {
      if(!await getLoggedIn()){
        navigate("/login");
        return;
      }
      
      const response = await fetch('http://localhost:1738/users');
      if (response.status != 200) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log("hello beautiful people")
      users.set(data);
      console.log($users)
    } catch (error) {
      //  DUMMY users NÄR MAN INTE HAR IGÅNG DATABASEN 
      //  DUMMY users NÄR MAN INTE HAR IGÅNG DATABASEN 
      //  DUMMY users NÄR MAN INTE HAR IGÅNG DATABASEN 
      //  DUMMY users NÄR MAN INTE HAR IGÅNG DATABASEN 
      //  DUMMY users NÄR MAN INTE HAR IGÅNG DATABASEN 
      users.set([
        { id: '1', name: 'skibidiohiorizzlet', telephone_number: '07072903441', email: 'skibidiohiorizzlet@axamini.com', company_name: 'AXAMINI'},
        { id: '2', name: 'caerlsaen', telephone_number: '123123654', email: 'caerlsaen@corpcrop.com', company_name: 'CORP CORP'},
        { id: '3', name: 'Randal Thymes', telephone_number: '1738', email: 'RandalThymas@EvilOrg', company_name: 'EVIL ORG'},

      ])
      console.error('Fetch error: ', error);
    }
  });
</script>

<div>
    <Table.Root>
        <Table.Caption>Lista av alla Users.</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.Head class="w-[100px]">id</Table.Head>
            <Table.Head>Name</Table.Head>
            <Table.Head>Phone Number</Table.Head>
            <Table.Head>email</Table.Head>
            <Table.Head>Company</Table.Head>
            <Table.Head><UserForm></UserForm></Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
            {#each $users as user }
              <Table.Row>
                <Table.Cell class="font-medium">{user.id}</Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.telephone_number}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.company_name}</Table.Cell>
                <Table.Cell>
                  <UserDropdown {user}></UserDropdown>
                </Table.Cell>
              </Table.Row>
            {/each}
        </Table.Body>
    </Table.Root>
</div>


