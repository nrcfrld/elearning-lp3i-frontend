import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import store from "@/store";
import { Mutations, Actions } from "@/store/enums/StoreEnums";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layout/Layout.vue"),
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
      },
      {
        path: "/users",
        name: "user-index",
        component: () => import("@/views/apps/users/UsersListing.vue"),
      },
      {
        path: "/users/:id",
        name: "user-detail",
        component: () => import("@/views/apps/users/UserDetails.vue"),
      },
      {
        name: "subject",
        path: "/subjects",
        component: () => import("@/views/apps/subjects/Index.vue"),
      },
      {
        name: "subject-detail",
        path: "/subjects/:id",
        component: () => import("@/views/apps/subjects/Detail.vue"),
        props: true,
      },
      {
        name: "subject-create",
        path: "/subjects/create",
        component: () => import("@/views/apps/subjects/Create.vue"),
      },
      // Perkuliahan
      {
        path: "/perkuliahanku",
        name: "college",
        component: () => import("@/views/apps/college/Index.vue"),
      },
      {
        name: "campuses",
        path: "/campus",
        component: () => import("@/views/apps/campuses/Index.vue"),
      },
      {
        name: "campuses-create",
        path: "/campus/create",
        component: () => import("@/views/apps/campuses/Create.vue"),
      },
      {
        name: "study-programs",
        path: "/study-programs",
        component: () => import("@/views/apps/study-programs/Index.vue"),
      },
      {
        name: "study-programs-create",
        path: "/study-programs/create",
        component: () => import("@/views/apps/study-programs/Create.vue"),
      },
      {
        name: "classrooms",
        path: "/classrooms",
        component: () => import("@/views/apps/classrooms/Index.vue"),
      },
      {
        name: "classrooms-create",
        path: "/classrooms/create",
        component: () => import("@/views/apps/classrooms/Create.vue"),
      },
      {
        name: "majors",
        path: "/majors",
        component: () => import("@/views/apps/majors/Index.vue"),
      },
      {
        name: "majors-create",
        path: "/majors/create",
        component: () => import("@/views/apps/majors/Create.vue"),
      },
      {
        name: "helps",
        path: "/helps",
        component: () => import("@/views/apps/helps/Index.vue"),
      },
      {
        name: "helps-create", 
        path: "/helps/create",
        component: () => import("@/views/apps/helps/Create.vue"),
      },
      {
        name: "help-categories",
        path: "/help-categories",
        component: () => import("@/views/apps/help-categories/Index.vue"),
      },
      {
        name: "help-categories-create",
        path: "/help-categories/create",
        component: () => import("@/views/apps/help-categories/Create.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/components/page-layouts/Auth.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignIn.vue"),
      },
      {
        path: "/sign-up",
        name: "sign-up",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignUp.vue"),
      },
      {
        path: "/password-reset",
        name: "password-reset",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/PasswordReset.vue"),
      },
    ],
  },
  {
    // the 404 route, when none of the above matches
    path: "/404",
    name: "404",
    component: () => import("@/views/crafted/authentication/Error404.vue"),
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/views/crafted/authentication/Error500.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async () => {
  // reset config to initial state
  await store.commit(Mutations.RESET_LAYOUT_CONFIG);

  await store.dispatch(Actions.VERIFY_AUTH);

  console.log(store.getters.currentUser);

  // Scroll page to top on every route change
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
});

export default router;
