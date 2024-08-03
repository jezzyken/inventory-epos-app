<template>
  <v-container>
    <ViewDeliveryDialog
      ref="product"
      :items="selectedItems"
      @get-items="initialize"
    />
    <v-data-table
      :headers="headers"
      :items="desserts"
      :loading="isLoading"
      class="elevation-1 mt-4"
      :search="search"
    >
      <template v-slot:[`item.status`]="{ item }">
        <v-chip
          dark
          label
          :color="
            item.status === 'delivered'
              ? 'light-green darken-1'
              : 'amber darken-1'
          "
          small
          class="mr-1 text-uppercase"
        >
          {{ item.status }}
        </v-chip>
      </template>

      <template v-slot:top>
        <v-toolbar flat>
          <div style="width: 400px">
            <v-text-field
              v-model="search"
              filled
              rounded
              dense
              hide-details
              placeholder="Search"
              append-icon="mdi-filter-variant"
            ></v-text-field>
          </div>
          <v-spacer></v-spacer>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
              small
            >
              new
            </v-btn>
          </template>
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
import ViewDeliveryDialog from "@/components/products/ViewDeliveryDialog.vue";

export default {
  components: {
    ViewDeliveryDialog,
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Date",
        align: "start",
        sortable: false,
        value: "deliveryDate",
      },
      {
        text: "Recipient",
        align: "start",
        sortable: false,
        value: "recipientName",
      },
      {
        text: "Contact No",
        align: "start",
        sortable: false,
        value: "contactNo",
      },
      {
        text: "Address",
        align: "start",
        sortable: false,
        value: "address",
      },
      {
        text: "Notes",
        align: "start",
        sortable: false,
        value: "notes",
      },
      {
        text: "Status",
        align: "start",
        sortable: false,
        value: "status",
      },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
    },
    defaultItem: {
      name: "",
    },
    itemId: null,
    selectedItems: {},
    actions: [{ title: "View" }, { title: "Delete" }],
    isLoading: false,
    search: "",
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

  created() {
    this.initialize();
  },

  methods: {
    ...mapActions({
      getItems: "delivery/getItem",
      addItem: "delivery/addItem",
      removeItem: "delivery/deleteItem",
      updateItem: "delivery/updateItem",
    }),

    async initialize() {
      const results = await this.getItems();
      this.desserts = results.result;
      console.log("clicked me");
    },

    editItem(item) {
      this.$refs.product.showDialog(true, item);
      this.selectedItems = item;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.itemId = item._id;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      await this.removeItem(this.itemId);
      this.desserts.splice(this.editedIndex, 1);
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
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
        await this.updateItem(this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
        await this.addItem(this.editedItem);
      }
      this.close();
    },

    handleAction(action, item) {
      switch (action) {
        case "View":
          this.editItem(item);
          break;
        case "Delete":
          this.deleteItem(item);
          break;
        default:
          break;
      }
    },
  },
};
</script>
