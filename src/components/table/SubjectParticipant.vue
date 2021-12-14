<template>
  <Datatable
    :loading="loading"
    :table-data="items"
    :table-header="tableHeader"
    :enable-items-per-page-dropdown="true"
    :key="refresh"
  >
    <template v-slot:cell-checkbox="{ row: item }">
      <div class="form-check form-check-sm form-check-custom form-check-solid">
        <input
          class="form-check-input"
          type="checkbox"
          v-model="checkeditems"
          :value="item.id"
        />
      </div>
    </template>
    <template v-slot:cell-name="{ row: item }">
      {{ item.user.name }}
    </template>
    <template v-slot:cell-identity_number="{ row: item }">
      <p class="text-center">{{ item.user.identity_number }}</p>
    </template>
  </Datatable>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import Datatable from "@/components/kt-datatable/Datatable.vue";
import ApiService from "@/core/services/ApiService";

export default defineComponent({
  name: "subject-participant",
  props: ["subjectId"],
  components: {
    Datatable,
  },
  setup(props) {
    let refresh = ref(1);
    let loading = ref(true);
    const checkeditems = ref([]);
    const tableHeader = ref([
      {
        key: "checkbox",
      },
      {
        name: "Nama",
        key: "name",
        sortable: true,
      },
      {
        name: "NIM",
        key: "identity_number",
        sortable: true,
      },
    ]);

    let items = ref([]);

    onMounted(async () => {
      const response = await ApiService.get("/subject-participants", "", {
        params: {
          subject_id: props.subjectId,
        },
      });

      items.value = response.data.data;

      loading.value = false;
      refresh.value += 1;
    });

    return {
      items,
      tableHeader,
      refresh,
      loading,
      checkeditems,
    };
  },
});
</script>

<style scoped></style>
