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
            <label class="required fs-6 fw-bold mb-2">Nama Kelas</label>
            <!--end::Label-->

            <!--begin::Input-->
            <el-form-item prop="name">
              <el-input v-model="formData.name" type="text" placeholder="" />
            </el-form-item>
            <!--end::Input-->
          </div>
          <div class="col-md-6">
            <!--begin::Label-->
            <label class="required fs-6 fw-bold mb-2">Jurusan</label>
            <!--end::Label-->

            <!--begin::Input-->
            <el-form-item prop="major_id">
               <el-select
                filterable
                class="w-100"
                v-model="formData.major_id"
                placeholder="Pilih Jurusan"
              >
                <el-option
                  v-for="major in majors"
                  :key="major.id"
                  :label="major.name"
                  :value="major.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <!--end::Input-->
          </div>
        </div>
        <!--begin::Input group-->
        <div class="row">
          <div class="col-md-6">
            <!--begin::Label-->
            <label class="required fs-6 fw-bold mb-2">Kode Kelas</label>
            <!--end::Label-->

            <!--begin::Input-->
            <el-form-item prop="code">
              <el-input v-model="formData.code" type="text" placeholder="" />
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
  name: "classrooms-create",
  setup() {
    const router = useRouter();
    const formRef = ref<null | HTMLFormElement>(null);
    const loading = ref<boolean>(false);
    const formData = reactive({
    });

    let majors = ref([]);

    onMounted(async () => {
      // Reinit
      MenuComponent.reinitialization();

      // Set Breadcrumbs
      setCurrentPageBreadcrumbs("Kelas", ["Daftar Kelas"]);

      // Load data for options select
      const majorResponse = await ApiService.get("/majors");
      majors.value = majorResponse.data.data;
    }); 

    const rules = ref({
      name: [
        {
          required: true,
          message: "Nama Kelas diperlukan",
          trigger: "change",
        },
      ],
      major_id: [
        {
          required: true,
          message: "Jurusan diperlukan",
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
            "/classrooms",
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
              router.push({ name: "classrooms" });
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
      majors,
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
