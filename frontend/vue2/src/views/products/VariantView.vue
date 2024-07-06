<template>
  <div>
    <v-data-table :headers="headers" :items="items" sort-by="calories" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Variants</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Add
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
                      <v-text-field v-model="editedItem.name" label="Variant Name" outlined></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-combobox v-model="editedItem.values" chips clearable label="Enter variant items" multiple
                        outlined>
                        <template v-slot:selection="{ attrs, item, select, selected }">
                          <v-chip v-bind="attrs" :input-value="selected" close @click="select"
                            @click:close="remove(item)">
                            <strong>{{ item }}</strong>
                          </v-chip>
                        </template>
                      </v-combobox>

                      <!-- <v-text-field v-model="editedItem.name" label="Items"></v-text-field> -->
                    </v-col>
                    <v-col cols="12">
                      <v-select v-model="editedItem.isActive" :items="status" label="Status" outlined></v-select>
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
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-btn x-small color="warning" @click="editItem(item)"> edit </v-btn>

        <span class="mr-1"></span>

        <v-btn x-small color="error" dark @click="deleteItem(item)">
          delete
        </v-btn>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
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
        text: "Variants",
        align: "start",
        sortable: false,
        value: "name",
      },
      {
        text: "Value Types",
        align: "start",
        sortable: false,
        value: "values",
      },
      {
        text: "Status",
        align: "start",
        sortable: false,
        value: "isActive",
      },
      { text: "Actions", value: "actions", sortable: false },
    ],
    items: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      isActive: "",
      values: [],
    },
    defaultItem: {
      name: "",
      isActive: "",
      values: [],
    },
    itemId: null,
    status: ["Active", "Disable"],
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
      getItems: "variant/getItem",
      addItem: "variant/addItem",
      removeItem: "variant/deleteItem",
      updateItem: "variant/updateItem",
    }),

    async initialize() {
      const response = await this.getItems();
      this.items = response.result.map((item) => ({
        ...item,
        isActive: item.isActive ? "Active" : "Disable",
      }));

      console.log(response.result);
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
      this.editedItem = {
        ...this.editedItem,
        isActive: this.checkStatus(this.editedItem.isActive),
      };

      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], {
          ...this.editedItem,
          isActive: this.editedItem.isActive ? "Active" : "Disable",
        });
        await this.updateItem(this.editedItem);
      } else {
        this.items.push(this.editedItem);
        await this.addItem(this.editedItem);
      }
      this.close();
    },

    checkStatus() {
      let status = true;

      switch (this.editedItem.isActive) {
        case "Active":
          status = true;
          break;
        case "Disable":
          status = false;
          break;
        default:
          status = true;
          break;
      }

      return status;
    },

    remove(item) {
      let values = [...this.editedItem.values];

      values.splice(values.indexOf(item), 1);

      this.editedItem.values = values;
    },
  },
};
</script>
