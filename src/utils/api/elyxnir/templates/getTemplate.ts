export const getTemplate = async <T = VideoTemplate | TrackTemplate>({
  templateId,
}: {
  templateId: string;
}): Promise<APIResponse<T>> => {
  const res = await fetch(`/api/elyxnir/item-templates/${templateId}`);

  try {
    if (!res.ok) {
      return { success: false, message: res.statusText, status: res.status };
    }

    const data = await res.json();

    return { success: true, data, status: res.status };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      status: res.status,
      message: `Failed to fetch template ${templateId}`,
    };
  }
};
