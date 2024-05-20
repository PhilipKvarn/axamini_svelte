<script>
  import { Router, Link, Route } from 'svelte-routing';
  
  import "./app.css";
  import Header from "$lib/components/header.svelte";

  

  import Tasks from './routes/Tasks.svelte';
  import Machines from './routes/Machines.svelte';
  import Users from './routes/Users.svelte';
  import Login from './routes/Login.svelte';
  import Suggestions from './routes/Suggestions.svelte';
  
</script>


<main>
  <Header></Header>
  <Router>
    <Route path="/login" component={Login} />
    <Route path="/machines" component={Machines} />
    <Route path="/tasks" component={Tasks} />
    <Route path="/suggestions" component={Suggestions} />
    <Route path="/users" component={Users} />
  </Router>
</main>


<style>

</style>