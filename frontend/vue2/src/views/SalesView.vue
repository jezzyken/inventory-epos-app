<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Sale</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.referenceCode"
                      label="Brand Name"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
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

    <template v-slot:[`item.hasDelivery`]="{ item }">
      <v-chip dark color="success" small class="mr-1">
        {{ item.hasDelivery ? 'Yes' : 'No' }}
      </v-chip>
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-btn x-small color="primary" @click="onViewItem(item._id)">
        view
      </v-btn>

      <span class="mr-1"></span>

      <v-btn x-small color="error" dark @click="deleteItem(item)">
        delete
      </v-btn>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
/*eslint-disable*/
import { mapActions } from "vuex";

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Reference Code",
        align: "start",
        sortable: false,
        value: "referenceCode",
      },
      {
        text: "Payment Type",
        align: "start",
        sortable: false,
        value: "paymentType",
      },
      {
        text: "Sales",
        align: "start",
        sortable: false,
        value: "totalSalesAmount",
      },
      {
        text: "Paid Amount",
        align: "start",
        sortable: false,
        value: "paidAmount",
      },
      {
        text: "Change",
        align: "start",
        sortable: false,
        value: "change",
      },
      {
        text: "Total Items",
        align: "start",
        sortable: false,
        value: "totalItems",
      },
      {
        text: "Delivery",
        align: "start",
        sortable: false,
        value: "hasDelivery",
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
      getItems: "sale/getItem",
      addItem: "sale/addItem",
      removeItem: "sale/deleteItem",
      updateItem: "sale/updateItem",
    }),

    async initialize() {
      const results = await this.getItems();
      this.desserts = results.result;
    },

    onViewItem(id) {
      this.$router.push({ name: "Sales Item", query: { id: id } });
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
  },
};
</script>
