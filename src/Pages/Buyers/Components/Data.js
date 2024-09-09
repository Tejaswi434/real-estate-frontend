const items2 = [
    {
      label: <a href="https://www.antgroup.com">1st menu item</a>,
      key: '0',
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: '3rd menu item',
      key: '3',
    },
  ]; 


  const items = [
    {
      key: "1",
      type: "group",
      label: "Profile",
      children: [
        {
          key: "1-1",
          label:"Update Profile",
        },
        {
          key: "1-2",
          label: "Logout",
        },
      ],
    },
    // {
    //   key: "2",
    //   label: "",
    //   children: [
    //     {
    //       key: "2-1",
    //       label: "",
    //     },
    //     {
    //       key: "2-2",
    //       label: "",
    //     },
    //   ],
    // },
    {
      key: "3",
      label: "",
      disabled: true,
      children: [
        {
          key: "3-1",
          label: "5d menu item",
        },
        {
          key: "3-2",
          label: "6th menu item",
        },
      ],
    },
  ];

  export { items, items2 };