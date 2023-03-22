const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const fileRender = new FileReader();

    fileRender.readAsDataURL(file);

    fileRender.onload = () => {
      resolve(fileRender.result as string);
    };

    fileRender.onerror = (error) => {
      reject(error);
    };
  });

export default toBase64;
