export const postUploadUserImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`api/authenticated/elyxnir/user/update-user-image`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    console.error('Failed to fetch data');
    console.error(await res.text());
    return { success: false, status: res.status };
  }
  const data = await res.json();

  return { success: true, data, status: res.status };
};
