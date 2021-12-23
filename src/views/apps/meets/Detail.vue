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
              <PresentAttendance :meetId="meet.id" v-if="!meet.is_present" />
              <router-link
                :to="{
                  name: 'meet-attendance',
                  params: { id: meet.id, subjectId: meet.subject_id },
                }"
                class="ms-3 btn btn-primary"
                >Lihat Daftar Kehadiran</router-link
              >
            </div>
          </div>
        </div>
      </div>
      <div class="row my-5">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">
              <div
                class="d-flex align-items-center justify-content-between w-100"
              >
                <h3 class="mb-0">Materi</h3>
                <AddTopic :meetId="meet.id" />
              </div>
            </div>
            <div class="card-body"></div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-header">
              <div
                class="d-flex align-items-center justify-content-between w-100"
              >
                <h3 class="mb-0">Tugas</h3>
                <button type="button" class="btn btn-light-primary">
                  <span class="svg-icon svg-icon-2">
                    <inline-svg src="media/icons/duotune/general/gen035.svg" />
                  </span>
                  Tambah Tugas
                </button>
              </div>
            </div>
            <div class="card-body"></div>
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
import { defineComponent, ref, onMounted } from "vue";
import PresentAttendance from "@/components/modals/forms/PresentAttendance.vue";
import AddTopic from "@/components/modals/forms/AddTopic.vue";

export default defineComponent({
  props: ["id", "subjectId"],
  components: {
    PresentAttendance,
    AddTopic,
  },
  setup(props) {
    let meet = ref({});
    let loading = ref(true);

    onMounted(async () => {
      MenuComponent.reinitialization();
      setCurrentPageBreadcrumbs("Perkuliahan", []);
      const responseMeet = await ApiService.get(`/meets/${props.id}`);

      meet.value = responseMeet.data.data;
      loading.value = false;
    });

    return {
      meet,
      loading,
    };
  },
});
</script>

<style scoped></style>
