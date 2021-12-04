<template>
  <!--begin::Menu wrapper-->
  <div
    v-if="user.roles && user.role.name != 'admin'"
    class="header-menu align-items-stretch"
    data-kt-drawer="true"
    data-kt-drawer-name="header-menu"
    data-kt-drawer-activate="{default: true, lg: false}"
    data-kt-drawer-overlay="true"
    data-kt-drawer-width="{default:'200px', '300px': '250px'}"
    data-kt-drawer-direction="end"
    data-kt-drawer-toggle="#kt_header_menu_mobile_toggle"
    data-kt-place="true"
    data-kt-place-mode="prepend"
    data-kt-place-parent="{default: '#kt_body', lg: '#kt_header_nav'}"
  >
    <!--begin::Menu-->
    <div
      class="
        menu
        menu-lg-rounded
        menu-column
        menu-lg-row
        menu-state-bg
        menu-title-gray-700
        menu-state-title-primary
        menu-state-icon-primary
        menu-state-bullet-primary
        menu-arrow-gray-400
        fw-bold
        my-5 my-lg-0
        align-items-stretch
      "
      id="#kt_header_menu"
      data-kt-menu="true"
    >
      <template v-for="(item, i) in MainMenuConfig" :key="i">
        <template v-if="!item.heading && item.roles.includes(user.role.name)">
          <template v-for="(menuItem, j) in item.pages" :key="j">
            <div v-if="menuItem.heading" class="menu-item me-lg-1">
              <router-link
                :to="menuItem.route"
                v-slot="{ href, navigate, isActive, isExactActive }"
              >
                <a
                  :href="href"
                  class="menu-link py-3"
                  @click="navigate"
                  :class="[isActive && 'active', isExactActive && 'active']"
                >
                  <span class="menu-title">{{
                    translate(menuItem.heading)
                  }}</span>
                </a>
              </router-link>
            </div>
          </template>
        </template>
        <div
          v-if="item.heading && item.roles.includes(user.role.name)"
          data-kt-menu-trigger="click"
          data-kt-menu-placement="bottom-start"
          class="menu-item menu-lg-down-accordion me-lg-1"
        >
          <span
            class="menu-link py-3"
            :class="{ active: hasActiveChildren(item.route) }"
          >
            <span class="menu-title">{{ translate(item.heading) }}</span>
            <span class="menu-arrow d-lg-none"></span>
          </span>
          <div
            class="
              menu-sub
              menu-sub-lg-down-accordion
              menu-sub-lg-dropdown
              menu-rounded-0
              py-lg-4
              w-lg-225px
            "
          >
            <template v-for="(menuItem, j) in item.pages" :key="j">
              <div
                v-if="menuItem.sectionTitle"
                data-kt-menu-trigger="{default:'click', lg: 'hover'}"
                data-kt-menu-placement="right-start"
                class="menu-item menu-lg-down-accordion"
              >
                <span
                  class="menu-link py-3"
                  :class="{ active: hasActiveChildren(menuItem.route) }"
                >
                  <span class="menu-icon">
                    <i
                      v-if="headerMenuIcons === 'font'"
                      :class="menuItem.fontIcon"
                      class="bi fs-3"
                    ></i>
                    <span
                      v-if="headerMenuIcons === 'svg'"
                      class="svg-icon svg-icon-2"
                    >
                      <inline-svg :src="menuItem.svgIcon" />
                    </span>
                  </span>
                  <span class="menu-title">{{
                    translate(menuItem.sectionTitle)
                  }}</span>
                  <span class="menu-arrow"></span>
                </span>
                <div
                  class="
                    menu-sub
                    menu-sub-lg-down-accordion
                    menu-sub-lg-dropdown
                    menu-active-bg
                    py-lg-4
                    w-lg-225px
                  "
                >
                  <template v-for="(menuItem1, k) in menuItem.sub" :key="k">
                    <div
                      v-if="menuItem1.sectionTitle"
                      data-kt-menu-trigger="{default:'click', lg: 'hover'}"
                      data-kt-menu-placement="right-start"
                      class="menu-item menu-lg-down-accordion"
                    >
                      <span
                        class="menu-link py-3"
                        :class="{ active: hasActiveChildren(menuItem1.route) }"
                      >
                        <span class="menu-bullet">
                          <span class="bullet bullet-dot"></span>
                        </span>
                        <span class="menu-title">{{
                          translate(menuItem1.sectionTitle)
                        }}</span>
                        <span class="menu-arrow"></span>
                      </span>
                      <div
                        class="
                          menu-sub
                          menu-sub-lg-down-accordion
                          menu-sub-lg-dropdown
                          menu-active-bg
                          py-lg-4
                          w-lg-225px
                        "
                      >
                        <template
                          v-for="(menuItem2, l) in menuItem1.sub"
                          :key="l"
                        >
                          <div class="menu-item">
                            <router-link
                              class="menu-link py-3"
                              active-class="active"
                              :to="menuItem2.route"
                            >
                              <span class="menu-bullet">
                                <span class="bullet bullet-dot"></span>
                              </span>
                              <span class="menu-title">{{
                                translate(menuItem2.heading)
                              }}</span>
                            </router-link>
                          </div>
                        </template>
                      </div>
                    </div>
                    <div v-if="menuItem1.heading" class="menu-item">
                      <router-link class="menu-link py-3" :to="menuItem1.route">
                        <span class="menu-bullet">
                          <span class="bullet bullet-dot"></span>
                        </span>
                        <span class="menu-title">{{
                          translate(menuItem1.heading)
                        }}</span>
                      </router-link>
                    </div>
                  </template>
                </div>
              </div>
              <div v-if="menuItem.heading" class="menu-item">
                <router-link class="menu-link py-3" :to="menuItem.route">
                  <span class="menu-icon">
                    <span class="svg-icon svg-icon-2">
                      <inline-svg
                        src="media/icons/duotune/layouts/lay009.svg"
                      />
                    </span>
                  </span>
                  <span class="menu-title">{{
                    translate(menuItem.heading)
                  }}</span>
                </router-link>
              </div>
            </template>
          </div>
        </div>
      </template>
      <!--end::Menu-->
    </div>
  </div>
  <!--end::Menu wrapper-->
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { MenuComponent } from "@/assets/ts/components";
import MainMenuConfig from "@/core/config/MainMenuConfig";
import { headerMenuIcons } from "@/core/helpers/config";
import { version } from "@/core/helpers/documentation";
import { useStore } from "vuex";

export default defineComponent({
  name: "KTMenu",
  components: {},
  setup() {
    const { t, te } = useI18n();
    const route = useRoute();
    const store = useStore();

    const user = computed(() => {
      return store.getters.currentUser;
    });

    const hasActiveChildren = (match) => {
      return route.path.indexOf(match) !== -1;
    };

    const translate = (text) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };

    onMounted(() => {
      MenuComponent.reinitialization();
    });

    return {
      hasActiveChildren,
      headerMenuIcons,
      MainMenuConfig,
      translate,
      version,
      user,
    };
  },
});
</script>
