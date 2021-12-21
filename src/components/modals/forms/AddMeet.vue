<template>
  <div>
    <button class="btn btn-primary" @click="dialogMeet = true">
      Buat Pertemuan Baru
    </button>
    <el-form
      @submit.prevent="submit"
      :model="formData"
      :rules="rules"
      ref="formRef"
    >
      <el-dialog v-model="dialogMeet" title="Buat Pertemuan" width="50%">
        <!--begin::Input group-->
        <div class="fv-row mb-4">
          <!--begin::Label-->
          <label class="required fs-6 fw-bold mb-2">Judul Pertemuan</label>
          <!--end::Label-->

          <!--begin::Input-->
          <el-form-item prop="title">
            <el-input v-model="formData.title" type="text" placeholder="" />
          </el-form-item>
          <!--end::Input-->
        </div>
        <div class="fv-row mb-4">
          <!--begin::Label-->
          <label class="required fs-6 fw-bold mb-2"
            >Izinkan partisipan berdiskusi</label
          >
          <!--end::Label-->

          <!--begin::Input-->
          <el-form-item prop="is_can_comment">
            <el-switch v-model="formData.is_can_comment" />
          </el-form-item>
          <!--end::Input-->
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogMeet = false">Cancel</el-button>
            <el-button native-type="submit" type="primary">Simpan</el-button>
          </span>
        </template>
      </el-dialog>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import ApiService from "@/core/services/ApiService";
import { AxiosRequestConfig } from "axios";

export default defineComponent({
  props: ["subjectId"],
  setup(props, { emit }) {
    console.log(props.subjectId);
    let dialogMeet = ref(false);
    let step = ref(1);
    let loading = ref(false);
    let formData = ref({
      is_submitted_attendance: false,
      subject_id: props.subjectId,
      is_can_comment: false,
    });

    let formRef = ref<null | HTMLFormElement>(null);

    const rules = ref({
      title: [
        {
          required: true,
          message: "Judul pertemuan harus di-isi",
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
          const data = {
            ...formData.value,
          };

          data.subject_id = props.subjectId;

          const postResponse = await ApiService.post(
            "/meets",
            data as AxiosRequestConfig
          );
          loading.value = false;

          if (postResponse.status == 201) {
            dialogMeet.value = false;
            Swal.fire({
              text: "Berhasil Membuat Pertemuan!",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
                confirmButton: "btn btn-primary",
              },
            });
            emit("created", postResponse.data);
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
        } else {
          return false;
        }
      });
    };

    return {
      dialogMeet,
      step,
      formRef,
      formData,
      submit,
      rules,
    };
  },
});
</script>

<style scoped></style>
