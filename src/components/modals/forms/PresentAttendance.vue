<template>
  <a
    @click.prevent="modalPresent = true"
    href="#"
    class="btn btn-light-warning"
  >
    Presensi Kehadiran
  </a>
  <el-dialog v-model="modalPresent" title="Buat Presensi Kehadiran" width="30%">
    <el-form
      @submit.prevent="submit()"
      :model="formData"
      :rules="rules"
      ref="formRef"
    >
      <div class="fv-row mb-7">
        <!--begin::Label-->
        <label class="required fs-6 fw-bold mb-2">Status Kehadiran</label>
        <!--end::Label-->

        <!--begin::Input-->
        <el-form-item prop="status">
          <el-select
            filterable
            class="w-100"
            v-model="formData.status"
            placeholder="Keterangan Kehadiran"
          >
            <el-option
              v-for="(stat, index) in status"
              :key="index"
              :label="stat"
              :value="stat"
            ></el-option>
          </el-select>
        </el-form-item>
        <!--end::Input-->
      </div>
      <div class="fv-row mb-7">
        <!--begin::Label-->
        <label class="required fs-6 fw-bold mb-2">Bukti Kehadiran</label>
        <!--end::Label-->

        <!--begin::Input-->
        <el-form-item prop="document">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :auto-upload="false"
            @change="changeFile"
            ref="upload"
          >
            Pilih Gambar
            <img v-if="imageUrl" :src="imageUrl" class="avatar w-100" />
          </el-upload>
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

export default defineComponent({
  props: {
    meetId: {
      type: String || Number,
      default: 0,
    },
  },
  setup(props) {
    let modalPresent = ref(false);
    let formData = reactive({
      document: {},
      status: "",
      meet_id: props.meetId,
    });
    let formRef = ref<null | HTMLFormElement>(null);
    let upload = ref<null>(null);
    let imageUrl = ref("");

    const rules = ref({
      status: [
        {
          required: true,
          message: "Keterangan Hadir harus dipilih",
          trigger: "change",
        },
      ],
    });

    const status = ref(["tidak hadir", "hadir", "izin", "sakit"]);

    const submit = async () => {
      try {
        let form = new FormData();
        form.append("meet_id", formData.meet_id);
        form.append("document", formData.document as Blob);
        form.append("status", formData.status);

        const response = await ApiService.post(
          `/attendances/submit`,
          form as AxiosRequestConfig
        );

        if (response.status == 200) {
          modalPresent.value = false;
          Swal.fire({
            text: "Berhasil mengirim presensi kehadiran!",
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

    const changeFile = (file, fileList) => {
      imageUrl.value = URL.createObjectURL(file.raw);
      formData.document = file.raw;
    };

    return {
      modalPresent,
      formData,
      submit,
      formRef,
      rules,
      status,
      upload,
      imageUrl,
      changeFile,
    };
  },
});
</script>

<style scoped></style>
