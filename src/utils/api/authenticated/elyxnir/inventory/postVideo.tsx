export const postVideo = async ({
  video,
  duration,
  scenzNames,
  thumbnail,
  trackTemplateIds,
  name,
}: {
  video: Blob;
  duration: number;
  scenzNames: string[];
  thumbnail: Blob;
  trackTemplateIds: string[];
  name: string;
}) => {
  const formData = new FormData();
  formData.append('video', video);
  formData.append('thumbnail', thumbnail);
  formData.append('duration', duration.toString());
  formData.append('scenzNames', JSON.stringify(scenzNames));
  formData.append('name', name);
  formData.append('trackTemplateIds', JSON.stringify(trackTemplateIds));

  const res = await fetch(
    `api/authenticated/elyxnir/inventory/instances/video`,
    {
      method: 'POST',
      body: formData,
    }
  );
  if (!res.ok) {
    console.error('Failed to fetch data');
    console.error(await res.text());
    return { success: false, status: res.status };
  }
  const data = await res.json();

  return { success: true, data, status: res.status };
};
