<template>
  <div class="row mt-5">
    <div class="col-lg-8">
      <el-skeleton v-if="loading" animated>
        <template #template>
          <el-skeleton-item
            variant="rect"
            style="height: 160px"
            class="shadow"
          />
        </template>
      </el-skeleton>

      <StatisticsWidget1
        v-for="subject in subjects"
        :key="subject.id"
        widget-classes="card-xl-stretch mb-xl-8 border shadow mb-3"
        background="abstract-2.svg"
        :title="subject.name"
        :time="`${subject.day}, ${subject.start_at} - ${subject.end_at}`"
        :description="subject.lecture.name"
        :id="subject.id"
      ></StatisticsWidget1>
    </div>
    <div class="col-lg-4">
      <div class="card bg-danger text-white mb-3">
        <div class="card-header">
          <h3 class="card-title text-white">Pengumuman</h3>
        </div>
        <div class="card-body card-scroll h-100px">
          Lorem Ipsum is simply dummy text...
        </div>
      </div>
      <!-- <el-calendar> </el-calendar> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { MenuComponent } from "@/assets/ts/components";
import StatisticsWidget1 from "@/components/widgets/statsistics/Widget1.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import ApiService from "@/core/services/ApiService";

export default defineComponent({
  name: "users-listing",
  components: {
    StatisticsWidget1,
  },
  setup() {
    let subjects = ref([]);
    let loading = ref(true);

    onMounted(async () => {
      MenuComponent.reinitialization();
      setCurrentPageBreadcrumbs("Perkuliahan", []);

      const responseSubject = await ApiService.get("/subjects");

      subjects.value = responseSubject.data.data;

      loading.value = false;
    });

    return {
      subjects,
      loading,
    };
  },
});
</script>
