<template>
  <div class="card">
    <h3 class="card-header text-center">Add New Item</h3>
    <div class="card-body">
      <form class="mt-4" v-on:submit.prevent="processUpdate">
        <div>
          <label class="form-label">Shop Name *</label>
          <input
            type="text"
            class="form-control"
            v-model.trim="$v.shopName.$model"
            :class="{
              'is-invalid': $v.shopName.$error,
              'is-valid': !$v.shopName.$invalid,
            }"
          />

          <div class="invalid-feedback">
            <span v-if="!$v.shopName.required">Shop Name is required</span>
            <span v-if="!$v.shopName.minLength"
              >Shop name is too short, min
              {{ $v.shopName.$params.minLength.min }} characters</span
            >
            <span v-if="!$v.shopName.maxLength"
              >Shop name is too long, max
              {{ $v.shopName.$params.maxLength.max }} characters</span
            >
          </div>
        </div>
        <div>
          <label class="form-label">Item Name *</label>
          <input
            type="text"
            class="form-control"
            v-model.trim="$v.itemName.$model"
            :class="{
              'is-invalid': $v.itemName.$error,
              'is-valid': !$v.itemName.$invalid,
            }"
          />

          <div class="invalid-feedback">
            <span v-if="!$v.itemName.required">Item Name is required</span>
            <span v-if="!$v.itemName.minLength"
              >Item name is too short, min
              {{ $v.itemName.$params.minLength.min }} characters</span
            >
            <span v-if="!$v.itemName.maxLength"
              >Item name is too long, max
              {{ $v.itemName.$params.maxLength.max }} characters</span
            >
          </div>
        </div>
        <div>
          <label class="form-label">Item Description *</label>
          <input
            type="text"
            class="form-control"
            v-model.trim="$v.itemDesc.$model"
            :class="{
              'is-invalid': $v.itemDesc.$error,
              'is-valid': !$v.itemDesc.$invalid,
            }"
          />

          <div class="invalid-feedback">
            <span v-if="!$v.itemDesc.required">Item Name is required</span>
            <span v-if="!$v.itemDesc.minLength"
              >Item name is too short, min
              {{ $v.itemDesc.$params.minLength.min }} characters</span
            >
            <span v-if="!$v.itemDesc.maxLength"
              >Item name is too long, max
              {{ $v.itemDesc.$params.maxLength.max }} characters</span
            >
          </div>
        </div>
        <div>
          <label class="form-label">Item Price</label>
          <input type="number" class="form-control" v-model="itemPrice" />
        </div>
        <div>
          <label class="form-label">Bundle Deal Available?</label>
          <div>
            <div class="form-check form-check-inline">
              <input
                type="radio"
                name="bundleDeal"
                value="available"
                v-model="bundleDeal"
              />
              <label style="display: inline-block; margin-left: 10px">
                Available
              </label>
            </div>

            <div class="form-check form-check-inline">
              <input
                type="radio"
                name="bundleDeal"
                value="not-available"
                v-model="bundleDeal"
              />
              <label style="display: inline-block; margin-left: 10px">
                Not Available
              </label>
            </div>
          </div>
        </div>
        <div>
          <label class="form-label">Contact Information</label>
          <input type="number" class="form-control" v-model="contactInfo" />
        </div>
        <div>
          <label class="form-label">Delivery Method</label>
          <select class="form-control" v-model="delivery">
            <option value="standard">Standard Delivery (3-5 days)</option>
            <option value="express">Express Delivery (1-2 days)</option>
            <option value="selfPickup">Self Pickup</option>
          </select>
        </div>
        <div>
          <label>Category</label>
          <div>
            <label>Deserts</label>
            <input type="checkbox" value="desert" v-model="category" />
            <label style="margin-left: 10px">Bread</label>
            <input type="checkbox" value="bread" v-model="category" />
            <label style="margin-left: 10px">Pizza</label>
            <input type="checkbox" value="pizza" v-model="category" />
            <label style="margin-left: 10px">Vegan</label>
            <input type="checkbox" value="vegan" v-model="category" />
            <label tyle="margin-left: 10px">Gluten Free</label>
            <input type="checkbox" value="glutenFree" v-model="category" />
          </div>
        </div>

        <!-- <button type = "submit" class="mt-3 btn btn-primary" v-on:click="processAddItem"> -->
        <button type="submit" class="mt-3 btn btn-primary">
          Update {{ submitstatus }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// const API_URL = "https://8080-maroon-wallaby-uyspmwyr.ws-us15.gitpod.io";
// const API_URL = "https://8080-kumquat-mouse-2z4yehyd.ws-us18.gitpod.io";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
const API_URL = "https://dcyx-tgc-assignment2.herokuapp.com";
export default {
  name: "EditItem",
  data: function () {
    return {
      itemName: "",
      itemDesc: "",
      itemPrice: "",
      bundleDeal: "",
      contactInfo: "",
      category: [],
      delivery: "",
      shopName: "",
      submitstatus: null,
    };
  },
  validations: {
    itemName: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(20),
    },
    itemDesc: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(40),
    },
    shopName: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(20),
    },
  },
  props: ["itemId"],
  mounted: async function () {
    let response = await axios.get(API_URL + "/item_record/" + this.itemId);
    this.itemName = response.data.itemName;
    this.itemDesc = response.data.itemDesc;
    this.itemPrice = response.data.itemPrice;
    this.bundleDeal = response.data.bundleDeal;
    this.contactInfo = response.data.contactInfo;
    this.delivery = response.data.delivery;
    this.category = response.data.category;
    this.shopName = response.data.shopName;
  },
  methods: {
    processUpdate: async function () {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitstatus = "FAIL";
      } else {
        await axios.patch(API_URL + "/item_record/" + this.itemId, {
          itemName: this.itemName,
          itemDesc: this.itemDesc,
          itemPrice: this.itemPrice,
          bundleDeal: this.bundleDeal,
          contactInfo: this.contactInfo,
          delivery: this.delivery,
          category: this.category,
          shopName: this.shopName,
        });
        this.$emit("item-updated");
        this.submitstatus = "SUCCESS";
      }
    },
  },
};
</script>