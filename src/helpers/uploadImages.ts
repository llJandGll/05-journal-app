export const fileUpload = async (file : File) => {
  if (!file) return null;
  const cloudUrl = 'https://api.cloudinary.com/v1_1/dla4a15hf/upload';
  const formData = new FormData();
  formData.append('upload_preset', 'journal-app');
  formData.append('file', file);

  try {
    const resp = await fetch(cloudUrl, {
      method: 'POST',
      body: formData
    });
    if (!resp.ok) throw new Error('No se pudo subir imagen');
    const cloudResp = await resp.json();
    return cloudResp.secure_url;
  } catch (error) {
    console.log(error);
    return null;
  }
}
