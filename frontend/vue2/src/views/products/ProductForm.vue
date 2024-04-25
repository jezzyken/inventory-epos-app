<template>

  <v-container>

    <v-sheet elevation="1" class="pa-5">
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field v-model="editedItem.productCode" label="Product Code"></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field v-model="editedItem.category" label="Category"></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field v-model="editedItem.brand" label="Brand"></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-text-field v-model="editedItem.criticalLimit" label="Critical Limit"></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field v-model="editedItem.description" label="Description"></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field v-model="editedItem.image" label="Image URL"></v-text-field>
        </v-col>
      </v-row>
    </v-sheet>

    <v-sheet elevation="1" class="pa-5 mt-5">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Unit
              </th>
              <th class="text-left">
                Variant
              </th>
              <th class="text-left">
                Item Price
              </th>
              <th class="text-left">
                Sale Price
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in editedItem.price" :key="i">
              <td>
                <v-text-field v-model="item.unit" label="Unit"></v-text-field>
              </td>
              <td>
                <v-text-field v-model="item.variant" label="Variant"></v-text-field>
              </td>
              <td>
                <v-text-field v-model="item.itemPrice" label="Sale Price"></v-text-field>
              </td>
              <td>
                <v-text-field v-model="item.salePrice" label="Item Price"></v-text-field>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-row justify="end" class="ma-4">
        <v-btn dark color="primary">Add price</v-btn>
      </v-row>
    </v-sheet>

    <v-row justify="start" class="ma-0 mt-6">
      <v-btn dark color="primary" @click="onAddItem">add</v-btn>
      <div class="ma-1"></div>
      <v-btn>clear</v-btn>
    </v-row>

    <!-- <div>
      <h1>{{ mode === 'add' ? 'Add Product' : 'Edit Product' }}</h1>
    </div> -->

  </v-container>

</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    mode: String, // 'add' or 'edit'
    userId: Number // ID of the user to edit (if in edit mode)
  },
  data() {
    return {
      items: [],
      editedItem: {
        name: "",
        description: "",
        productCode: "",
        brand: "661b7dfe5a892b0a98517b83",
        category: "661b8594530be21a8d8cbf76",
        criticalLimit: "",
        image: "https://media.istockphoto.com/id/173633236/photo/hand-saw.webp?b=1&s=170667a&w=0&k=20&c=fk-bGhRNrB-MPIvOJXcVw9QE4fyXzJfTQeleMFwVXbA=",
        price: [{
          unit: "661b8b4e707762e06fc900de",
          variant: "661ba4a1ce42007ca29cc48f"
        }]
      },
      defaultItem: {
        name: "",
        description: "",
        productCode: "",
        brand: "",
        category: "",
        criticalLimit: "",
        image: "",
        price: [{}]
      },

    }
  },
  methods: {
    ...mapActions({
      "getItems": "product/getItem",
      "addItem": "product/addItem",
      "removeItem": "product/deleteItem",
      "updateItem": "product/updateItem",
    }),
    async onAddItem() {
      // this.items.push(this.editedItem);
      await this.addItem(this.editedItem)
      // console.log(this.editedItem)
    }
  }
}
</script>
