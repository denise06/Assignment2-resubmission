<template>
  <div>
    <h1>Bakers Paradise</h1>
    <button
      v-bind:style="{ backgroundColor: textColor }"
      v-on:click="changeToRed"
    >
      Seller
    </button>
    <form>
      <div class="d-flex flex-wrap form-row">
        <div class="col-auto">
          <b><label style="margin right 10px">Search by Item Name</label></b>
          <input
            type="text"
            class="form-control"
            placeholder="--Pizza--"
            v-model="searchTerms"
          />
        </div>
        <div class="col-auto">
          <b><label style="margin right 10px">Search by Description</label></b>
          <input
            type="text-auto"
            class="form-control"
            placeholder="--Cheap and Good--"
            v-model="searchTermsDesc"
          />
        </div>
        <div class="col-auto">
          <b><label style="margin right 10px">Search by Shop Name</label></b>
          <input
            type="text"
            class="form-control"
            placeholder="--Shop Name--"
            v-model="searchTermsSN"
          />
        </div>
      </div>
    </form>
    <b
      ><div>{{ itemCount }} Items</div></b
    >

    <!-- attempt to use card -->
    <div class="container d-flex flex-wrap mt-3">
      <div
        class="card mx-1 my-1"
        style="width: 18rem"
        v-for="i in filteredItems"
        v-bind:key="i._id"
      >
        <h4 class="card-header" style="margin top 3px">{{ i.itemName }}</h4>
        <div class="card-body">
          <p class="card-text">{{ i.itemDesc }}</p>
          <p><b>Shop Name</b>: {{ i.shopName }}</p>
          <p><b>Price: </b>{{ i.itemPrice }}</p>
          <p><b>Category: </b>{{ i.category.join(", ") }}</p>
          <p><b>Contact Info: </b>{{ i.contactInfo }}</p>
          <p><b>Bundle Deal: </b>{{ i.bundleDeal }}</p>
          <p><b>Delivery: </b>{{ i.delivery }}</p>
          <button
            class="btn btn-primary btn-sm mx-1"
            v-on:click="update(i._id)"
          >
            Edit
          </button>
          <button
            class="btn btn-danger btn-sm mx-1"
            v-on:click="deleteItem(i._id)"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- 
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Item Description</th>
            <th>Shop Name</th>
            <th>Price /pc</th>
            <th>Category</th>
            <th>Contact Info</th>
            <th>Bundle Deal?</th>
            <th>Delivery Method</th>
            <th>Action</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in filteredItems" v-bind:key="i._id">
            <td>{{ i.itemName }}</td>
            <td>{{ i.itemDesc }}</td>
            <td>{{ i.shopName }}</td>
            <td>{{ i.itemPrice }}</td>
            <td>{{ i.category.join(", ") }}</td>
            <td>{{ i.contactInfo }}</td>
            <td>{{ i.bundleDeal }}</td>
            <td>{{ i.delivery }}</td>
            <td>
              <button class="btn btn-primary btn-sm" v-on:click="update(i._id)">
                Edit
              </button>
            </td>
            <td>
              <button
                class="btn btn-danger btn-sm"
                v-on:click="deleteItem(i._id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div> -->
  </div>
</template>



<script>
import axios from "axios";
// const API_URL = "https://8080-maroon-wallaby-uyspmwyr.ws-us15.gitpod.io";
// const API_URL = "https://8080-kumquat-mouse-2z4yehyd.ws-us18.gitpod.io";
const API_URL = "https://dcyx-tgc-assignment2.herokuapp.com";
export default {
  name: "Items",
  data: function () {
    return {
      items: [],
      searchTerms: "",
      searchTermsDesc: "",
      searchTermsSN: "",
      textColor: "yellow",
    };
  },
  mounted: async function () {
    let response = await axios.get(API_URL + "/item_record");
    this.items = response.data;
  },
  computed: {
    filteredItems: function () {
      let filteredItems = [];
      for (let eachItem of this.items) {
        if (
          eachItem.itemName
            .toLowerCase()
            .includes(this.searchTerms.toLowerCase())
        ) {
          filteredItems.push(eachItem);
        }
      }
      filteredItems = filteredItems.filter((eachItem) => {
        return eachItem.itemDesc
          .toLowerCase()
          .includes(this.searchTermsDesc.toLowerCase());
      });

      filteredItems = filteredItems.filter((eachItem) => {
        return eachItem.shopName
          .toLowerCase()
          .includes(this.searchTermsSN.toLowerCase());
      });

      return filteredItems;
    },

    itemCount: function () {
      return this.filteredItems.length;
    },
  },
  methods: {
    update: function (itemId) {
      this.$emit("update-item", itemId);
    },
    deleteItem: async function (itemId) {
      await axios.delete(API_URL + "/item_record/" + itemId, {
        // itemName: this.itemName,
        // itemDesc: this.itemDesc,
        // itemPrice: this.itemPrice,
        // bundleDeal: this.bundleDeal,
        // contactInfo: this.contactInfo,
        // delivery: this.delivery,
        // category: this.category,
        // shopName: this.shopName,
      });
      this.$emit("delete-item", itemId);
    },
    changeToRed: function () {
      this.textColor = "red";
    },
  },
};
</script>
