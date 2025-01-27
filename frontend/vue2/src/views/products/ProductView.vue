<!-- eslint-disable-next-line  -->
<!-- eslint-disable  -->
<template>
  <v-container fluid>
    <ViewProductDialogVue ref="product" :items="selectedItems" />

    <!-- <pre>{{ items }}</pre> -->

    <ExportDialog ref="exportDialog" :table-data="items" @success="showSnackbar" @error="showSnackbar" />

    <PrintDialog ref="printDialog" :table-data="items" @success="showSnackbar" @error="showSnackbar" />

    <v-card class="mt-2">
      <v-card-title class="py-2">
        <v-row align="center" no-gutters>
          <v-col cols="12" sm="4">
            <v-text-field v-model="search" hide-details dense outlined placeholder="Search products..."
              prepend-inner-icon="mdi-magnify" clearable>
              <!-- <template v-slot:append>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                      <v-icon>mdi-filter-variant</v-icon>
                    </v-btn>
                  </template>
<v-list dense>
  <v-list-item>
    <v-list-item-title>Filter options</v-list-item-title>
  </v-list-item>
</v-list>
</v-menu>
</template> -->
            </v-text-field>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-btn color="primary" class="ml-2" :to="{ name: 'AddProduct' }" depressed>
              <v-icon left>mdi-plus</v-icon>
              New Product
            </v-btn>
            <v-btn color="secondary" class="ml-2" outlined @click="exportData">
              <v-icon left>mdi-file-export</v-icon>
              Export
            </v-btn>
            <v-btn color="secondary" class="ml-2" outlined @click="printData">
              <v-icon left>mdi-printer</v-icon>
              Print
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>

      <v-data-table :headers="headers" :items="items" :loading="isLoading" :search="search" :items-per-page="10"
        :footer-props="{
          'items-per-page-options': [5, 10, 25, 50],
          showFirstLastPage: true,
          'items-per-page-text': 'Products per page',
          'page-text': '{0}-{1} of {2}',
        }" multi-sort class="elevation-0">
        <template v-slot:item.image="{ item }">
          <v-avatar size="48" rounded>
            <v-img :src="item.image" :lazy-src="item.image" aspect-ratio="1">
              <template v-slot:placeholder>
                <v-row align="center" justify="center" class="fill-height">
                  <v-progress-circular indeterminate color="grey lighten-2" />
                </v-row>
              </template>
            </v-img>
          </v-avatar>
        </template>

        <template v-slot:item.availableStocks="{ item }">
          <v-chip :color="getStockColor(item.availableStocks)" small label>
            {{ item.availableStocks }}
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
              <v-list-item v-for="action in actions" :key="action.title" @click="handleAction(action.title, item)">
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
            No products found.
          </v-alert>
        </template>

        <template v-slot:progress>
          <v-overlay absolute color="white">
            <v-progress-circular indeterminate size="64" />
          </v-overlay>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialogDelete" max-width="400" persistent>
      <v-card>
        <v-card-title class="headline"> Confirm Delete </v-card-title>
        <v-card-text>
          Are you sure you want to delete this product? This action cannot be
          undone.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeDelete"> Cancel </v-btn>
          <v-btn color="error" text @click="deleteItemConfirm" :loading="isDeleting">
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
import ViewProductDialogVue from "@/components/products/ViewProductDialog.vue";
import ExportDialog from "@/components/ExportDialog.vue";
import PrintDialog from "@/components/PrintDialog.vue";
export default {
  components: {
    ViewProductDialogVue,
    ExportDialog,
    PrintDialog,
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Product",
        align: "start",
        value: "image",
        width: "80",
      },
      {
        text: "Product Code",
        value: "productCode",
        sortable: true,
      },
      {
        text: "Name",
        value: "name",
        sortable: true,
      },
      {
        text: "Brand",
        value: "brand.name",
        sortable: true,
      },
      {
        text: "Category",
        value: "category.name",
        sortable: true,
      },
      {
        text: "Stock",
        value: "availableStocks",
        align: "center",
        width: "100",
      },
      {
        text: "Type",
        value: "type",
        sortable: true,
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        align: "end",
        width: "100",
      },
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
    search: "",
    isDeleting: false,
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
    console.log(JSON.parse(localStorage.getItem("user")));

    this.initialize();
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
      this.items = results.result;
      this.isLoading = false;
    },

    getStockColor(stock) {
      if (stock <= 0) return "error";
      if (stock <= 10) return "warning";
      return "success";
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
      try {
        this.isDeleting = true;
        await this.removeItem(this.itemId);
        this.items.splice(this.editedIndex, 1);
        this.$emit("snackbar", {
          text: "Product deleted successfully",
          color: "success",
        });
      } catch (error) {
        this.$emit("snackbar", {
          text: "Error deleting product",
          color: "error",
        });
      } finally {
        this.isDeleting = false;
        this.closeDelete();
      }
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
    exportData() {
      this.$refs.exportDialog.show();
    },

    printData() {
      this.$refs.printDialog.show();
    },

    showSnackbar(message, color = "success") {
      this.$emit("snackbar", {
        text: message,
        color: color,
      });
    },
  },
  watch: {
    items(val) {
      return val;
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
