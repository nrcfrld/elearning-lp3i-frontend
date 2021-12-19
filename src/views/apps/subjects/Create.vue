<template>
  <div class="card">
    <div class="card-body">
      <!--begin::Form-->
      <el-form
        @submit.prevent="submit()"
        :model="formData"
        :rules="rules"
        ref="formRef"
      >
        <!--begin::Input group-->
        <div class="row">
          <div class="col-md-6">
            <!--begin::Label-->
            <label class="required fs-6 fw-bold mb-2">Nama Matakuliah</label>
            <!--end::Label-->

            <!--begin::Input-->
            <el-form-item prop="name">
              <el-input v-model="formData.name" type="text" placeholder="" />
            </el-form-item>
            <!--end::Input-->
          </div>
          <div class="col-md-6">
            <!--begin::Label-->
            <label class="required fs-6 fw-bold mb-2">Kode Matakuliah</label>
            <!--end::Label-->

            <!--begin::Input-->
            <el-form-item prop="name">
              <el-input v-model="formData.code" type="text" placeholder="" />
            </el-form-item>
            <!--end::Input-->
          </div>
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row">
          <div class="col-md-6">
            <!--begin::Label-->
            <label class="required fs-6 fw-bold mb-2">Angkatan</label>
            <!--end::Label-->

            <!--begin::Input-->
            <el-form-item prop="generation">
              <el-date-picker
                class="w-100"
                v-model="formData.generation"
                type="year"
                placeholder="Tahun Angkatan"
                value-format="YYYY"
              >
              </el-date-picker>
            </el-form-item>
            <!--end::Input-->
          </div>
          <div class="col-md-6">
            <!--begin::Label-->
            <label class="required fs-6 fw-bold mb-2">Kampus</label>
            <!--end::Label-->

            <!--begin::Input-->
            <el-form-item prop="campus_id">
              <el-select
                filterable
                class="w-100"
                v-model="formData.campus_id"
                placeholder="Pilih Kampus"
              >
                <el-option
                  v-for="campus in campuses"
                  :key="campus.id"
                  :label="campus.name"
                  :value="campus.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <!--end::Input-->
          </div>
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row">
          <div class="col-md-6">
            <!--begin::Label-->
            <label class="required fs-6 fw-bold mb-2">Semester</label>
            <!--end::Label-->

            <!--begin::Input-->
            <el-form-item prop="semester">
              <el-input
                v-model="formData.semester"
                type="text"
                placeholder=""
              />
            </el-form-item>
            <!--end::Input-->
          </div>
          <div class="col-md-6">
            <!--begin::Label-->
            <label class="required fs-6 fw-bold mb-2">Hari</label>
            <!--end::Label-->

            <!--begin::Input-->
            <el-form-item prop="day">
              <el-select
                filterable
                class="w-100"
                v-model="formData.day"
                placeholder="Hari"
              >
                <el-option label="Senin" value="Senin"></el-option>
                <el-option label="Selasa" value="Senin"></el-option>
                <el-option label="Rabu" value="Senin"></el-option>
                <el-option label="Kamis" value="Senin"></el-option>
                <el-option label="Jum'at" value="Senin"></el-option>
                <el-option label="Sabtu" value="Senin"></el-option>
              </el-select>
            </el-form-item>
            <!--end::Input-->
          </div>
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row">
          <div class="col-md-6">
            <!--begin::Label-->
            <label class="required fs-6 fw-bold mb-2">Jam Mulai</label>
            <!--end::Label-->

            <!--begin::Input-->
            <el-form-item prop="start_at">
              <el-time-picker
                class="w-100"
                v-model="formData.start_at"
                :picker-options="{
                  selectableRange: '08:00:00 - 22:00:00',
                }"
                placeholder="Pilih Jam Mulai Matakuliah"
                value-format="HH:mm:ss"
              >
              </el-time-picker>
            </el-form-item>
            <!--end::Input-->
          </div>
          <div class="col-md-6">
            <!--begin::Label-->
            <label class="required fs-6 fw-bold mb-2">Jam Berakhir</label>
            <!--end::Label-->

            <!--begin::Input-->
            <el-form-item prop="end_at">
              <el-time-picker
                class="w-100"
                v-model="formData.end_at"
                :picker-options="{
                  selectableRange: '08:00:00 - 22:00:00',
                }"
                placeholder="Pilih Jam Akhir Matakuliah"
                value-format="HH:mm:ss"
              >
              </el-time-picker>
            </el-form-item>
            <!--end::Input-->
          </div>
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row">
          <div class="col-md-6">
            <!--begin::Label-->
            <label class="required fs-6 fw-bold mb-2">Dosen Pengampu</label>
            <!--end::Label-->

            <!--begin::Input-->
            <el-form-item prop="lecture_id">
              <el-select
                filterable
                class="w-100"
                v-model="formData.lecture_id"
                placeholder="Pilih Kampus"
              >
                <el-option
                  v-for="lecture in lectures"
                  :key="lecture.id"
                  :label="lecture.name"
                  :value="lecture.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <!--end::Input-->
          </div>
          <div class="col-md-6">
            <!--begin::Label-->
            <label class="required fs-6 fw-bold mb-2">SKS</label>
            <!--end::Label-->

            <!--begin::Input-->
            <el-form-item prop="sks">
              <el-input v-model="formData.sks" type="text" placeholder="" />
            </el-form-item>
            <!--end::Input-->
          </div>
        </div>
        <!--end::Input group-->

        <!--begin::Button-->
        <button
          :data-kt-indicator="loading ? 'on' : null"
          class="btn btn-lg btn-primary mt-4"
          type="submit"
        >
          <span v-if="!loading" class="indicator-label">
            Submit
            <span class="svg-icon svg-icon-3 ms-2 me-0">
              <inline-svg src="icons/duotune/arrows/arr064.svg" />
            </span>
          </span>
          <span v-if="loading" class="indicator-progress">
            Please wait...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>
        <!--end::Button-->
      </el-form>
      <!--end::Form-->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from "vue";
