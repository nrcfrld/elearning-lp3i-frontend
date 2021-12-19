<template>
  <div class="my-5">
    <!--begin::Add user-->
    <div class="d-flex justify-content-end">
      <el-button type="primary" @click="dialogVisible = true"
        >Tambah Peserta Kuliah</el-button
      >
    </div>

    <el-dialog
      v-model="dialogVisible"
      title="Tambah Peserta Kuliah"
      width="40%"
    >
      <el-form :model="formData" :rules="rules" ref="formRef">
        <div class="fv-row mb-7">
          <!--begin::Label-->
          <label class="required fs-6 fw-bold mb-2">Mahasiswa</label>
          <!--end::Label-->

          <!--begin::Input-->
          <el-form-item prop="user_id">
            <el-select
              filterable
              class="w-100"
              v-model="formData.user_id"
              placeholder="Pilih Kelas"
            >
              <el-option
                v-for="user in users"
                :key="user.id"
                :label="user.label"
                :value="user.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <!--end::Input-->
        </div>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="submit">Submit</el-button>
        </span>
      </template>
    </el-dialog>
    <!--end::Add user-->

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
        {{ item.user.name }}
      </template>
      <template v-slot:cell-identity_number="{ row: item }">
        <p class="text-center">{{ item.user.identity_number }}</p>
      </template>
    </Datatable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import Datatable from "@/components/kt-datatable/Datatable.vue";
import ApiService from "@/core/services/ApiService";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { AxiosRequestConfig } from "axios";

export default defineComponent({
  name: "subject-participant",
  props: ["subjectId"],
  components: {
    Datatable,
  },
  setup(props) {
    let refresh = ref(1);
    let loading = ref(true);
    let formRef = ref<null | HTMLFormElement>(null);
    let dialogVisible = ref(false);
    const checkeditems = ref([]);
    const tableHeader = ref([
      {
        key: "checkbox",
      },
      {
        name: "Nama",
        key: "name",
        sortable: true,
      },
      {
        name: "NIM",
        key: "identity_number",
        sortable: true,
      },
    ]);
    const formData = ref({
      subject_id: props.subjectId,
      user_id: null,
    });

    let items = ref([]);
    const rules = ref({
      user_id: [
        {
          required: true,
          message: "Field ini diperlukan",
          trigger: "change",
        },
      ],
    });

    let users = ref([]);

    onMounted(async () => {
      loadParticipants();

      const responseUser = await ApiService.get("/users", "", {
        params: {
          role: "mahasiswa",
        },
      });

      users.value = responseUser.data.data;
    });

    const loadParticipants = async () => {
      const response = await ApiService.get("/subject-participants", "", {
        params: {
          subject_id: props.subjectId,
        },
      });

      items.value = response.data.data;

      loading.value = false;
      refresh.value += 1;
    };

    const submit = async () => {
      if (!formRef.value) {
        return;
      }

      formRef.value.validate(async (valid) => {
        if (valid) {
          loading.value = true;

          const postResponse = await ApiService.post(
            "/subject-participants",
            formData.value as AxiosRequestConfig
          );
          loading.value = false;

          if (postResponse.status == 201) {
            dialogVisible.value = false;
            Swal.fire({
              text: "Berhasil menambahkan!",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
                confirmButton: "btn btn-primary",
              },
            }).then(() => {
              loadParticipants();
            });
          } else {
            loading.value = false;
            Swal.fire({
              text: "Sorry, looks like there are some errors detected, please try again.",
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
                confirmButton: "btn btn-primary",
              },
            });
            return false;
          }
        } else {
          return false;
        }
      });
    };

    return {
      items,
      tableHeader,
      refresh,
      loading,
      checkeditems,
      dialogVisible,
      rules,
      formData,
      users,
      submit,
      formRef,
    };
  },
});
</script>

<style scoped></style>
