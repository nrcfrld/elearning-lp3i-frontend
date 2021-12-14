<template>
  <div
    class="modal fade"
    id="kt_modal_add_user"
    ref="addUserModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_user_header">
          <!--begin::Modal title-->
          <h2 class="fw-bolder">Add a User</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_user_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->
        <!--begin::Form-->
        <el-form
          @submit.prevent="submit()"
          :model="formData"
          :rules="rules"
          ref="formRef"
        >
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_add_user_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_user_header"
              data-kt-scroll-wrappers="#kt_modal_add_user_scroll"
              data-kt-scroll-offset="300px"
            >
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">Role</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="role_id">
                  <el-select
                    filterable
                    class="w-100"
                    v-model="formData.role_id"
                    placeholder="Pilih role"
                  >
                    <el-option
                      v-for="role in roles"
                      :key="role.id"
                      :label="role.name"
                      :value="role.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <!--end::Input-->
              </div>

              <div v-if="formData.role_id == 3" class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">Kelas</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="classroom_id">
                  <el-select
                    filterable
                    class="w-100"
                    v-model="formData.classroom_id"
                    placeholder="Pilih Kelas"
                  >
                    <el-option
                      v-for="classroom in classrooms"
                      :key="classroom.id"
                      :label="classroom.name"
                      :value="classroom.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <!--end::Input-->
              </div>

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2"
                  >Nomor Identitas (NIM/NIDN/NIP)</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="identity_number">
                  <el-input
                    v-model="formData.identity_number"
                    type="text"
                    placeholder=""
                  />
                </el-form-item>
                <!--end::Input-->
              </div>

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">Name</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="name">
                  <el-input
                    v-model="formData.name"
                    type="text"
                    placeholder=""
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">Nomor Telepon</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="phone_number">
                  <el-input
                    v-model="formData.phone_number"
                    type="text"
                    placeholder=""
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">Email</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="email">
                  <el-input
                    v-model="formData.email"
                    type="email"
                    placeholder=""
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button
              type="reset"
              id="kt_modal_add_user_cancel"
              class="btn btn-light me-3"
            >
              Discard
            </button>
            <!--end::Button-->

            <!--begin::Button-->
            <button
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary"
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
          </div>
          <!--end::Modal footer-->
        </el-form>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import ApiService from "@/core/services/ApiService";
import RoleInterface from "@/interfaces/RoleInterface";
import { AxiosRequestConfig } from "axios";
import ClassroomInterface from "@/interfaces/ClassroomInterface";

interface userForm {
  name: null | string;
  identity_number: null | string;
  email: null | string;
  phone_number: null | string;
  role_id: null | number;
  classroom_id: null | number;
}

export default defineComponent({
  name: "add-user-modal",
  components: {},
  setup() {
    const formRef = ref<null | HTMLFormElement>(null);
    const addUserModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const formData = reactive<userForm>({
      name: null,
      identity_number: null,
      email: null,
      phone_number: null,
      role_id: null,
      classroom_id: null,
    });

    let roles = ref<Array<RoleInterface>>([]);
    let classrooms = ref<Array<ClassroomInterface>>([]);

    onMounted(async () => {
      const roleResponse = await ApiService.get("/roles");
      const classroomResponse = await ApiService.get("/classrooms");

      roles.value = roleResponse.data.data;
      classrooms.value = classroomResponse.data.data;
    });

    const rules = ref({
      name: [
        {
          required: true,
          message: "User name is required",
          trigger: "change",
        },
      ],
      email: [
        {
          required: true,
          message: "User email is required",
          trigger: "change",
        },
      ],
      identity_number: [
        {
          required: true,
          message: "User identity number is required",
          trigger: "change",
        },
      ],
      phone_number: [
        {
          required: true,
          message: "User phone number is required",
          trigger: "change",
        },
      ],
      role_id: [
        {
          required: true,
          message: "User Role is required",
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
            "/users",
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
              hideModal(addUserModalRef.value);
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
      formData,
      rules,
      submit,
      formRef,
      loading,
      addUserModalRef,
      roles,
      classrooms,
    };
  },
});
</script>
