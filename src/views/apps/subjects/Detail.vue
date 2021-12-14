<template>
  <div class="card">
    <div class="card-body">
      <h1 class="mb-5">{{ subject.name }} - SPUK9123</h1>
      <el-descriptions class="margin-top" :column="3" border>
        <el-descriptions-item>
          <template #label> Dosen Pengampu </template>
          {{ subject.lecture ? subject.lecture.name : "-" }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label> Kampus </template>
          {{ subject.campus ? subject.campus.name : "-" }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label> Tahun Ajaran </template>
          {{ subject.generation }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label> Semester </template>
          {{ subject.semester }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label> Jumlah SKS </template>
          {{ subject.sks }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label> Hari </template>
          {{ subject.day }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label> Jam Mulai </template>
          {{ subject.start_at }} WIB
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label> Jam Berakhir </template>
          {{ subject.end_at }} WIB
        </el-descriptions-item>
      </el-descriptions>

      <SubjectParticipantVue :subjectId="id" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { MenuComponent } from "@/assets/ts/components";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import ApiService from "@/core/services/ApiService";
import SubjectParticipantVue from "@/components/table/SubjectParticipant.vue";

export default defineComponent({
  name: "subject-detail",
  components: {
    SubjectParticipantVue,
  },
  props: ["id"],
  setup(props) {
    let subject = ref({});

    ApiService.get(`/subjects/${props.id}`).then((response) => {
      subject.value = response.data.data;
    });

    onMounted(() => {
      MenuComponent.reinitialization();
      setCurrentPageBreadcrumbs("Matakuliah", ["Daftar Matakuliah"]);
    });

    return {
      subject,
    };
  },
});
</script>

<style scoped></style>
