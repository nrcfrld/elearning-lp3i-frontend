<template>
  <div v-if="!loading">
    <div class="row">
      <div class="card">
        <div class="card-body">
          <h1 class="mb-5">{{ subject.name }}</h1>
          <div class="d-flex align-items-center">
            <el-avatar
              :size="40"
              :src="
                subject.lecture
                  ? subject.lecture.avatar_url
                  : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
              "
            ></el-avatar>
            <p class="ms-3 mb-0">{{ subject.lecture?.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="Pertemuan" name="pertemuan">
          <div class="card">
            <div class="card-body">
              <div v-if="user.role.name == 'dosen'" class="row">
                <div class="col-12">
                  <AddMeet :subjectId="subject.id" @created="meetCreated" />
                </div>
              </div>
              <div class="row my-5" v-if="loading">
                <el-skeleton v-if="loading" animated>
                  <template #template>
                    <el-skeleton-item
                      variant="rect"
                      style="height: 140px"
                      class="shadow"
                    />
                  </template>
                </el-skeleton>
              </div>
              <div class="row" v-if="!loading && meets.length < 1">
                <div class="col-12">
                  <div
                    class="
                      h-100
                      py-5
                      my-5
                      text-center
                      border
                      rounded
                      d-flex
                      align-items-center
                      justify-content-center
                    "
                  >
                    Belum Ada Pertemuan
                  </div>
                </div>
              </div>
              <div class="row my-5">
                <div class="col-md-4" v-for="meet in meets" :key="meet.id">
                  <router-link
                    :to="{
                      name: 'meet-detail',
                      params: { id: meet.id, subjectId: subject.id },
                    }"
                    class="text-dark"
                  >
                    <div class="card border mb-3">
                      <div
                        class="
                          card-body
                          d-flex
                          align-items-center
                          justify-content-center
                        "
                      >
                        <p class="mb-0">
                          {{ meet.title }}
                        </p>
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Daftar Tugas" name="tugas">Config</el-tab-pane>
        <el-tab-pane label="Daftar Materi" name="materi">Role</el-tab-pane>
        <el-tab-pane label="Info Lainnya" name="info">Task</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { MenuComponent } from "@/assets/ts/components";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import ApiService from "@/core/services/ApiService";
import AddMeet from "@/components/modals/forms/AddMeet.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "detail-college",
  components: {
    AddMeet,
  },
  props: ["id"],
  setup(props) {
    const store = useStore();

    let user = computed(() => store.getters.currentUser);

    let meets = ref([]);
    let loading = ref(true);
    let activeName = ref("pertemuan");
    let subject = ref({});

    onMounted(async () => {
      MenuComponent.reinitialization();
      setCurrentPageBreadcrumbs("Perkuliahan", []);

      const responseSubject = await ApiService.get(`/subjects/${props.id}`);
      subject.value = responseSubject.data.data;
      getMeets();
    });

    const getMeets = async () => {
      const responseMeet = await ApiService.get("/meets", "", {
        params: {
          subject_id: props.id,
        },
      });

      meets.value = responseMeet.data.data;
      loading.value = false;
    };

    const handleClick = () => {
      //
    };

    const meetCreated = (data) => {
      getMeets();
    };

    return {
      meets,
      loading,
      activeName,
      handleClick,
      subject,
      meetCreated,
      user,
    };
  },
});
</script>
