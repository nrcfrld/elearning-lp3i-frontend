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
            <label class="required fs-6 fw-bold mb-2">Nama Jurusan</label>
            <!--end::Label-->

            <!--begin::Input-->
            <el-form-item prop="name">
              <el-input v-model="formData.name" type="text" placeholder="" />
            </el-form-item>
            <!--end::Input-->
          </div>
          <div class="col-md-6">
            <!--begin::Label-->
            <label class="fs-6 fw-bold mb-2">kode</label>
            <!--end::Label-->

            <!--begin::Input-->
            <el-form-item prop="code">
              <el-input
                v-model="formData.code"
                type="text"
                placeholder=""
              />
            </el-form-item>
            <!--end::Input-->
          </div>
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row">
          
        <div class="col-md-6">
            <!--begin::Label-->
            <label class="required fs-6 fw-bold mb-2">Program Studi</label>
            <!--end::Label-->

            <!--begin::Input-->
            <el-form-item prop="study_program_id">
               <el-select
                filterable
                class="w-100"
                v-model="formData.study_program_id"
                placeholder="Pilih Program Studi"
              >
                <el-option
                  v-for="study_program in study_programs"
                  :key="study_program.id"
                  :label="study_program.name"
                  :value="study_program.id"
                ></el-option>
              </el-select>
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
  name: "majors-create",
  setup() {
    const router = useRouter();
    const formRef = ref<null | HTMLFormElement>(null);
    const loading = ref<boolean>(false);
    const formData = reactive({
    });

    let study_programs = ref([]);

    onMounted(async () => {
      // Reinit
      MenuComponent.reinitialization();

      // Set Breadcrumbs
      setCurrentPageBreadcrumbs("Jurusan", ["Daftar jurusan"]);

      // Load data for options select
      const study_programResponse = await ApiService.get("/study-programs");
      study_programs.value = study_programResponse.data.data;
    });

    const rules = ref({
      name: [
        {
          required: true,
          message: "Nama Jurusan diperlukan",
          trigger: "change",
        },
      ],
      study_program_id: [
        {
          required: true,
          message: "Program Studi diperlukan",
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
            "/majors",
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
              router.push({ name: "majors" });
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
      study_programs,
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