import { MenuComponent } from "@/assets/ts/components";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Swal from "sweetalert2/dist/sweetalert2.js";
import ApiService from "@/core/services/ApiService";
import { AxiosRequestConfig } from "axios";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "subject-create",
  setup() {
    const router = useRouter();
    const formRef = ref<null | HTMLFormElement>(null);
    const loading = ref<boolean>(false);
    const formData = reactive({
      generation: "",
    });

    let campuses = ref([]);
    let lectures = ref([]);

    onMounted(async () => {
      // Reinit
      MenuComponent.reinitialization();

      // Set Breadcrumbs
      setCurrentPageBreadcrumbs("Matakuliah", ["Daftar Matakuliah"]);

      // Load data for options select
      const userResponse = await ApiService.get("/users", "", {
        params: {
          role: "dosen",
        },
      });
      const campusResponse = await ApiService.get("/campuses");
      campuses.value = campusResponse.data.data;
      lectures.value = userResponse.data.data;
    });

    const rules = ref({
      name: [
        {
          required: true,
          message: "Nama Matakuliah diperlukan",
          trigger: "change",
        },
      ],
      generation: [
        {
          required: true,
          message: "Tahun Angkatan diperlukan",
          trigger: "change",
        },
      ],
      day: [
        {
          required: true,
          message: "Hari Pertemuan diperlukan",
          trigger: "change",
        },
      ],
      sks: [
        {
          required: true,
          message: "SKS diperlukan",
          trigger: "change",
        },
      ],
      semester: [
        {
          required: true,
          message: "Semester diperlukan",
          trigger: "change",
        },
      ],
      lecture_id: [
        {
          required: true,
          message: "Dosen Pengampu diperlukan",
          trigger: "change",
        },
      ],
      campus_id: [
        {
          required: true,
          message: "Kampus diperlukan",
          trigger: "change",
        },
      ],
    });

    const submit = () => {
      if (!formRef.value) {
        return;
      }

      formRef.value.validate(async (valid) => {
        if (valid) {
          loading.value = true;
          // const data = <AxiosRequestConfig>formData.value;

          const postResponse = await ApiService.post(
            "/subjects",
            formData as AxiosRequestConfig
          );
          loading.value = false;

          if (postResponse.status == 201) {
            Swal.fire({
              text: "Form has been successfully submitted!",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
                confirmButton: "btn btn-primary",
              },
            }).then(() => {
              router.push({ name: "subject" });
            });
          }
        } else {
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
      });
    };

    return {
      campuses,
      lectures,
      formData,
      loading,
      formRef,
      rules,
      submit,
    };
  },
});
</script>

<style></style>
