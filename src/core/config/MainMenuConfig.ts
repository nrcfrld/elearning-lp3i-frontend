const DocMenuConfig = [
  {
    roles: ["admin", "mahasiswa", "dosen"],
    pages: [
      {
        heading: "dashboard",
        route: "/dashboard",
        svgIcon: "media/icons/duotune/art/art002.svg",
        fontIcon: "bi-app-indicator",
      },
    ],
  },
  {
    roles: ["mahasiswa", "dosen"],
    pages: [
      {
        heading: "Perkuliahanku",
        route: "/perkuliahanku",
        svgIcon: "media/icons/duotune/art/art002.svg",
        fontIcon: "bi-app-indicator",
      },
    ],
  },
  {
    roles: ["admin"],
    heading: "Manajemen",
    route: "/",
    pages: [
      {
        sectionTitle: "Pengguna",
        route: "/users",
        svgIcon: "media/icons/duotune/communication/com006.svg",
        fontIcon: "bi-people",
        sub: [
          {
            heading: "Daftar",
            route: "/users",
          },
          {
            heading: "Tambah",
            route: "/users/create",
          },
        ],
      },
      {
        sectionTitle: "Kampus",
        route: "/campus",
        svgIcon: "media/icons/duotune/communication/com006.svg",
        fontIcon: "bi-building",
        sub: [
          {
            heading: "Daftar",
            route: "/campus",
          },
          {
            heading: "Tambah",
            route: "/campus/create",
          },
        ],
      },
      {
        sectionTitle: "Matakuliah",
        route: "/subjects",
        svgIcon: "media/icons/duotune/communication/com006.svg",
        fontIcon: "bi-bullseye",
        sub: [
          {
            heading: "Daftar",
            route: "/subjects",
          },
          {
            heading: "Tambah",
            route: "/subjects/create",
          },
        ],
      },
      {
        sectionTitle: "Program Studi",
        route: "/study-programs",
        svgIcon: "media/icons/duotune/technology/teh004.svg",
        fontIcon: "bi-sticky",
        sub: [
          {
            heading: "Daftar",
            route: "/study-programs",
          },
          {
            heading: "Tambah",
            route: "/study-programs/create",
          },
        ],
      },
      {
        sectionTitle: "Jurusan",
        route: "/majors",
        svgIcon: "media/icons/duotune/technology/teh004.svg",
        fontIcon: "bi-journal",
        sub: [
          {
            heading: "Daftar",
            route: "/majors",
          },
          {
            heading: "Tambah",
            route: "/majors/create",
          },
        ],
      },
      {
        sectionTitle: "Kelas",
        route: "/classrooms",
        svgIcon: "media/icons/duotune/technology/teh004.svg",
        fontIcon: "bi-book",
        sub: [
          {
            heading: "Daftar",
            route: "/majors",
          },
          {
            heading: "Tambah",
            route: "/majors/create",
          },
        ],
      },
      {
        sectionTitle: "Help/FAQ",
        route: "/helps",
        svgIcon: "media/icons/duotune/technology/teh004.svg",
        fontIcon: "bi-patch-question",
        sub: [
          {
            heading: "Daftar Kategori Bantuan",
            route: "/help-categories",
          },
          {
            heading: "Daftar Bantuan",
            route: "/helps",
          },
          {
            heading: "Tambah",
            route: "/helps/create",
          },
        ],
      },
    ],
  },
  {
    roles: ["admin"],
    heading: "Administrator",
    route: "/administrators",
    pages: [
      {
        heading: "Konfigurasi",
        route: "/configurations",
        svgIcon: "media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi-gear",
      },
      {
        heading: "Role & Hak Akses",
        route: "/configurations",
        svgIcon: "media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi-shield-shaded",
      },
    ],
  },
];

export default DocMenuConfig;
