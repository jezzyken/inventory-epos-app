<!-- eslint-disable-next-line  -->
<!-- eslint-disable  -->

<template>
  <v-container fluid>
    <ViewDeliveryDialog
      ref="product"
      :items="selectedItems"
      @get-items="initialize"
    />
    <v-card class="mt-2">
      <v-card-title class="py-2">
        <v-row align="center" no-gutters>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="search"
              hide-details
              dense
              outlined
              placeholder="Search deliveries..."
              prepend-inner-icon="mdi-magnify"
              clearable
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
          <!-- <v-col cols="auto">
            <v-btn color="primary" depressed class="ml-2">
              <v-icon left>mdi-plus</v-icon>
              New Delivery
            </v-btn>
          </v-col> -->
        </v-row>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="desserts"
        :loading="isLoading"
        :search="search"
        :items-per-page="10"
        :footer-props="{
          'items-per-page-options': [5, 10, 25, 50],
          showFirstLastPage: true,
          'items-per-page-text': 'Deliveries per page',
          'page-text': '{0}-{1} of {2}',
        }"
        multi-sort
        class="elevation-0"
      >
        <template v-slot:item.deliveryDate="{ item }">
          <div class="font-weight-medium">{{ item.deliveryDate }}</div>
        </template>

        <template v-slot:item.status="{ item }">
          <v-chip
            small
            :color="
              item.status === 'delivered'
                ? 'light-green darken-1'
                : 'amber darken-1'
            "
            text-color="white"
            class="text-uppercase"
          >
            {{ item.status }}
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
            No deliveries found.
          </v-alert>
        </template>

        <template v-slot:progress>
          <v-overlay absolute color="white">
            <v-progress-circular indeterminate size="64" />
          </v-overlay>
        </template>
      </v-data-table>
    </v-card>

    <!-- Delete Dialog -->
    <v-dialog v-model="dialogDelete" max-width="400" persistent>
      <v-card>
        <v-card-title class="headline">Confirm Delete</v-card-title>
        <v-card-text>
          Are you sure you want to delete this delivery? This action cannot be
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
import ViewDeliveryDialog from "@/components/products/ViewDeliveryDialog.vue";
import moment from "moment";

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
      { text: "Actions", value: "actions", sortable: false, align: "end" },
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
    actions: [
      {
        title: "View",
        icon: "mdi-eye",
        color: "primary",
      },
      {
        title: "Delete",
        icon: "mdi-delete",
        color: "error",
      },
    ],
    isLoading: false,
    search: "",
    saleDetails: null,
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
      console.log(results);
      this.desserts = results.result.map((item) => ({
        ...item,
        deliveryDate: moment(item.deliveryDate).format("YYYY-MM-DD"),
      }));
    },

    editItem(item) {
      console.log(item);
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
