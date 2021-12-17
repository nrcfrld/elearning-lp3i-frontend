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
            <label class="required fs-6 fw-bold mb-2">Nama Bantuan</label>
            <!--end::Label-->

            <!--begin::Input-->
            <el-form-item prop="name">
              <el-input v-model="formData.name" type="text" placeholder="" />
            </el-form-item>
            <!--end::Input-->
          </div>
          <div class="col-md-6">
            <!--begin::Label-->
            <label class="required fs-6 fw-bold mb-2">Kategori</label>
            <!--end::Label-->

            <!--begin::Input-->
            <el-form-item prop="help_category_id">
              <el-select
                filterable
                class="w-100"
                v-model="formData.help_category_id"
                placeholder="Pilih Kategori"
              >
                <el-option
                  v-for="helpCategory in helpCategories"
                  :key="helpCategory.id"
                  :label="helpCategory.name"
                  :value="helpCategory.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <!--end::Input-->
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <!--begin::Label-->
            <label class="required fs-6 fw-bold mb-2">Konten</label>
            <!--end::Label-->

            <!--begin::Input-->
            <el-form-item prop="name">
                <editor
                    v-model="formData.content"
                    :init="{
                      height: 500,
                      menubar: false,
                      plugins: [
                        'advlist autolink lists link image charmap',
                        'searchreplace visualblocks code fullscreen',
                        'print preview anchor insertdatetime media',
                        'paste code help wordcount table',
                      ],
                      toolbar:
                        'undo redo | formatselect | bold italic |         alignleft aligncenter alignright |         bullist numlist outdent indent | help',
                    }"
                  >
              </editor>
            </el-form-item>
            <!--end::Input-->
          </div>
        </div>
        <!--end::Input group-->
        <div class="row">
          <div class="col-md-12">
            <!--begin::Label-->
            <label class="required fs-6 fw-bold mb-2">IS FAQ?</label>
            <!--end::Label-->

            <!--begin::Input-->
            <el-form-item prop="is_faq">
              <el-checkbox v-model="formData.is_faq"/>
            </el-form-item>
            <!--end::Input-->
          </div>
        </div>

        

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
import Editor from "@tinymce/tinymce-vue";

export default defineComponent({
  name: "helps-create",
  components:{
    Editor
  },
  setup() {
    const router = useRouter();
    const formRef = ref<null | HTMLFormElement>(null);
    const loading = ref<boolean>(false);
    const formData = reactive({
      is_faq: false
    });

    let helpCategories = ref([]);

    onMounted(async () => {
      // Reinit
      MenuComponent.reinitialization();

      // Set Breadcrumbs
      setCurrentPageBreadcrumbs("Bantuan", ["Daftar Bantuan"]);

      // Load data for options select
      const helpCategoryResponse = await ApiService.get("/help-categories");
      helpCategories.value = helpCategoryResponse.data.data;
    });

    const rules = ref({
      name: [
        {
          required: true,
          message: "Nama Bantuan diperlukan",
          trigger: "change",
        },
      ],
      content: [
        {
          required: true,
          message: "Tahun Angkatan diperlukan",
          trigger: "change",
        },
      ],
      help_category_id: [
        {
          required: true,
          message: "Hari Pertemuan diperlukan",
          trigger: "change",
        },
      ],
      is_faq: [
        {
          required: true,
          message: "SKS diperlukan",
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
            "/helps",
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
              router.push({ name: "helps" });
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
      helpCategories,
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
