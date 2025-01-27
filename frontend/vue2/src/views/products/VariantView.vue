<!-- eslint-disable-next-line  -->
<!-- eslint-disable  -->

<template>
  <v-container fluid>
    <v-card class="mt-2">
      <v-card-title class="py-2">
        <v-row align="center" no-gutters>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="search"
              hide-details
              dense
              outlined
              placeholder="Search variants..."
              prepend-inner-icon="mdi-magnify"
              clearable
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-btn
              color="primary"
              @click="dialog = true"
              depressed
              class="ml-2"
            >
              <v-icon left>mdi-plus</v-icon>
              New Variant
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="items"
        :loading="isLoading"
        :search="search"
        :items-per-page="10"
        :footer-props="{
          'items-per-page-options': [5, 10, 25, 50],
          showFirstLastPage: true,
          'items-per-page-text': 'Variants per page',
          'page-text': '{0}-{1} of {2}',
        }"
        multi-sort
        class="elevation-0"
      >
        <template v-slot:item.name="{ item }">
          <div class="font-weight-medium">{{ item.name }}</div>
        </template>

        <template v-slot:item.values="{ item }">
          <v-chip
            v-for="value in item.values"
            :key="value"
            small
            class="mr-1 mb-1"
            color="secondary"
          >
            {{ value }}
          </v-chip>
        </template>

        <template v-slot:item.isActive="{ item }">
          <v-chip
            small
            :color="item.isActive === 'Active' ? 'success' : 'error'"
            text-color="white"
          >
            {{ item.isActive }}
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-menu offset-y left :close-on-content-click="true">
            <template v-slot:activator="{ on, attrs }">
              <v-btn small text v-bind="attrs" v-on="on" class="px-2">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list dense>
              <v-list-item
                v-for="action in actions"
                :key="action.title"
                @click="handleAction(action.title, item)"
              >
                <v-list-item-icon class="mr-2">
                  <v-icon small :color="action.color">
                    {{ action.icon }}
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ action.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>

        <template v-slot:no-data>
          <v-alert type="info" class="ma-4" outlined>
            No variants found.
          </v-alert>
        </template>

        <template v-slot:progress>
          <v-overlay absolute color="white">
            <v-progress-circular indeterminate size="64" />
          </v-overlay>
        </template>
      </v-data-table>
    </v-card>

    <!-- Add/Edit Dialog -->
    <v-dialog v-model="dialog" max-width="500px" persistent>
      <v-card>
        <v-card-title class="headline">{{ formTitle }}</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="editedItem.name"
            label="Variant Name"
            outlined
            dense
            hide-details="auto"
            class="mb-4"
          ></v-text-field>

          <v-combobox
            v-model="editedItem.values"
            chips
            clearable
            label="Enter variant items"
            multiple
            outlined
            dense
            hide-details="auto"
            class="mb-4"
          >
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip
                v-bind="attrs"
                :input-value="selected"
                close
                small
                @click="select"
                @click:close="remove(item)"
              >
                <strong>{{ item }}</strong>
              </v-chip>
            </template>
          </v-combobox>

          <!-- <v-select
            v-model="editedItem.isActive"
            :items="status"
            label="Status"
            outlined
            dense
            hide-details="auto"
          ></v-select> -->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="close">Cancel</v-btn>
          <v-btn color="primary" text @click="save" :loading="isLoading">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Dialog -->
    <v-dialog v-model="dialogDelete" max-width="400" persistent>
      <v-card>
        <v-card-title class="headline">Confirm Delete</v-card-title>
        <v-card-text>
          Are you sure you want to delete this variant? This action cannot be
          undone.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeDelete">Cancel</v-btn>
          <v-btn
            color="error"
            text
            @click="deleteItemConfirm"
            :loading="isLoading"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
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
      // {
      //   text: "Status",
      //   align: "start",
      //   sortable: false,
      //   value: "isActive",
      // },
      { text: "Actions", value: "actions", sortable: false, align: "end" },
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
    search: "",
    isLoading: false,
    actions: [
      {
        title: "Edit",
        icon: "mdi-pencil",
        color: "primary",
      },
      {
        title: "Delete",
        icon: "mdi-delete",
        color: "error",
      },
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
      this.isLoading = true;
      const response = await this.getItems();
      this.items = response.result.map((item) => ({
        ...item,
        isActive: item.isActive ? "Active" : "Disable",
      }));
      this.isLoading = false;
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

    handleAction(action, item) {
      switch (action) {
        case "Edit":
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

<style lang="scss" scoped>
.v-data-table {
  &::v-deep {
    .v-data-table__wrapper {
      table {
        thead {
          tr {
            th {
              font-weight: 600;
              text-transform: uppercase;
              font-size: 0.875rem;
              white-space: nowrap;
            }
          }
        }
        tbody {
          tr {
            td {
              font-size: 0.875rem;
              color: rgba(0, 0, 0, 0.87);
            }
            &:hover {
              background-color: #f5f5f5 !important;
            }
          }
        }
      }
    }
  }
}

.v-card {
  border-radius: 8px;

  .v-card__title {
    border-bottom: 1px solid #e0e0e0;
  }
}
</style>
