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
            placeholder="Cari Bantuan"
          />
        </div>
        <!--end::Search-->
      </div>
      <!--begin::Card title-->
      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <!--begin::Toolbar-->
        <div
          v-if="checkeditems.length === 0"
          class="d-flex justify-content-end"
          data-kt-item-table-toolbar="base"
        >

          <!--begin::Add item-->
          <router-link :to="{ name: 'helps-create' }" class="btn btn-primary">
            <span class="svg-icon svg-icon-2">
              <inline-svg src="media/icons/duotone/Navigation/Plus.svg" />
            </span>
            Add items
          </router-link>
          <!--end::Add item-->
        </div>
        <!--end::Toolbar-->
        <!--begin::Group actions-->
        <div
          v-else
          class="d-flex justify-content-end align-items-center"
          data-kt-item-table-toolbar="selected"
        >
          <div class="fw-bolder me-5">
            <span class="me-2">{{ checkeditems.length }}</span
            >Selected
          </div>
          <button
            type="button"
            class="btn btn-danger"
            @click="deleteFewitems()"
          >
            Delete Selected
          </button>
        </div>
        <!--end::Group actions-->
        <!--begin::Group actions-->
        <div
          class="d-flex justify-content-end align-items-center d-none"
          data-kt-item-table-toolbar="selected"
        >
          <div class="fw-bolder me-5">
            <span class="me-2" data-kt-item-table-select="selected_count"></span
            >Selected
          </div>
          <button
            type="button"
            class="btn btn-danger"
            data-kt-item-table-select="delete_selected"
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
        :table-data="items"
        :table-header="tableHeader"
        :enable-items-per-page-dropdown="true"
        :key="refresh"
      >
        <template v-slot:cell-checkbox="{ row: item }">
          <div
            class="form-check form-check-sm form-check-custom form-check-solid"
          >
            <input
              class="form-check-input"
              type="checkbox"
              v-model="checkeditems"
              :value="item.id"
            />
          </div>
        </template>
        <template v-slot:cell-name="{ row: item }">
          {{ item.name }}
        </template>
        <template v-slot:cell-content="{ row: item }">
          {{ item.content }}
        </template>
        <template v-slot:cell-help_category="{ row: item }">
          {{ item.help_category.name }}
        </template>
        <template v-slot:cell-is_faq="{ row: item }">
          <p class="text-center">{{ item.is_faq }}</p>
        </template>

        <!-- <template v-slot:cell-semester="{ row: item }">
          {{ item.semester }}
        </template>
        <template v-slot:cell-lecture="{ row: item }">
          {{ item.lecture.name }}
        </template> -->

        <template v-slot:cell-actions="{ row: item }">
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
                <a class="menu-item py-3 px-3 rounded-3 dropdown-item" href="#"
                  >{{item.id}} Edit</a
                >
              </li>
            </ul>
          </div>
        </template>
      </Datatable>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, getCurrentInstance } from "vue";
import Datatable from "@/components/kt-datatable/Datatable.vue";
import { MenuComponent } from "@/assets/ts/components";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import ApiService from "@/core/services/ApiService";
import { ElMessageBox, ElMessage } from "element-plus";
// import ExportitemsModal from "@/components/modals/forms/ExportitemsModal.vue";

export default defineComponent({
  name: "helps-listing",
  components: {
    Datatable,
    // ExportitemsModal,
  },
  setup() {
    const app = getCurrentInstance();
    let refresh = ref(1);
    let loading = ref(true);
    const checkeditems = ref([]);
    const tableHeader = ref([
      {
        key: "checkbox",
      },
      {
        name: "Actions",
        key: "actions",
      },
      {
        name: "Nama",
        key: "name",
        sortable: true,
      },
      {
        name: "Isi Konten",
        key: "content",
        sortable: true,
      },
      {
        name: "FAQ",
        key: "is_faq",
        sortable: true,
      },

      // {
      //   name: "Tahun Ajaran",
      //   key: "generation",
      //   sortable: true,
      // },
      // {
      //   name: "Semester",
      //   key: "semester",
      //   sortable: true,
      // },
      // {
      //   name: "Dosen",
      //   key: "lecture",
      //   sortable: true,
      // },
    ]);
    // const inititems = ref<Array<Iitems>>([]);

    let items = ref([]);

    onMounted(async () => {
      MenuComponent.reinitialization();
      setCurrentPageBreadcrumbs("Bantuan", ["Daftar Bantuan"]);

      const response = await ApiService.get("/helps");

      items.value = response.data.data;

      loading.value = false;
      refresh.value += 1;
    });

    const deleteFewitems = () => {
      ElMessageBox.confirm(
        "Data ini akan dihapus secara permanen, apakah anda yakin ?",
        "warning",
        {
          confirmButtonText: "Ya",
          cancelButtonText: "Batal",
          type: "warning",
        }
      )
        .then(() => {
          checkeditems.value.forEach((item) => {
            deleteitems(item);
          });
          checkeditems.value.length = 0;
          return ElMessage({
            type: "success",
            message: "Berhasil hapus data",
          });
        })
        .catch(() => {
          return false;
        });
    };

    const deleteitems = async (id) => {
      loading.value = true;
      for (let i = 0; i < items.value.length; i++) {
        if (items.value[i]["id"] === id) {
          items.value.splice(i, 1);
        }
      }
      await ApiService.delete(`/helps/${id}`);
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
      items,
      tableHeader,
      deleteitems,
      search,
      searchItems,
      checkeditems,
      deleteFewitems,
      refresh, 
      loading,
    };
  },
});
</script>
