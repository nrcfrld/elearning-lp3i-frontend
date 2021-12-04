<template>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title">
        <!--begin::Search-->
        <div class="d-flex align-items-center position-relative my-1">
          <span class="svg-icon svg-icon-1 position-absolute ms-6">
            <inline-svg src="media/icons/duotune/general/gen021.svg" />
          </span>
          <input
            type="text"
            v-model="search"
            @input="searchItems()"
            class="form-control form-control-solid w-250px ps-15"
            placeholder="Cari Pengguna"
          />
        </div>
        <!--end::Search-->
      </div>
      <!--begin::Card title-->
      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <!--begin::Toolbar-->
        <div
          v-if="checkedUsers.length === 0"
          class="d-flex justify-content-end"
          data-kt-user-table-toolbar="base"
        >
          <!--begin::Import-->
          <button
            type="button"
            class="btn btn-light-primary me-3"
            data-bs-toggle="modal"
            data-bs-target="#kt_users_export_modal"
          >
            <span class="svg-icon svg-icon-2">
              <inline-svg src="media/icons/duotune/arrows/arr078.svg" />
            </span>
            Import
          </button>
          <!--end::Import-->

          <!--begin::Add user-->
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_add_user"
          >
            <span class="svg-icon svg-icon-2">
              <inline-svg src="media/icons/duotone/Navigation/Plus.svg" />
            </span>
            Add User
          </button>
          <!--end::Add user-->
        </div>
        <!--end::Toolbar-->
        <!--begin::Group actions-->
        <div
          v-else
          class="d-flex justify-content-end align-items-center"
          data-kt-user-table-toolbar="selected"
        >
          <div class="fw-bolder me-5">
            <span class="me-2">{{ checkedUsers.length }}</span
            >Selected
          </div>
          <button
            type="button"
            class="btn btn-danger"
            @click="deleteFewUsers()"
          >
            Delete Selected
          </button>
        </div>
        <!--end::Group actions-->
        <!--begin::Group actions-->
        <div
          class="d-flex justify-content-end align-items-center d-none"
          data-kt-user-table-toolbar="selected"
        >
          <div class="fw-bolder me-5">
            <span class="me-2" data-kt-user-table-select="selected_count"></span
            >Selected
          </div>
          <button
            type="button"
            class="btn btn-danger"
            data-kt-user-table-select="delete_selected"
          >
            Delete Selected
          </button>
        </div>
        <!--end::Group actions-->
      </div>
      <!--end::Card toolbar-->
    </div>
    <div class="card-body pt-0">
      <Datatable
        :loading="loading"
        :table-data="users"
        :table-header="tableHeader"
        :enable-items-per-page-dropdown="true"
        :key="refresh"
      >
        <template v-slot:cell-checkbox="{ row: user }">
          <div
            class="form-check form-check-sm form-check-custom form-check-solid"
          >
            <input
              class="form-check-input"
              type="checkbox"
              v-model="checkedUsers"
              :value="user.id"
            />
          </div>
        </template>
        <template v-slot:cell-identity_number="{ row: user }">
          {{ user.identity_number }}
        </template>
        <template v-slot:cell-name="{ row: user }">
          {{ user.name }}
        </template>
        <template v-slot:cell-email="{ row: user }">
          <a href="#" class="text-gray-600 text-hover-primary mb-1">
            {{ user.email }}
          </a>
        </template>
        <template v-slot:cell-role="{ row: user }">
          {{ user.role.name }}
        </template>
        <template v-slot:cell-created_at="{ row: user }">
          {{ user.created_at }}
        </template>
        <template v-slot:cell-actions="{ row: user }">
          <div class="btn-group">
            <button
              type="button"
              class="
                btn
                dropdown-toggle
                btn-sm btn-light btn-active-light-primary
              "
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Action
            </button>
            <ul
              class="
                dropdown-menu
                menu
                menu-sub
                menu-sub-dropdown
                menu-column
                menu-rounded
                menu-gray-600
                menu-state-bg-light-primary
                fw-bold
                fs-7
                py-4
              "
            >
              <li class="px-3">
                <router-link
                  class="menu-item py-3 px-3 rounded-3 dropdown-item"
                  :to="{
                    name: 'user-detail',
                    params: {
                      id: user.id,
                    },
                  }"
                  >View</router-link
                >
              </li>
              <li class="px-3">
                <a class="menu-item py-3 px-3 rounded-3 dropdown-item" href="#"
                  >Edit</a
                >
              </li>
            </ul>
          </div>
        </template>
      </Datatable>
    </div>
  </div>

  <ExportUserModal></ExportUserModal>
  <AddUserModal></AddUserModal>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import Datatable from "@/components/kt-datatable/Datatable.vue";
import ExportUserModal from "@/components/modals/forms/ExportUserModal.vue";
import AddUserModal from "@/components/modals/forms/AddUserModal.vue";
import { MenuComponent } from "@/assets/ts/components";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import ApiService from "@/core/services/ApiService";

export default defineComponent({
  name: "users-listing",
  components: {
    Datatable,
    ExportUserModal,
    AddUserModal,
  },
  setup() {
    let refresh = ref(1);
    let loading = ref(true);
    const checkedUsers = ref([]);
    const tableHeader = ref([
      {
        key: "checkbox",
      },
      {
        name: "Actions",
        key: "actions",
      },
      {
        name: "Nomor Identitas",
        key: "identity_number",
        sortable: true,
        label: "identityNumber",
      },
      {
        name: "Nama",
        key: "name",
        sortable: true,
      },
      {
        name: "Email",
        key: "email",
        sortable: true,
      },
      {
        name: "role",
        key: "role",
        sortable: true,
        sortingField: "role.name",
      },
      {
        name: "Created Date",
        key: "created_at",
        sortable: true,
      },
    ]);
    // const initUsers = ref<Array<IUser>>([]);

    let users = ref([]);

    onMounted(async () => {
      MenuComponent.reinitialization();

      const response = await ApiService.get("/users");

      users.value = response.data.data;

      setCurrentPageBreadcrumbs("Daftar Pengguna", ["Users"]);
      loading.value = false;
      refresh.value += 1;
    });

    const deleteFewUsers = () => {
      checkedUsers.value.forEach((item) => {
        deleteUser(item);
      });
      checkedUsers.value.length = 0;
    };

    const deleteUser = async (id) => {
      loading.value = true;
      for (let i = 0; i < users.value.length; i++) {
        if (users.value[i]["id"] === id) {
          users.value.splice(i, 1);
        }
      }
      await ApiService.delete(`/users/${id}`);
    };

    const search = ref<string>("");
    const searchItems = () => {
      //
    };

    const searchingFunc = (obj, value): boolean => {
      // for (let key in obj) {
      //   if (!Number.isInteger(obj[key]) && !(typeof obj[key] === "object")) {
      //     if (obj[key].indexOf(value) != -1) {
      //       return true;
      //     }
      //   }
      // }
      return false;
    };

    return {
      users,
      tableHeader,
      deleteUser,
      search,
      searchItems,
      checkedUsers,
      deleteFewUsers,
      refresh,
      loading,
    };
  },
});
</script>
