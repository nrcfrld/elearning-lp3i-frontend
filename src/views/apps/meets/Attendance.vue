<template>
  <div>
    <el-skeleton v-if="loading" animated>
      <template #template>
        <el-skeleton-item variant="rect" style="height: 180px" class="shadow" />
      </template>
    </el-skeleton>
    <div v-if="!loading">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <h1 class="mb-5">{{ meet.subject.name }}</h1>
              <div class="d-flex align-items-center">
                <el-avatar
                  :size="40"
                  :src="
                    meet.subject.lecture
                      ? meet.subject.lecture.avatar_url
                      : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                  "
                ></el-avatar>
                <p class="ms-3 mb-0">{{ meet.subject.lecture?.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row my-5">
        <div class="col-12">
          <div class="d-flex align-items-center justify-content-between">
            <h2>{{ meet.title }}</h2>
            <div>
              <a
                href=""
                class="btn btn-light-primary me-3"
                v-if="user.role.name == 'dosen'"
                >Export</a
              >
              <a
                href=""
                @click.prevent="submitAttendances"
                class="btn btn-primary"
                v-if="
                  user.role.name == 'dosen' && !meet.is_submitted_attendance
                "
                >Submit Kehadiran</a
              >
            </div>
          </div>
        </div>
      </div>
      <div class="row my-5">
        <div class="col-12">
          <div class="card">
            <table class="table table-rounded border gy-7 gs-7">
              <thead>
                <tr
                  class="
                    fw-bold
                    fs-5
                    text-gray-800
                    border-bottom border-gray-200
                  "
                >
                  <th>Nama</th>
                  <th>NIM</th>
                  <th>Hadir</th>
                  <th v-show="user.role.name == 'dosen'">Bukti</th>
                  <th
                    v-show="
                      user.role.name == 'dosen' && !meet.is_submitted_attendance
                    "
                  >
                    Ubah Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="attendance in attendances" :key="attendance.id">
                  <td>{{ attendance.user.name }}</td>
                  <td>{{ attendance.user.identity_number }}</td>
                  <td class="text-capitalize">
                    <p
                      v-if="attendance.status == 'hadir'"
                      class="text-success mb-0"
                    >
                      <span class="svg-icon svg-icon-2 svg-icon-success">
                        <inline-svg
                          src="media/icons/duotune/general/gen043.svg"
                        />
                      </span>
                      Hadir
                    </p>
                    <p
                      v-if="attendance.status != 'hadir'"
                      class="text-danger mb-0"
                    >
                      <span class="svg-icon svg-icon-2 svg-icon-danger">
                        <inline-svg
                          src="media/icons/duotune/general/gen043.svg"
                        />
                      </span>
                      {{ attendance.status }}
                    </p>
                  </td>
                  <td v-show="user.role.name == 'dosen'">
                    <a
                      v-if="attendance.document_url"
                      :href="attendance.document_url"
                      target="_blank"
                    >
                      Bukti</a
                    >
                    <span v-if="!attendance.document_url"> - </span>
                  </td>
                  <td
                    v-show="
                      user.role.name == 'dosen' &&
                      meet.is_submitted_attendance == false
                    "
                  >
                    <select
                      class="form-control"
                      @change="updateStatus(attendance.id, $event)"
                    >
                      <option value="" disabled selected>Ubah</option>
                      <option value="tidak hadir">Tidak Hadir</option>
                      <option value="hadir">Hadir</option>
                      <option value="sakit">Sakit</option>
                      <option value="izin">Izin</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { MenuComponent } from "@/assets/ts/components";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import ApiService from "@/core/services/ApiService";
import { AxiosRequestConfig } from "axios";
import { defineComponent, ref, onMounted, computed } from "vue";
import { AnyObject } from "yup/lib/types";
import { useStore } from "vuex";
import { ElMessage, ElMessageBox } from "element-plus";

export default defineComponent({
  props: ["id", "subjectId"],
  setup(props) {
    const store = useStore();

    const user = computed(() => {
      return store.getters.currentUser;
    });

    let meet = ref({
      is_submitted_attendance: false,
    });
    let attendances = ref<AnyObject>([]);
    let loading = ref(true);
    let test = ref("tidak hadir");
    const statusOptions = ref(["tidak hadir", "sakit", "hadir", "izin"]);

    onMounted(async () => {
      MenuComponent.reinitialization();
      setCurrentPageBreadcrumbs("Perkuliahan", []);
      const responseMeet = await ApiService.get(`/meets/${props.id}`);
      const responseAttendances = await ApiService.get(`/attendances`, "", {
        params: {
          meet_id: props.id,
        },
      });

      meet.value = responseMeet.data.data;
      attendances.value = responseAttendances.data.data;
      loading.value = false;
    });

    const updateStatus = async (id, event) => {
      const response = await ApiService.put(`/attendances/${id}`, {
        status: event.target.value,
      } as AxiosRequestConfig);

      if (response.status == 200) {
        console.log(attendances.value);
        attendances.value.forEach((item) => {
          if (item.id == id) {
            item.status = event.target.value;
          }
        });
      }
    };

    const submitAttendances = async () => {
      ElMessageBox.confirm(
        "Anda tidak dapat lagi mengubah kehadiran ketika telah disubmit",
        "Submit Kehadiran",
        {
          confirmButtonText: "Ya",
          cancelButtonText: "Batal",
          type: "warning",
        }
      )
        .then(async () => {
          const data = {
            ...meet.value,
            is_submitted_attendance: true,
          };

          data.is_submitted_attendance = true;

          const response = await ApiService.put(
            `/meets/${props.id}`,
            data as AxiosRequestConfig
          );

          meet.value.is_submitted_attendance = true;

          return ElMessage({
            type: "success",
            message: "Kehadiran telah disimpan",
          });
        })
        .catch(() => {
          return false;
        });
    };

    return {
      meet,
      loading,
      attendances,
      statusOptions,
      test,
      updateStatus,
      user,
      submitAttendances,
    };
  },
});
</script>

<style scoped></style>
