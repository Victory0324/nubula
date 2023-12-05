import { elyxnirRequest } from '../request';

export const postChat = async (body: LynxPostBody) => {
  const res = await elyxnirRequest(`/user-profile/chat/genesis`, 'POST', body);

  if (!res.ok) {
    console.error('Failed to fetch data');
    console.error(await res.text());
    return { success: false, status: res.status };
  }

  const data = await res.json();
  return { success: true, data, status: res.status };
};
