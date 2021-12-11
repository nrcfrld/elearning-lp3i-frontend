<template>
  <h1>PerkuliahanKu</h1>
  <div class="row mt-5">
    <div class="col-lg-8">
      <StatisticsWidget1
        v-for="i in 8"
        :key="i"
        widget-classes="card-xl-stretch mb-xl-8 border shadow mb-3"
        background="abstract-2.svg"
        title="Pemrograman Web 2"
        time="Senin, 08:00 - 11:40"
        description="Pak Dosen Ganteng"
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
    onMounted(async () => {
      MenuComponent.reinitialization();
      setCurrentPageBreadcrumbs("Perkuliahan", []);
    });
  },
});
</script>
