<template>
  <v-container>
    <ViewProductDialogVue ref="product" :items="selectedItems" />

    <v-data-table
      :headers="headers"
      :items="items"
      :loading="isLoading"
      sort-by="calories"
      class="elevation-1 mt-4"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <div style="width: 400px">
            <v-text-field
              filled
              rounded
              dense
              hide-details
              placeholder="Search"
              append-icon="mdi-filter-variant"
              @click:append="testToggle"
            ></v-text-field>
          </div>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{}">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                :to="{ name: 'AddProduct' }"
                small
              >
                new
              </v-btn>
              <v-btn color="primary" dark class="mb-2 mr-1" small>
                export
                <v-icon right dark> mdi-export </v-icon>
              </v-btn>
              <v-btn color="primary" dark class="mb-2 mr-1" small>
                print
                <v-icon right dark> mdi-printer </v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Name"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.company"
                        label="Company"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.email"
                        label="Email"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.contactNo"
                        label="Contact No"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.address"
                        label="Address"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:[`item.image`]="{ item }">
        <div class="ma-1">
          <v-img
            :lazy-src="item.image"
            max-height="50"
            max-width="50"
            :src="item.image"
          ></v-img>
        </div>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-menu bottom left>
          <template v-slot:activator="{ attrs, on }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              class="white--text pa-3"
              x-small
              color="blue-grey"
            >
              options <v-icon right dark> mdi-chevron-down </v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(action, i) in actions"
              :key="i"
              @click="handleAction(action.title, item)"
            >
              <v-list-item-title>{{ action.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
/*eslint-disable*/
import { mapActions } from "vuex";
import ViewProductDialogVue from "@/components/products/ViewProductDialog.vue";

export default {
  components: {
    ViewProductDialogVue,
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Image",
        align: "start",
        sortable: false,
        value: "image",
      },
      {
        text: "Product Code",
        align: "start",
        sortable: false,
        value: "productCode",
      },
      {
        text: "Name",
        align: "start",
        value: "name",
      },
      {
        text: "Description",
        align: "start",
        value: "description",
      },
      {
        text: "Brand",
        align: "start",
        value: "brand.name",
      },
      {
        text: "Category",
        align: "start",
        value: "category.name",
      },
      {
        text: "Type",
        align: "start",
        value: "type",
      },
      // {
      //   text: "Quantity",
      //   align: "start",
      //   value: "stocksQuantity",
      // },
      { text: "Actions", value: "actions", sortable: false },
    ],
    items: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      company: "",
      email: "",
      contactNo: "",
      address: "",
    },
    defaultItem: {
      name: "",
      company: "",
      email: "",
      contactNo: "",
      address: "",
    },
    itemId: null,
    isLoading: false,
    showFuck: false,
    selectedItems: {},
    actions: [
      { title: "View" },
      { title: "Product History" },
      { title: "Edit" },
      { title: "Delete" },
    ],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  async created() {
    await this.initialize();
  },
  methods: {
    ...mapActions({
      getItems: "product/getItem",
      addItem: "product/addItem",
      removeItem: "product/deleteItem",
      updateItem: "product/updateItem",
    }),

    async initialize() {
      this.isLoading = true;
      const results = await this.getItems();
      console.log(results);
      this.items = results.result;
      this.isLoading = false;
    },

    onViewDialog(item) {
      this.$refs.product.showDialog(true, item);
      this.selectedItems = item;
    },

    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.itemId = item._id;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      await this.removeItem(this.itemId);
      this.items.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem);
        await this.updateItem(this.editedItem);
      } else {
        this.items.push(this.editedItem);
        await this.addItem(this.editedItem);
      }
      this.close();
    },

    handleAction(action, item) {
      switch (action) {
        case "View":
          this.onViewDialog(item);
          break;
        case "Edit":
          this.$router.push({ name: "EditProduct", params: { id: item._id } });
          break;
        case "Delete":
          this.deleteItem(item);
          break;
        default:
          break;
      }
    },

    testToggle() {
      console.log("testing toggle");
    },
  },
  watch: {
    items(val) {
      return val;
    },
  },
};
</script>
