<template>
  <v-container>
    <v-data-table :headers="headers" :items="items" class="elevation-1 mt-n2" :loading="isLoading" :search="search">
      <template v-slot:top>
        <v-toolbar flat>
          <div style="width: 400px">
            <v-text-field v-model="search" filled rounded dense hide-details placeholder="Search"
              append-icon="mdi-filter-variant"></v-text-field>
          </div>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" small v-bind="attrs" v-on="on">
                new
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
                      <v-text-field v-model="editedItem.fname" label="First Name" outlined required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="editedItem.mname" label="Middle Name" outlined></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="editedItem.lname" label="Last Name" outlined required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="editedItem.email" label="Email" type="email" outlined
                        required></v-text-field>
                    </v-col>
                    <v-col cols="12" v-if="editedIndex === -1">
                      <v-text-field v-model="editedItem.password" label="Password" type="password" outlined
                        required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-select v-model="editedItem.role" :items="roles" label="Role" outlined></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-select v-model="editedItem.status" :items="statusOptions" label="Status" outlined></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">
                Are you sure you want to delete this item?
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">
                  OK
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-menu bottom left>
          <template v-slot:activator="{ attrs, on }">
            <v-btn v-bind="attrs" v-on="on" class="white--text pa-3" x-small color="blue-grey">
              options <v-icon right dark>mdi-chevron-down</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(action, i) in actions" :key="i" @click="handleAction(action.title, item)">
              <v-list-item-title>{{ action.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>

      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
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
        text: "Full Name",
        align: "start",
        sortable: true,
        value: "fullName",
      },
      {
        text: "Email",
        align: "start",
        sortable: true,
        value: "email",
      },
      {
        text: "Role",
        align: "start",
        sortable: true,
        value: "role",
      },
      {
        text: "Status",
        align: "start",
        sortable: true,
        value: "status",
      },
      { text: "Actions", value: "actions", sortable: false },
    ],
    items: [],
    editedIndex: -1,
    editedItem: {
      fname: "",
      mname: "",
      lname: "",
      email: "",
      password: "",
      role: "Cashier",
      status: "active",
    },
    defaultItem: {
      fname: "",
      mname: "",
      lname: "",
      email: "",
      password: "",
      role: "Cashier",
      status: "active",
    },
    itemId: null,
    roles: ["Admin", "Cashier"],
    statusOptions: ["active", "inactive"],
    search: "",
    isLoading: false,
    actions: [{ title: "Edit" }, { title: "Delete" }],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New User" : "Edit User";
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
      getUsers: "user/getUsers",
      addUser: "user/addUser",
      removeUser: "user/deleteUser",
      updateUser: "user/updateUser",
    }),

    async initialize() {
      this.isLoading = true;
      try {
        const response = await this.getUsers();
        this.items = response.result;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
      this.isLoading = false;
    },

    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      // Remove password from edit form
      delete this.editedItem.password;
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
        await this.removeUser(this.itemId);
        this.items.splice(this.editedIndex, 1);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
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
      try {
        if (this.editedIndex > -1) {
          const { _id, ...updateData } = this.editedItem;
          await this.updateUser({ id: _id, data: updateData });
          Object.assign(this.items[this.editedIndex], this.editedItem);
        } else {
          const response = await this.addUser(this.editedItem);
          this.items.push(response.result);
        }
        this.close();
      } catch (error) {
        console.error("Error saving user:", error);
      }
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