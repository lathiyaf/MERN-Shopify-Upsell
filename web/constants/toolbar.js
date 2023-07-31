const uploadImageCallBack = (file, callback) => {
  console.log(file);
  //   return new Promise((resolve, reject) => {
  //     const reader = new window.FileReader();
  //     console.log(reader);
  //     reader.onloadend = async () => {
  //       const form_data = new FormData();
  //       form_data.append("file", file);
  //       const res = await uploadFile(form_data);
  //       setValue("thumbnail", res.data);
  //       resolve({ data: { link: process.env.REACT_APP_API + res.data } });
  //     };
  //     reader.readAsDataURL(file);
  //   });
  return new Promise((resolve, reject) => {
    if (file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        resolve({ data: { link: e.target.result } });
      };
      reader.readAsDataURL(file);
    }
  });
};

export const toolbar = {
  options: ["image", "inline", "textAlign", "fontFamily", "link", "fontSize"],
  image: {
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    urlEnabled: true,
    uploadEnabled: true,
    alignmentEnabled: false,
    uploadCallback: undefined,
    previewImage: false,
    defaultSize: {
      height: "auto",
      width: "auto",
    },
    uploadCallback: uploadImageCallBack,
    inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
    alt: { present: true, mandatory: false },
  },
  inline: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ["bold", "italic", "underline", "strikethrough"],
  },
  link: {
    options: ["link"],
    showOpenOptionOnHover: false,
  },
  textAlign: {
    inDropdown: true,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
  },
};
