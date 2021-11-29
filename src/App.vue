<template>
  <div class="container-fluid">
    <nav class="navbar navbar-expand-lg bg-light sticky-top">
      <div>
        <img src="./assets/homebakersLogo.png" height="100px" />
      </div>
      <ul class="nav nav-tabs my-3">
        <li class="nav-item">
          <button
            class="nav-link active"
            aria-current="page"
            v-on:click="goItems"
          >
            All Items
          </button>
        </li>
        <li class="nav-item">
          <button class="nav-link" v-on:click="goAddItem">
            Add New Listing
          </button>
        </li>
      </ul>
    </nav>
    <div class="alert alert-success my-3" v-if="status">
      {{ status }}
    </div>
    <div>
      <FormValidation />
    </div>
    <Items
      v-if="page == 'listings'"
      v-on:update-item="onEditItem"
      v-on:delete-item="onDeleteItem"
    />
    <Items
      v-else-if="page == 'delete'"
      v-bind:itemId="itemBeingDeleted"
      v-on:delete-item="onItemDeleted"
    />

    <AddItem v-if="page == 'add'" v-on:new-item-added="onItemAdded" />
    <EditItem
      v-if="page == 'edit'"
      v-bind:itemId="itemBeingEdited"
      v-on:item-updated="onItemUpdated"
    />
  </div>
</template>

<script>
import Items from "./components/Items";
import AddItem from "./components/AddItem";
import EditItem from "./components/EditItem";
import FormValidation from "./components/AddItem";
// import DeleteItem from "./components/DeleteItem";
export default {
  name: "App",
  components: {
    Items,
    AddItem,
    EditItem,
    // DeleteItem,
  },
  data: function () {
    return {
      page: "listings",
      status: "",
      itemBeingEdited: 0,
      itemBeingDeleted: 0,
    };
  },
  methods: {
    goItems: function () {
      this.page = "listings";
      this.status = "";
    },
    goAddItem: function () {
      this.page = "add";
      this.status = "";
    },
    onItemAdded: function () {
      this.page = "listings";
      this.status = "A new item has been added!";
    },
    onEditItem: function (itemId) {
      this.page = "edit";
      this.status = "";
      this.itemBeingEdited = itemId;
    },
    onDeleteItem: function (itemId) {
      this.page = "delete";
      this.status = "An item hase been deleted, please refresh the page ";
      this.itemBeingDeleted = itemId;
    },

    onItemUpdated: function () {
      this.page = "listings";
      this.status = "A new item has been updated";
    },
    onItemDeleted: function () {
      this.page = "listings";
      this.status = "An item has been deleted, please refresh the page";
    },
  },
};
</script>

<style>
</style>
