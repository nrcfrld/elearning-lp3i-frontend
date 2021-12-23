<template>
  <button
    @click="modalPresent = true"
    type="button"
    class="btn btn-light-primary me-3"
  >
    <span class="svg-icon svg-icon-2">
      <inline-svg src="media/icons/duotune/general/gen055.svg" />
    </span>
    Tambah Materi
  </button>
  <el-dialog v-model="modalPresent" title="Buat Materi" width="70%">
    <el-form
      @submit.prevent="submit()"
      :model="formData"
      :rules="rules"
      ref="formRef"
    >
      <div class="fv-row mb-7">
        <!--begin::Label-->
        <label class="required fs-6 fw-bold mb-2">Nama Materi</label>
        <!--end::Label-->

        <!--begin::Input-->
        <el-form-item prop="name">
          <el-input v-model="formData.name" type="text" placeholder="" />
        </el-form-item>
        <!--end::Input-->
      </div>
      <div class="fv-row mb-7">
        <!--begin::Label-->
        <label class="required fs-6 fw-bold mb-2">Isi Materi</label>
        <!--end::Label-->

        <!--begin::Input-->
        <el-form-item prop="document">
          <editor
            v-model="formData.content"
            :init="{
              height: 300,
              menubar: 'insert',
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
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="modalPresent = false">Batal</el-button>
        <el-button native-type="submit" type="primary" @click="submit"
          >Simpan</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import ApiService from "@/core/services/ApiService";
import { AxiosRequestConfig } from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import Editor from "@tinymce/tinymce-vue";

export default defineComponent({
  props: {
    meetId: {
      type: String || Number,
      default: 0,
    },
  },
  components: {
    Editor,
  },
  setup(props) {
    let modalPresent = ref(false);
    let formData = reactive({
      name: "",
      content: null,
      type: "text",
      meet_id: props.meetId,
    });
    let formRef = ref<null | HTMLFormElement>(null);

    const rules = ref({
      name: [
        {
          required: true,
          message: "Keterangan Hadir harus dipilih",
          trigger: "change",
        },
      ],
    });

    const submit = async () => {
      try {
        const response = await ApiService.post(
          `/topics`,
          formData as AxiosRequestConfig
        );

        if (response.status == 201) {
          modalPresent.value = false;
          Swal.fire({
            text: "Berhasil membuat materi!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    return {
      modalPresent,
      formData,
      submit,
      formRef,
      rules,
    };
  },
});
</script>

<style scoped></style>
